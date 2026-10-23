import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { homedir } from 'node:os';
import { basename, join } from 'node:path';

/** Browser API prefix owned by this bundle. */
const API_ROOT = '/plugin-api/dialogue-tts';

/** Where the UI persists the selected reference voice. */
const DATA_DIR = join(
  process.env.DSH_HOME ?? join(homedir(), '.dsh'),
  'plugin-data',
  'dialogue-tts',
);
const SETTINGS_FILE = join(DATA_DIR, 'settings.json');

const PROMPT_LANGS = new Set(['zh', 'en', 'ja', 'ko', 'yue']);
const TEXT_LANGS = new Set(['auto', 'zh', 'en', 'ja', 'ko', 'yue']);

const DEFAULT_SETTINGS = Object.freeze({
  serverUrl: 'http://127.0.0.1:9880',
  refAudioPath: '',
  promptText: '',
  promptLang: 'zh',
  textLang: 'zh',
  speed: 1,
  autoPlay: false,
});

/** Rejection carrying an HTTP status and a stable client-facing code. */
class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

let settingsPromise;

function endpoint(serverUrl, path) {
  return new URL(path, serverUrl.endsWith('/') ? serverUrl : `${serverUrl}/`);
}

function normalizeSettings(input, base = DEFAULT_SETTINGS) {
  const source = input && typeof input === 'object' ? input : {};
  const pick = (key) => (Object.hasOwn(source, key) ? source[key] : base[key]);

  const rawUrl = typeof pick('serverUrl') === 'string' ? pick('serverUrl').trim() : '';
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new HttpError(400, 'invalid-settings', 'server URL must be an absolute http(s) URL');
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new HttpError(400, 'invalid-settings', 'server URL must use http or https');
  }
  if (!parsed.hostname) {
    throw new HttpError(400, 'invalid-settings', 'server URL must include a host');
  }
  const serverUrl = parsed.toString().replace(/\/+$/, '');

  const refAudioPath = typeof pick('refAudioPath') === 'string' ? pick('refAudioPath').trim() : '';
  if (refAudioPath.length > 1000) {
    throw new HttpError(400, 'invalid-settings', 'reference audio path is too long');
  }

  const promptText = typeof pick('promptText') === 'string' ? pick('promptText').trim() : '';
  if (promptText.length > 1000) {
    throw new HttpError(400, 'invalid-settings', 'prompt text is too long');
  }

  const promptLang = String(pick('promptLang'));
  if (!PROMPT_LANGS.has(promptLang)) {
    throw new HttpError(400, 'invalid-settings', 'unsupported prompt language');
  }

  const textLang = String(pick('textLang'));
  if (!TEXT_LANGS.has(textLang)) {
    throw new HttpError(400, 'invalid-settings', 'unsupported reading language');
  }

  const speedValue = Number(pick('speed'));
  if (!Number.isFinite(speedValue) || speedValue < 0.6 || speedValue > 1.8) {
    throw new HttpError(400, 'invalid-settings', 'speed must be between 0.6 and 1.8');
  }

  return {
    serverUrl,
    refAudioPath,
    promptText,
    promptLang,
    textLang,
    speed: Math.round(speedValue * 100) / 100,
    autoPlay: pick('autoPlay') === true,
  };
}

async function loadSettings() {
  settingsPromise ??= (async () => {
    try {
      const raw = await readFile(SETTINGS_FILE, 'utf8');
      const saved = JSON.parse(raw);
      return normalizeSettings(saved.settings ?? saved, DEFAULT_SETTINGS);
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        console.warn('[dialogue-tts] ignoring unreadable settings:', error?.message ?? error);
      }
      return { ...DEFAULT_SETTINGS };
    }
  })();
  return settingsPromise;
}

let writeTail = Promise.resolve();

async function saveSettings(settings) {
  const operation = writeTail.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const temporary = `${SETTINGS_FILE}.${randomBytes(6).toString('hex')}.tmp`;
    await writeFile(temporary, JSON.stringify({ version: 1, settings }, null, 2), 'utf8');
    await rename(temporary, SETTINGS_FILE);
  });
  writeTail = operation.catch(() => {});
  await operation;
  settingsPromise = Promise.resolve(settings);
}

async function describeRef(refAudioPath) {
  if (!refAudioPath) {
    return { exists: false, bytes: 0, name: '' };
  }
  try {
    const info = await stat(refAudioPath);
    if (!info.isFile()) return { exists: false, bytes: 0, name: basename(refAudioPath) };
    return { exists: true, bytes: info.size, name: basename(refAudioPath) };
  } catch {
    return { exists: false, bytes: 0, name: basename(refAudioPath) };
  }
}

async function probeServer(serverUrl) {
  try {
    const response = await fetch(endpoint(serverUrl, 'openapi.json'), {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    });
    let gptSovits = false;
    if (response.ok) {
      try {
        const document = await response.json();
        gptSovits = Boolean(document?.paths?.['/tts']);
      } catch {
        // A reachable non-JSON service is still reported as reachable.
      }
    }
    return {
      ok: response.status < 500,
      reachable: true,
      gptSovits,
      status: response.status,
    };
  } catch (error) {
    return {
      ok: false,
      reachable: false,
      gptSovits: false,
      status: 0,
      message: error?.cause?.code ?? error?.name ?? String(error),
    };
  }
}

async function readJsonBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > 262144) {
      throw new HttpError(413, 'request-too-large', 'request body is too large');
    }
    chunks.push(chunk);
  }
  if (total === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new HttpError(400, 'invalid-json', 'request body must be valid JSON');
  }
}

function sendJson(response, status, value) {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
  });
  response.end(body);
}

function sendError(response, error) {
  if (response.headersSent) {
    response.end();
    return;
  }
  if (error instanceof HttpError) {
    sendJson(response, error.status, { error: { code: error.code, message: error.message } });
    return;
  }
  console.error('[dialogue-tts]', error);
  sendJson(response, 500, {
    error: { code: 'internal', message: error?.message ?? 'internal error' },
  });
}

function methodNotAllowed(response, allow) {
  response.writeHead(405, { allow, 'cache-control': 'no-store' });
  response.end();
}

async function upstreamError(response) {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text);
    const detail = parsed?.message ?? parsed?.detail;
    return typeof detail === 'string' ? detail : JSON.stringify(detail ?? parsed).slice(0, 800);
  } catch {
    return text.trim().slice(0, 800) || `GPT-SoVITS returned HTTP ${response.status}`;
  }
}

async function synthesize(settings, text) {
  if (!settings.refAudioPath) {
    throw new HttpError(400, 'not-configured', 'configure a reference audio path first');
  }
  const ref = await describeRef(settings.refAudioPath);
  if (!ref.exists) {
    throw new HttpError(400, 'ref-missing', `reference audio not found: ${settings.refAudioPath}`);
  }
  const trimmed = typeof text === 'string' ? text.trim() : '';
  if (!trimmed) {
    throw new HttpError(400, 'empty-text', 'there is no text to read');
  }
  if (trimmed.length > 6000) {
    throw new HttpError(400, 'text-too-long', 'text is too long for one synthesis request');
  }

  let response;
  try {
    response = await fetch(endpoint(settings.serverUrl, 'tts'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'audio/wav, application/json',
      },
      body: JSON.stringify({
        text: trimmed,
        text_lang: settings.textLang,
        ref_audio_path: settings.refAudioPath,
        prompt_text: settings.promptText,
        prompt_lang: settings.promptLang,
        text_split_method: 'cut5',
        batch_size: 1,
        speed_factor: settings.speed,
        media_type: 'wav',
        streaming_mode: false,
      }),
      signal: AbortSignal.timeout(180000),
    });
  } catch (error) {
    if (error?.name === 'TimeoutError') {
      throw new HttpError(504, 'tts-timeout', 'GPT-SoVITS did not answer within 180 seconds');
    }
    throw new HttpError(502, 'unreachable', error?.cause?.code ?? error?.message ?? 'cannot reach GPT-SoVITS');
  }

  if (!response.ok) {
    throw new HttpError(502, 'tts-failed', await upstreamError(response));
  }
  const audio = Buffer.from(await response.arrayBuffer());
  if (audio.length === 0) {
    throw new HttpError(502, 'tts-failed', 'GPT-SoVITS returned an empty audio response');
  }
  return {
    audio,
    contentType: response.headers.get('content-type') ?? 'audio/wav',
  };
}

function sendAudio(response, result) {
  response.writeHead(200, {
    'content-type': result.contentType,
    'content-length': result.audio.length,
    'cache-control': 'no-store',
    'x-dialogue-tts-provider': 'gpt-sovits',
  });
  response.end(result.audio);
}

async function handleSettings(request, response) {
  if (request.method === 'GET') {
    const settings = await loadSettings();
    const ref = await describeRef(settings.refAudioPath);
    sendJson(response, 200, { settings, defaults: DEFAULT_SETTINGS, ref });
    return;
  }
  if (request.method !== 'POST') {
    methodNotAllowed(response, 'GET, POST');
    return;
  }
  const current = await loadSettings();
  const body = await readJsonBody(request);
  const settings = normalizeSettings(body?.settings ?? body, current);
  const ref = await describeRef(settings.refAudioPath);
  await saveSettings(settings);
  sendJson(response, 200, { settings, defaults: DEFAULT_SETTINGS, ref });
}

async function handleProbe(request, response) {
  if (request.method !== 'POST') {
    methodNotAllowed(response, 'POST');
    return;
  }
  const body = await readJsonBody(request);
  const settings = normalizeSettings(body?.settings ?? body, await loadSettings());
  const [server, ref] = await Promise.all([
    probeServer(settings.serverUrl),
    describeRef(settings.refAudioPath),
  ]);
  sendJson(response, 200, { settings, server, ref });
}

async function handlePreview(request, response) {
  if (request.method !== 'POST') {
    methodNotAllowed(response, 'POST');
    return;
  }
  const body = await readJsonBody(request);
  const settings = normalizeSettings(body?.settings ?? body, await loadSettings());
  const text = typeof body?.text === 'string' && body.text.trim()
    ? body.text
    : '你好，我是你的朗读助手。现在为你朗读这段对话。';
  sendAudio(response, await synthesize(settings, text));
}

async function handleTts(request, response) {
  if (request.method !== 'POST') {
    methodNotAllowed(response, 'POST');
    return;
  }
  const body = await readJsonBody(request);
  const settings = await loadSettings();
  sendAudio(response, await synthesize(settings, body?.text));
}

function guarded(handler) {
  return async (request, response) => {
    try {
      await handler(request, response);
    } catch (error) {
      sendError(response, error);
    }
  };
}

/** Host half: serves the same-origin settings and synthesis API used by the Client half. */
export function apply(ctx) {
  const routes = [
    { path: `${API_ROOT}/settings`, handler: guarded(handleSettings) },
    { path: `${API_ROOT}/probe`, handler: guarded(handleProbe) },
    { path: `${API_ROOT}/preview`, handler: guarded(handlePreview) },
    { path: `${API_ROOT}/tts`, handler: guarded(handleTts) },
  ];
  ctx.effect(() => {
    const disposers = routes.map((route) => ctx.webServer.register({
      kind: 'exact',
      path: route.path,
      handler: route.handler,
    }));
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, 'dialogue-tts: HTTP API');
}

export const inject = ['webServer'];
