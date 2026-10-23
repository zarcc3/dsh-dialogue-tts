window.__ModuleLoader__.load({
  id: '@local/dialogue-tts',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'dialogue-tts';
    const API_ROOT = (() => {
      try {
        return new URL('/plugin-api/dialogue-tts/', globalThis.location.origin).toString();
      } catch {
        return '/plugin-api/dialogue-tts/';
      }
    })();

    const zh = {
      nav: '朗读对话',
      title: '朗读对话',
      intro: '使用本地 GPT-SoVITS 朗读助手回复。参考语音决定朗读音色，请填写 GPT-SoVITS 进程能够读取的音频路径。',
      serverTitle: 'GPT-SoVITS 服务',
      serverLabel: '服务地址',
      serverHint: '默认 http://127.0.0.1:9880；修改后请点击“检测连接”。',
      probe: '检测连接',
      statusChecking: '正在检测服务…',
      statusOnline: 'GPT-SoVITS 已连接',
      statusOnlineNoApi: '服务可访问，但未识别到 GPT-SoVITS 接口',
      statusOffline: '无法连接 GPT-SoVITS',
      statusUnknown: '尚未检测服务',
      refTitle: '参考语音',
      refLabel: '参考音频路径',
      refHint: '填写绝对路径，推荐 3–10 秒的清晰人声；该文件由 GPT-SoVITS 进程读取。',
      refFound: '参考音频已找到（{size}）',
      refMissing: '参考音频文件不存在，请检查路径',
      refUnknown: '保存或检测后核对参考音频',
      refEmpty: '尚未配置参考音频，请填写路径',
      promptLabel: '参考音频文本',
      promptHint: '参考音频里说出的原话，用于提升音色相似度；可以留空。',
      promptLangLabel: '参考音频语言',
      textLangLabel: '朗读语言',
      speedLabel: '语速',
      autoPlayTitle: '自动播放新回复',
      autoPlayHint: '开启后，当前对话中新完成的助手回复会以流式方式自动播放；开始生成新回复时会停止上一条语音。默认关闭。',
      test: '试听参考语音',
      testing: '正在合成试听…',
      stopTest: '停止试听',
      save: '保存',
      saving: '保存中…',
      saved: '设置已保存',
      reset: '恢复默认',
      loading: '正在加载设置…',
      loadFailed: '设置加载失败',
      retry: '重试',
      saveFailed: '保存失败',
      previewFailed: '试听失败',
      requiredRef: '请填写参考音频路径',
      invalidServer: '请填写有效的 HTTP(S) 服务地址',
      invalidSpeed: '语速需在 0.60 到 1.80 之间',
      formInvalid: '请先修正表单中的错误',
      actionRead: '朗读这条回复',
      actionSynthesizing: '正在连接语音流，点击取消',
      actionStop: '停止朗读',
      actionRetry: '朗读失败，点击重试',
      actionNoText: '这条回复没有可朗读的文本',
      errorNotConfigured: '请先在“设置 → 朗读对话”中配置参考语音',
      errorUnreachable: '无法连接 GPT-SoVITS，请确认服务已启动',
      errorRefMissing: '参考音频文件不存在，请检查路径',
      errorTts: '语音合成失败',
      errorEmpty: '没有可朗读的文本',
      errorAudio: '浏览器无法播放这段音频',
      errorNetwork: '无法连接朗读服务',
      errorTooLong: '内容太长，无法一次朗读',
    };

    const en = {
      nav: 'Read Aloud',
      title: 'Read Aloud',
      intro: 'Read assistant replies aloud with a local GPT-SoVITS voice. The reference audio selects the voice and must be readable by the GPT-SoVITS process.',
      serverTitle: 'GPT-SoVITS service',
      serverLabel: 'Service URL',
      serverHint: 'Defaults to http://127.0.0.1:9880. After changing it, test the connection.',
      probe: 'Test connection',
      statusChecking: 'Checking the service…',
      statusOnline: 'GPT-SoVITS connected',
      statusOnlineNoApi: 'Service reachable, but the GPT-SoVITS API was not detected',
      statusOffline: 'Cannot reach GPT-SoVITS',
      statusUnknown: 'Service not checked yet',
      refTitle: 'Reference voice',
      refLabel: 'Reference audio path',
      refHint: 'Enter an absolute path, ideally 3–10 seconds of clear speech. The GPT-SoVITS process reads this file.',
      refFound: 'Reference audio found ({size})',
      refMissing: 'Reference audio not found; check the path',
      refUnknown: 'Save or test to inspect the reference audio',
      refEmpty: 'No reference audio configured; enter a path',
      promptLabel: 'Reference transcript',
      promptHint: 'The exact words spoken in the reference audio. Improves voice similarity; may be left empty.',
      promptLangLabel: 'Reference language',
      textLangLabel: 'Reading language',
      speedLabel: 'Speed',
      autoPlayTitle: 'Auto-play new replies',
      autoPlayHint: 'When enabled, newly completed assistant replies in the current conversation are streamed aloud. Starting a new reply stops the previous speech. Off by default.',
      test: 'Preview reference voice',
      testing: 'Synthesizing preview…',
      stopTest: 'Stop preview',
      save: 'Save',
      saving: 'Saving…',
      saved: 'Settings saved',
      reset: 'Restore defaults',
      loading: 'Loading settings…',
      loadFailed: 'Could not load settings',
      retry: 'Retry',
      saveFailed: 'Could not save settings',
      previewFailed: 'Preview failed',
      requiredRef: 'Enter a reference audio path',
      invalidServer: 'Enter a valid HTTP(S) service URL',
      invalidSpeed: 'Speed must be between 0.60 and 1.80',
      formInvalid: 'Fix the form errors first',
      actionRead: 'Read this reply aloud',
      actionSynthesizing: 'Connecting to the speech stream; click to cancel',
      actionStop: 'Stop reading',
      actionRetry: 'Reading failed; click to retry',
      actionNoText: 'This reply has no readable text',
      errorNotConfigured: 'Configure a reference voice in Settings → Read Aloud first',
      errorUnreachable: 'Cannot reach GPT-SoVITS. Make sure the service is running.',
      errorRefMissing: 'The reference audio file is missing; check the path',
      errorTts: 'Speech synthesis failed',
      errorEmpty: 'There is no text to read',
      errorAudio: 'The browser could not play this audio',
      errorNetwork: 'Cannot reach the read-aloud service',
      errorTooLong: 'The text is too long to read in one request',
    };

    const CSS = `
      .dtts-action {
        position: relative;
        width: calc(28px + var(--dsh-content-font-delta, 0px));
        height: calc(28px + var(--dsh-content-font-delta, 0px));
        border: none;
        border-radius: 8px;
        padding: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        color: var(--dsw-alias-label-tertiary);
        cursor: pointer;
        transition: background-color .12s, color .12s, opacity .12s;
      }
      .dtts-action svg {
        width: calc(15px + var(--dsh-content-font-delta, 0px));
        height: calc(15px + var(--dsh-content-font-delta, 0px));
      }
      .dtts-action:hover:not(:disabled) {
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
        color: var(--dsw-alias-label-secondary);
      }
      .dtts-action:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      .dtts-action:disabled { cursor: default; opacity: .4; }
      .dtts-action[data-state="playing"] { color: var(--dsw-alias-brand-primary); }
      .dtts-action[data-state="error"] { color: var(--dsw-alias-state-error-primary); }
      .dtts-errorDot {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--dsw-alias-state-error-primary);
      }
      .dtts-spin { animation: dtts-spin 1s linear infinite; }
      .dtts-sr {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @keyframes dtts-spin { to { transform: rotate(360deg); } }

      .dtts-section {
        max-width: 720px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        color: var(--dsw-alias-label-primary);
        padding-bottom: 8px;
      }
      .dtts-title {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
      .dtts-intro {
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 14px;
        line-height: 22px;
      }
      .dtts-status {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        min-height: 24px;
        font-size: 13px;
        line-height: 20px;
      }
      .dtts-dot {
        width: 8px;
        height: 8px;
        flex: none;
        border-radius: 50%;
        background: var(--dsw-alias-state-idle-primary);
      }
      .dtts-dot[data-phase="ok"] { background: var(--dsw-alias-state-success-primary); }
      .dtts-dot[data-phase="warn"] { background: var(--dsw-alias-state-warn-primary); }
      .dtts-dot[data-phase="error"] { background: var(--dsw-alias-state-error-primary); }
      .dtts-dot[data-phase="checking"] { animation: dtts-pulse 1.2s ease-in-out infinite; }
      @keyframes dtts-pulse {
        0%, 100% { opacity: .35; }
        50% { opacity: 1; }
      }
      .dtts-statusText { color: var(--dsw-alias-label-secondary); }
      .dtts-statusText[data-phase="error"] { color: var(--dsw-alias-state-error-primary); }
      .dtts-statusText[data-phase="warn"] { color: var(--dsw-alias-state-warn-primary); }
      .dtts-inlineButton {
        border: none;
        background: transparent;
        padding: 0;
        color: var(--dsw-alias-brand-primary);
        font: inherit;
        cursor: pointer;
      }
      .dtts-inlineButton:hover:not(:disabled) { text-decoration: underline; }
      .dtts-inlineButton:disabled { opacity: .45; cursor: default; }
      .dtts-inlineButton:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; border-radius: 3px; }

      .dtts-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 14px;
        border: .5px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dtts-cardHead { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
      .dtts-cardTitle { font-size: 14px; font-weight: 600; line-height: 22px; }
      .dtts-cardHint { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .dtts-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
      .dtts-labelRow { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
      .dtts-label { font-size: 13px; font-weight: 500; line-height: 20px; }
      .dtts-value { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .dtts-hint { margin: 0; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .dtts-input, .dtts-select, .dtts-textarea {
        box-sizing: border-box;
        width: 100%;
        border: .5px solid var(--dsw-alias-border-l2);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 13px;
        transition: border-color .12s, box-shadow .12s;
      }
      .dtts-input, .dtts-select { height: 36px; padding: 0 10px; }
      .dtts-textarea { min-height: 72px; padding: 8px 10px; line-height: 20px; resize: vertical; }
      .dtts-input::placeholder, .dtts-textarea::placeholder { color: var(--dsw-alias-label-secondary); opacity: .7; }
      .dtts-input:focus, .dtts-select:focus, .dtts-textarea:focus {
        outline: none;
        border-color: var(--dsw-alias-brand-primary);
        box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary);
      }
      .dtts-input:disabled, .dtts-select:disabled, .dtts-textarea:disabled { opacity: .55; }
      .dtts-code { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; font-size: 12px; }
      .dtts-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
      .dtts-fileState { margin: 0; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .dtts-fileState[data-tone="ok"] { color: var(--dsw-alias-state-success-primary); }
      .dtts-fileState[data-tone="error"] { color: var(--dsw-alias-state-error-primary); }
      .dtts-range { width: 100%; accent-color: var(--dsw-alias-brand-primary); }
      .dtts-toggleRow { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
      .dtts-toggleCopy { min-width: 0; }
      .dtts-switch {
        position: relative;
        flex: none;
        width: 38px;
        height: 22px;
        padding: 0;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-2);
        cursor: pointer;
        transition: background-color .12s, border-color .12s;
      }
      .dtts-switch[data-on="true"] {
        background: var(--dsw-alias-brand-primary);
        border-color: var(--dsw-alias-brand-primary);
      }
      .dtts-switchThumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--dsw-alias-label-primary);
        transition: transform .12s, background-color .12s;
      }
      .dtts-switch[data-on="true"] .dtts-switchThumb {
        transform: translateX(16px);
        background: var(--dsw-alias-bg-base);
      }
      .dtts-switch:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      .dtts-switch:disabled { opacity: .45; cursor: default; }

      .dtts-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 2px;
      }
      .dtts-primary, .dtts-secondary {
        box-sizing: border-box;
        height: 34px;
        padding: 0 14px;
        border-radius: 8px;
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color .12s, border-color .12s, opacity .12s;
      }
      .dtts-primary {
        border: 1px solid var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base);
      }
      .dtts-primary:hover:not(:disabled) { filter: brightness(1.06); }
      .dtts-secondary {
        border: .5px solid var(--dsw-alias-border-l2);
        background: transparent;
        color: var(--dsw-alias-label-primary);
      }
      .dtts-secondary:hover:not(:disabled) { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dtts-primary:focus-visible, .dtts-secondary:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      .dtts-primary:disabled, .dtts-secondary:disabled { opacity: .45; cursor: default; }
      .dtts-reset {
        margin-left: auto;
        border: none;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
        padding: 4px;
      }
      .dtts-reset:hover:not(:disabled) { color: var(--dsw-alias-label-primary); }
      .dtts-reset:disabled { opacity: .4; cursor: default; }
      .dtts-reset:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; border-radius: 4px; }
      .dtts-notice { margin: 0; font-size: 12px; line-height: 18px; }
      .dtts-notice[data-tone="success"] { color: var(--dsw-alias-state-success-primary); }
      .dtts-notice[data-tone="error"] { color: var(--dsw-alias-state-error-primary); }
      .dtts-loadError {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        border: .5px solid var(--dsw-alias-state-error-primary);
        border-radius: 10px;
        color: var(--dsw-alias-state-error-primary);
        font-size: 13px;
        line-height: 20px;
      }
      @media (max-width: 560px) {
        .dtts-grid { grid-template-columns: minmax(0, 1fr); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dtts-action, .dtts-primary, .dtts-secondary, .dtts-input, .dtts-select, .dtts-textarea, .dtts-switch, .dtts-switchThumb { transition: none; }
        .dtts-spin, .dtts-dot[data-phase="checking"] { animation: none; }
      }
    `;

    const LANG_LABELS = {
      auto: '自动 / Auto',
      zh: '中文',
      en: 'English',
      ja: '日本語',
      ko: '한국어',
      yue: '粤语',
    };

    const PREVIEW_TEXTS = {
      auto: '你好，我是你的朗读助手。现在为你朗读这段对话。',
      zh: '你好，我是你的朗读助手。现在为你朗读这段对话。',
      en: 'Hello, I am your read-aloud assistant. I will now read this conversation.',
      ja: 'こんにちは、読み上げアシスタントです。これから会話を読み上げます。',
      ko: '안녕하세요. 읽어 주는 도우미입니다. 이제 이 대화를 읽어 드리겠습니다.',
      yue: '你好，我係你嘅朗讀助手。而家為你朗讀呢段對話。',
    };

    function formatBytes(bytes) {
      if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
      return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    }

    async function request(path, options = {}) {
      const headers = { accept: options.accept ?? 'application/json' };
      if (options.body !== undefined) headers['content-type'] = 'application/json';
      const response = await fetch(`${API_ROOT}${path}`, {
        method: options.method ?? 'GET',
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        cache: 'no-store',
        signal: options.signal,
      });
      if (!response.ok) {
        let code = `http-${response.status}`;
        let message = `HTTP ${response.status}`;
        try {
          const data = await response.json();
          if (data?.error) {
            code = data.error.code || code;
            message = data.error.message || message;
          }
        } catch {
          // Keep the HTTP status when the body is not JSON.
        }
        const error = new Error(message);
        error.code = code;
        throw error;
      }
      return response;
    }

    const api = {
      async load() {
        return (await request('settings')).json();
      },
      async save(settings) {
        return (await request('settings', { method: 'POST', body: { settings } })).json();
      },
      async probe(settings) {
        return (await request('probe', { method: 'POST', body: { settings } })).json();
      },
      async preview(settings, text) {
        const response = await request('preview', {
          method: 'POST',
          body: { settings, text },
          accept: 'audio/wav, application/json',
        });
        const type = response.headers.get('content-type') ?? '';
        if (!type.includes('audio') && !type.includes('octet-stream')) {
          const error = new Error('The read-aloud service returned an unexpected response');
          error.code = 'tts-failed';
          throw error;
        }
        return response.blob();
      },
    };

    function errorCopy(t, error) {
      switch (error?.code) {
        case 'not-configured': return t('errorNotConfigured');
        case 'ref-missing': return t('errorRefMissing');
        case 'unreachable':
        case 'network': return t('errorUnreachable');
        case 'audio': return t('errorAudio');
        case 'empty-text': return t('errorEmpty');
        case 'text-too-long': return t('errorTooLong');
        default: return t('errorTts');
      }
    }

    function errorDetail(error) {
      const message = typeof error?.message === 'string' ? error.message.trim() : '';
      if (!message) return '';
      return message.length > 240 ? `${message.slice(0, 240)}…` : message;
    }

    function textOfBlocks(blocks) {
      if (!Array.isArray(blocks)) return '';
      return blocks
        .filter((block) => block?.kind === 'text' && typeof block.text === 'string')
        .map((block) => block.text)
        .join('\n');
    }

    function findAssistantText(snapshot, messageId) {
      const nodes = snapshot?.nodes;
      if (!nodes || typeof nodes.values !== 'function') return '';
      let fallback = '';
      for (const node of nodes.values()) {
        if (!node) continue;
        const data = node.data;
        if (node.kind === 'assistant-step' && data?.finalNode?.messageId === messageId) {
          return textOfBlocks(data.blocks);
        }
        if (
          !fallback
          && node.kind === 'turn-tail'
          && data?.closing?.finalNode?.messageId === messageId
        ) {
          fallback = textOfBlocks(data.closing.blocks);
        }
      }
      return fallback;
    }

    function findLatestAssistantId(snapshot) {
      const nodes = snapshot?.nodes;
      if (!nodes || typeof nodes.values !== 'function') return '';
      let latestId = '';
      let latestSeq = -1;
      for (const node of nodes.values()) {
        if (!node || node.kind !== 'turn-tail') continue;
        const closing = node.data?.closing;
        const messageId = closing?.finalNode?.messageId;
        if (!messageId) continue;
        if (!textOfBlocks(closing.blocks).trim()) continue;
        const seq = closing.finalNode.seq ?? node.data?.seq ?? 0;
        if (seq >= latestSeq) {
          latestSeq = seq;
          latestId = messageId;
        }
      }
      return latestId;
    }

    function prepareSpeech(markdown) {
      if (typeof markdown !== 'string' || !markdown.trim()) return '';
      let text = markdown
        .replace(/```[\s\S]*?```/g, '\n')
        .replace(/~~~[\s\S]*?~~~/g, '\n')
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
        .replace(/^[ \t]*#{1,6}[ \t]+/gm, '')
        .replace(/^[ \t]*>[ \t]?/gm, '')
        .replace(/^[ \t]*(?:[-*+]|\d{1,3}[.)])[ \t]+/gm, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[*_~]{1,3}/g, '')
        .replace(/^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*$/gm, ' ')
        .replace(/\|/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      return text;
    }

    function concatBytes(left, right) {
      if (left.length === 0) return right;
      if (right.length === 0) return left;
      const result = new Uint8Array(left.length + right.length);
      result.set(left, 0);
      result.set(right, left.length);
      return result;
    }

    function readAscii(bytes, offset, length) {
      let text = '';
      for (let index = 0; index < length; index += 1) {
        text += String.fromCharCode(bytes[offset + index]);
      }
      return text;
    }

    function readUint16(bytes, offset) {
      return bytes[offset] | (bytes[offset + 1] << 8);
    }

    function readUint32(bytes, offset) {
      return (bytes[offset]
        | (bytes[offset + 1] << 8)
        | (bytes[offset + 2] << 16)
        | (bytes[offset + 3] << 24)) >>> 0;
    }

    /**
     * Locate the fmt/data chunks in the streaming WAV header. GPT-SoVITS emits
     * a normal 44-byte header, but the data size is zero in streaming mode, so
     * only the header fields and the data offset are used.
     */
    function parseWavHeader(bytes) {
      if (bytes.length < 12) return null;
      if (readAscii(bytes, 0, 4) !== 'RIFF' || readAscii(bytes, 8, 4) !== 'WAVE') {
        const error = new Error('The read-aloud stream did not start with a WAV header');
        error.code = 'tts-failed';
        throw error;
      }

      let offset = 12;
      let channels = 0;
      let sampleRate = 0;
      let bitsPerSample = 0;

      while (offset + 8 <= bytes.length) {
        const id = readAscii(bytes, offset, 4);
        const size = readUint32(bytes, offset + 4);
        const dataOffset = offset + 8;

        if (id === 'fmt ') {
          if (size < 16 || dataOffset + 16 > bytes.length) return null;
          const format = readUint16(bytes, dataOffset);
          channels = readUint16(bytes, dataOffset + 2);
          sampleRate = readUint32(bytes, dataOffset + 4);
          bitsPerSample = readUint16(bytes, dataOffset + 14);
          if (format !== 1 || bitsPerSample !== 16 || (channels !== 1 && channels !== 2)) {
            const error = new Error('The read-aloud stream uses an unsupported PCM format');
            error.code = 'tts-failed';
            throw error;
          }
        } else if (id === 'data') {
          if (!sampleRate || !channels) return null;
          return { channels, sampleRate, bitsPerSample, dataOffset };
        }

        if (dataOffset + size > bytes.length) return null;
        offset = dataOffset + size + (size % 2);
      }

      return null;
    }

    class PlaybackController {
      constructor() {
        this.state = { status: 'idle', messageId: null, sessionId: null, error: null };
        this.listeners = new Set();
        this.token = 0;
        this.run = null;
        this.context = null;
        this.nodes = new Set();
        this.endWait = null;
      }

      getState = () => this.state;

      subscribe = (listener) => {
        this.listeners.add(listener);
        return () => {
          this.listeners.delete(listener);
        };
      };

      publish(state) {
        this.state = state;
        for (const listener of this.listeners) listener();
      }

      clearEndWait() {
        const wait = this.endWait;
        if (wait === null) return;
        this.endWait = null;
        clearTimeout(wait.timer);
        wait.resolve();
      }

      stopNodes() {
        for (const { source, gain } of this.nodes) {
          source.onended = null;
          try {
            source.stop();
          } catch {
            // The source may already have ended.
          }
          try {
            source.disconnect();
            gain.disconnect();
          } catch {
            // The graph may already be torn down.
          }
        }
        this.nodes.clear();
      }

      cancelCurrent() {
        this.token += 1;
        const run = this.run;
        if (run !== null) {
          run.aborted = true;
          run.controller.abort();
          this.run = null;
        }
        this.clearEndWait();
        this.stopNodes();
      }

      stop() {
        this.cancelCurrent();
        this.publish({ status: 'idle', messageId: null, sessionId: null, error: null });
      }

      async ensureContext() {
        const Ctor = globalThis.AudioContext ?? globalThis.webkitAudioContext;
        if (Ctor === undefined) {
          const error = new Error('Web Audio is not available in this browser');
          error.code = 'audio';
          throw error;
        }
        if (this.context === null || this.context.state === 'closed') {
          this.context = new Ctor();
        }
        if (this.context.state !== 'running') {
          try {
            await this.context.resume();
          } catch {
            // Report the suspended state below.
          }
        }
        if (this.context.state !== 'running') {
          const error = new Error('The browser blocked audio playback');
          error.code = 'audio';
          throw error;
        }
        return this.context;
      }

      prime() {
        this.ensureContext().catch(() => {
          // A manual play attempt will report the real failure.
        });
      }

      schedulePcm(run, bytes) {
        const context = run.context;
        const sampleCount = bytes.length / 2;
        const frames = Math.floor(sampleCount / run.channels);
        if (frames <= 0) return;

        const buffer = context.createBuffer(run.channels, frames, run.sampleRate);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        for (let channelIndex = 0; channelIndex < run.channels; channelIndex += 1) {
          const target = buffer.getChannelData(channelIndex);
          for (let frame = 0; frame < frames; frame += 1) {
            const sampleIndex = frame * run.channels + channelIndex;
            target[frame] = view.getInt16(sampleIndex * 2, true) / 32768;
          }
        }

        const start = Math.max(run.nextStartTime, context.currentTime + 0.03);
        const duration = buffer.duration;
        const fade = Math.min(0.005, duration / 2);
        const gain = context.createGain();
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(1, start + fade);
        if (duration > fade * 2) {
          gain.gain.setValueAtTime(1, start + duration - fade);
          gain.gain.linearRampToValueAtTime(0, start + duration);
        }

        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);
        gain.connect(context.destination);

        const node = { source, gain };
        this.nodes.add(node);
        source.onended = () => {
          this.nodes.delete(node);
          try {
            source.disconnect();
            gain.disconnect();
          } catch {
            // Already disconnected.
          }
        };
        source.start(start);
        run.nextStartTime = start + duration;

        if (!run.playing) {
          run.playing = true;
          this.publish({
            status: 'playing',
            messageId: run.messageId,
            sessionId: run.sessionId,
            error: null,
          });
        }
      }

      async waitForLead(run) {
        const context = run.context;
        while (
          this.run === run
          && run.token === this.token
          && run.nextStartTime - context.currentTime > 4
        ) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      waitForEnd(run) {
        return new Promise((resolve) => {
          const delay = Math.max(0, (run.nextStartTime - run.context.currentTime) * 1000) + 100;
          const timer = setTimeout(() => {
            if (this.endWait?.timer === timer) this.endWait = null;
            resolve();
          }, delay);
          this.endWait = { timer, resolve };
        });
      }

      handlePcm(run, bytes, final = false) {
        let data = run.remainder.length > 0 ? concatBytes(run.remainder, bytes) : bytes;
        const usable = data.length - (data.length % 2);
        run.remainder = usable < data.length ? data.slice(usable) : new Uint8Array(0);
        if (usable > 0) this.schedulePcm(run, data.subarray(0, usable));
        if (final) run.remainder = new Uint8Array(0);
      }

      async play(messageId, text, sessionId = null) {
        const current = this.state;
        if (current.messageId === messageId && (current.status === 'loading' || current.status === 'playing')) {
          this.stop();
          return;
        }

        this.cancelCurrent();
        const token = this.token;

        if (!text) {
          this.publish({
            status: 'error',
            messageId,
            sessionId,
            error: { code: 'empty-text', message: '' },
          });
          return;
        }

        const run = {
          token,
          messageId,
          sessionId,
          controller: new AbortController(),
          aborted: false,
          context: null,
          sampleRate: 0,
          channels: 0,
          nextStartTime: 0,
          remainder: new Uint8Array(0),
          playing: false,
        };
        this.run = run;
        this.publish({ status: 'loading', messageId, sessionId, error: null });

        try {
          const context = await this.ensureContext();
          if (token !== this.token || run.aborted) return;
          run.context = context;

          const response = await fetch(`${API_ROOT}stream`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'audio/wav, application/json',
            },
            body: JSON.stringify({ text }),
            signal: run.controller.signal,
          });

          if (!response.ok) {
            let code = `http-${response.status}`;
            let message = `HTTP ${response.status}`;
            try {
              const data = await response.json();
              if (data?.error) {
                code = data.error.code || code;
                message = data.error.message || message;
              }
            } catch {
              // Keep the status when the service did not return JSON.
            }
            const error = new Error(message);
            error.code = code;
            throw error;
          }

          const type = response.headers.get('content-type') ?? '';
          if (!type.includes('audio')) {
            const error = new Error('The read-aloud service returned an unexpected response');
            error.code = 'tts-failed';
            throw error;
          }
          if (response.body === null) {
            const error = new Error('The read-aloud service returned no audio stream');
            error.code = 'tts-failed';
            throw error;
          }

          const reader = response.body.getReader();
          let pending = new Uint8Array(0);
          let header = null;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (token !== this.token || run.aborted) return;
            pending = concatBytes(pending, value);

            if (header === null) {
              const parsed = parseWavHeader(pending);
              if (parsed === null) {
                if (pending.length > 1048576) {
                  const error = new Error('The read-aloud stream header is too large');
                  error.code = 'tts-failed';
                  throw error;
                }
                continue;
              }
              header = parsed;
              run.sampleRate = header.sampleRate;
              run.channels = header.channels;
              run.nextStartTime = context.currentTime + 0.1;
              pending = pending.slice(header.dataOffset);
            }

            if (pending.length > 0) {
              this.handlePcm(run, pending);
              pending = new Uint8Array(0);
              await this.waitForLead(run);
            }
          }

          if (token !== this.token || run.aborted) return;
          if (header === null) {
            const error = new Error('The read-aloud stream ended before its WAV header');
            error.code = 'tts-failed';
            throw error;
          }
          if (pending.length > 0) this.handlePcm(run, pending, true);
          if (!run.playing) {
            const error = new Error('The read-aloud stream contained no audio');
            error.code = 'tts-failed';
            throw error;
          }

          await this.waitForEnd(run);
          if (token !== this.token || run.aborted) return;
          this.run = null;
          this.publish({ status: 'idle', messageId: null, sessionId: null, error: null });
        } catch (error) {
          if (token !== this.token) return;
          run.aborted = true;
          run.controller.abort();
          if (this.run === run) this.run = null;
          this.clearEndWait();
          this.stopNodes();

          const normalised = {
            code: error?.code ?? (error?.name === 'TypeError' ? 'network' : 'tts-failed'),
            message: error?.message ?? String(error),
          };
          this.publish({ status: 'error', messageId, sessionId, error: normalised });
        }
      }

      async dispose() {
        this.listeners.clear();
        this.cancelCurrent();
        const context = this.context;
        this.context = null;
        if (context !== null) {
          try {
            await context.close();
          } catch {
            // The context may already be closed.
          }
        }
      }
    }

    class VoicePreferences {
      constructor() {
        this.state = { autoPlay: false, loaded: false };
        this.listeners = new Set();
        this.loading = null;
      }

      getState = () => this.state;

      subscribe = (listener) => {
        this.listeners.add(listener);
        return () => {
          this.listeners.delete(listener);
        };
      };

      publish(next) {
        if (this.state.autoPlay === next.autoPlay && this.state.loaded === next.loaded) return;
        this.state = next;
        for (const listener of this.listeners) listener();
      }

      set(settings) {
        this.publish({ autoPlay: settings?.autoPlay === true, loaded: true });
      }

      async ensureLoaded() {
        if (this.state.loaded) return;
        if (this.loading !== null) return this.loading;
        this.loading = (async () => {
          try {
            const data = await api.load();
            if (!this.state.loaded) this.set(data.settings);
          } catch {
            // Leave the preference unloaded; the settings page can retry.
          } finally {
            this.loading = null;
          }
        })();
        return this.loading;
      }
    }

    function SpeakerIcon() {
      return h(
        'svg',
        { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
        h('path', {
          d: 'M5 9.25h3.15L12.4 5.6v12.8l-4.25-3.65H5z',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M15.2 9.1a4.3 4.3 0 0 1 0 5.8M17.9 6.6a7.7 7.7 0 0 1 0 10.8',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
        }),
      );
    }

    function StopIcon() {
      return h(
        'svg',
        { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
        h('rect', {
          x: 8,
          y: 8,
          width: 8,
          height: 8,
          rx: 1.5,
          fill: 'currentColor',
        }),
      );
    }

    function SpinnerIcon() {
      return h(
        'svg',
        { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true, className: 'dtts-spin' },
        h('circle', {
          cx: 12,
          cy: 12,
          r: 7.5,
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeDasharray: '32 15',
        }),
      );
    }

    function ReadAloudAction({ messageId, sessionId, t, useChat, controller }) {
      const rawText = useChat((snapshot) => findAssistantText(snapshot, messageId));
      const text = React.useMemo(() => prepareSpeech(rawText), [rawText]);
      const [state, setState] = React.useState(() => controller.getState());

      React.useEffect(() => {
        const sync = () => setState(controller.getState());
        const unsubscribe = controller.subscribe(sync);
        sync();
        return unsubscribe;
      }, [controller]);

      const active = state.messageId === messageId;
      const status = active ? state.status : 'idle';
      const error = active ? state.error : null;
      const disabled = text.length === 0;

      let label;
      if (disabled) label = t('actionNoText');
      else if (status === 'loading') label = t('actionSynthesizing');
      else if (status === 'playing') label = t('actionStop');
      else if (status === 'error') label = t('actionRetry');
      else label = t('actionRead');

      let title = label;
      if (error) {
        const detail = errorDetail(error);
        title = `${errorCopy(t, error)}${detail ? ` — ${detail}` : ''}`;
      }

      return h(
        React.Fragment,
        null,
        h(
          'button',
          {
            type: 'button',
            className: 'dtts-action',
            'data-state': status,
            'aria-label': title,
            'aria-busy': status === 'loading' ? 'true' : undefined,
            'aria-pressed': status === 'playing' ? 'true' : undefined,
            title,
            disabled,
            onClick: () => {
              if (disabled) return;
              void controller.play(messageId, text, sessionId);
            },
          },
          status === 'loading'
            ? h(SpinnerIcon)
            : status === 'playing'
              ? h(StopIcon)
              : h(SpeakerIcon),
          error ? h('span', { className: 'dtts-errorDot', 'aria-hidden': 'true' }) : null,
        ),
        error ? h('span', { className: 'dtts-sr', role: 'alert' }, title) : null,
      );
    }

    /**
     * Invisible session-scoped guard: stop speech that belongs to another
     * conversation, and auto-play newly completed replies when enabled.
     */
    function SessionPlaybackGuard({ sessionId, controller, useChat, useSession, preferences }) {
      const latestId = useChat((snapshot) => findLatestAssistantId(snapshot));
      const latestText = useChat((snapshot) => latestId ? findAssistantText(snapshot, latestId) : '');
      const openState = useSession((snapshot) => snapshot?.openState);
      const running = useSession((snapshot) => snapshot?.running === true);
      const [prefs, setPrefs] = React.useState(() => preferences.getState());
      const seenRef = React.useRef(latestId || null);
      const prevAutoRef = React.useRef(false);
      const wasRunningRef = React.useRef(false);

      React.useEffect(() => {
        const sync = () => setPrefs(preferences.getState());
        const unsubscribe = preferences.subscribe(sync);
        void preferences.ensureLoaded();
        sync();
        return unsubscribe;
      }, [preferences]);

      React.useEffect(() => {
        const stopForOtherSession = () => {
          const active = controller.getState().sessionId;
          if (active !== null && active !== undefined && active !== sessionId) {
            controller.stop();
          }
        };
        stopForOtherSession();
        return controller.subscribe(stopForOtherSession);
      }, [controller, sessionId]);

      React.useEffect(() => {
        const wasRunning = wasRunningRef.current;
        wasRunningRef.current = running;
        if (running && !wasRunning && prefs.autoPlay) {
          const active = controller.getState();
          if (active.status !== 'idle') controller.stop();
        }
      }, [running, prefs.autoPlay, controller]);

      React.useEffect(() => {
        if (!prefs.loaded || openState !== 'open') {
          seenRef.current = latestId || null;
          prevAutoRef.current = false;
          return;
        }
        if (!prefs.autoPlay) {
          seenRef.current = latestId || null;
          prevAutoRef.current = false;
          return;
        }
        if (!prevAutoRef.current) {
          // Turning auto-play on, or opening a conversation, establishes a
          // baseline so existing history is not read unexpectedly.
          seenRef.current = latestId || null;
          prevAutoRef.current = true;
          return;
        }
        if (!latestId) {
          seenRef.current = null;
          return;
        }
        if (seenRef.current === latestId) return;

        seenRef.current = latestId;
        const speech = prepareSpeech(latestText);
        if (speech) void controller.play(latestId, speech, sessionId);
      }, [prefs.loaded, prefs.autoPlay, openState, latestId, latestText, sessionId, controller]);

      return null;
    }

    function serverPhase(server) {
      if (!server?.ok) return { phase: 'error', message: server?.message ?? '' };
      if (!server.gptSovits) return { phase: 'warn', message: '' };
      return { phase: 'ok', message: '' };
    }

    function TtsSettings({ t, api, controller, preferences }) {
      const [form, setForm] = React.useState(null);
      const [defaults, setDefaults] = React.useState(null);
      const [initial, setInitial] = React.useState(null);
      const [refInfo, setRefInfo] = React.useState(null);
      const [server, setServer] = React.useState({ phase: 'unknown', message: '' });
      const [notice, setNotice] = React.useState(null);
      const [busy, setBusy] = React.useState(null);
      const [preview, setPreview] = React.useState('idle');
      const [loadError, setLoadError] = React.useState(null);
      const [reload, setReload] = React.useState(0);
      const alive = React.useRef(true);
      const previewAudio = React.useRef(null);
      const previewUrl = React.useRef(null);

      function stopPreview() {
        if (previewAudio.current !== null) {
          previewAudio.current.pause();
          previewAudio.current = null;
        }
        if (previewUrl.current !== null) {
          URL.revokeObjectURL(previewUrl.current);
          previewUrl.current = null;
        }
      }

      React.useEffect(() => {
        alive.current = true;
        let cancelled = false;
        setLoadError(null);
        setForm(null);
        setNotice(null);
        setRefInfo(null);
        setServer({ phase: 'checking', message: '' });
        stopPreview();
        setPreview('idle');

        (async () => {
          try {
            const data = await api.load();
            if (cancelled) return;
            setForm(data.settings);
            setInitial(data.settings);
            setDefaults(data.defaults);
            setRefInfo(data.ref);
            preferences.set(data.settings);
            try {
              const probe = await api.probe(data.settings);
              if (cancelled) return;
              setRefInfo(probe.ref);
              setServer(serverPhase(probe.server));
            } catch (error) {
              if (cancelled) return;
              setServer({ phase: 'error', message: errorDetail(error) });
            }
          } catch (error) {
            if (cancelled) return;
            setLoadError(error);
            setServer({ phase: 'unknown', message: '' });
          }
        })();

        return () => {
          cancelled = true;
          alive.current = false;
          stopPreview();
        };
      }, [api, reload]);

      if (loadError !== null) {
        return h(
          'div',
          { className: 'dtts-section' },
          h('h2', { className: 'dtts-title' }, t('title')),
          h('p', { className: 'dtts-intro' }, t('intro')),
          h(
            'div',
            { className: 'dtts-loadError' },
            h('span', null, `${t('loadFailed')}${errorDetail(loadError) ? `：${errorDetail(loadError)}` : ''}`),
            h(
              'button',
              {
                type: 'button',
                className: 'dtts-secondary',
                onClick: () => setReload((value) => value + 1),
              },
              t('retry'),
            ),
          ),
        );
      }

      if (form === null) {
        return h(
          'div',
          { className: 'dtts-section' },
          h('h2', { className: 'dtts-title' }, t('title')),
          h('p', { className: 'dtts-intro' }, t('intro')),
          h('p', { className: 'dtts-hint' }, t('loading')),
        );
      }

      const dirty = initial !== null && JSON.stringify(form) !== JSON.stringify(initial);
      const serverValid = /^https?:\/\/[^\s]+$/i.test(form.serverUrl.trim());
      const refValid = form.refAudioPath.trim().length > 0;
      const speedValid = Number(form.speed) >= 0.6 && Number(form.speed) <= 1.8;
      const fieldsDisabled = busy === 'save';

      const update = (field, value) => {
        setNotice(null);
        setForm((current) => ({ ...current, [field]: value }));
        if (field === 'serverUrl') setServer({ phase: 'unknown', message: '' });
        if (field === 'refAudioPath') setRefInfo(null);
      };

      const validate = () => {
        if (!serverValid) return t('invalidServer');
        if (!refValid) return t('requiredRef');
        if (!speedValid) return t('invalidSpeed');
        return null;
      };

      const probeNow = async () => {
        const invalid = validate();
        if (invalid !== null) {
          setNotice({ tone: 'error', text: invalid });
          return;
        }
        setBusy('probe');
        setNotice(null);
        setServer({ phase: 'checking', message: '' });
        try {
          const result = await api.probe(form);
          if (!alive.current) return;
          setRefInfo(result.ref);
          setServer(serverPhase(result.server));
        } catch (error) {
          if (!alive.current) return;
          setServer({ phase: 'error', message: errorDetail(error) });
        } finally {
          if (alive.current) setBusy(null);
        }
      };

      const save = async () => {
        const invalid = validate();
        if (invalid !== null) {
          setNotice({ tone: 'error', text: invalid });
          return;
        }
        stopPreview();
        setPreview('idle');
        setBusy('save');
        setNotice(null);
        try {
          const result = await api.save(form);
          if (!alive.current) return;
          setForm(result.settings);
          setInitial(result.settings);
          setDefaults(result.defaults ?? defaults);
          setRefInfo(result.ref);
          preferences.set(result.settings);
          setNotice({ tone: 'success', text: t('saved') });
          controller.stop();
          setServer({ phase: 'checking', message: '' });
          try {
            const probe = await api.probe(result.settings);
            if (!alive.current) return;
            setRefInfo(probe.ref);
            setServer(serverPhase(probe.server));
          } catch (error) {
            if (!alive.current) return;
            setServer({ phase: 'error', message: errorDetail(error) });
          }
        } catch (error) {
          if (!alive.current) return;
          const detail = errorDetail(error);
          setNotice({
            tone: 'error',
            text: `${t('saveFailed')}${detail ? `：${detail}` : ''}`,
          });
        } finally {
          if (alive.current) setBusy(null);
        }
      };

      const previewVoice = async () => {
        if (preview === 'playing') {
          stopPreview();
          setPreview('idle');
          return;
        }
        if (preview === 'loading') return;
        const invalid = validate();
        if (invalid !== null) {
          setNotice({ tone: 'error', text: invalid });
          return;
        }
        controller.stop();
        stopPreview();
        setNotice(null);
        setPreview('loading');
        try {
          const blob = await api.preview(form, PREVIEW_TEXTS[form.textLang] ?? PREVIEW_TEXTS.zh);
          if (!alive.current) return;
          const url = URL.createObjectURL(blob);
          previewUrl.current = url;
          const audio = new Audio(url);
          previewAudio.current = audio;
          audio.onended = () => {
            if (!alive.current) return;
            previewAudio.current = null;
            if (previewUrl.current !== null) {
              URL.revokeObjectURL(previewUrl.current);
              previewUrl.current = null;
            }
            setPreview('idle');
          };
          audio.onerror = () => {
            if (!alive.current) return;
            stopPreview();
            setPreview('idle');
            setNotice({ tone: 'error', text: t('errorAudio') });
          };
          await audio.play();
          if (!alive.current) return;
          setPreview('playing');
        } catch (error) {
          if (!alive.current) return;
          stopPreview();
          setPreview('idle');
          const detail = errorDetail(error);
          const copy = error?.name === 'NotAllowedError' || error?.name === 'NotSupportedError'
            ? t('errorAudio')
            : errorCopy(t, error);
          setNotice({
            tone: 'error',
            text: `${copy}${detail ? `：${detail}` : ''}`,
          });
        }
      };

      const reset = () => {
        if (defaults === null) return;
        setForm({ ...defaults });
        setRefInfo(null);
        setServer({ phase: 'unknown', message: '' });
        setNotice(null);
        stopPreview();
        setPreview('idle');
      };

      let statusText = t('statusUnknown');
      if (server.phase === 'checking') statusText = t('statusChecking');
      else if (server.phase === 'ok') statusText = t('statusOnline');
      else if (server.phase === 'warn') statusText = t('statusOnlineNoApi');
      else if (server.phase === 'error') statusText = t('statusOffline');

      const refTone = form.refAudioPath.trim() === ''
        ? 'unknown'
        : refInfo === null
          ? 'unknown'
          : refInfo.exists
            ? 'ok'
            : 'error';
      const refText = form.refAudioPath.trim() === ''
        ? t('refEmpty')
        : refInfo === null
          ? t('refUnknown')
          : refInfo.exists
            ? t('refFound', { size: formatBytes(refInfo.bytes) })
            : t('refMissing');

      const previewLabel = preview === 'loading'
        ? t('testing')
        : preview === 'playing'
          ? t('stopTest')
          : t('test');

      return h(
        'div',
        { className: 'dtts-section' },
        h('h2', { className: 'dtts-title' }, t('title')),
        h('p', { className: 'dtts-intro' }, t('intro')),

        h(
          'div',
          { className: 'dtts-status' },
          h('span', { className: 'dtts-dot', 'data-phase': server.phase, 'aria-hidden': 'true' }),
          h(
            'span',
            {
              className: 'dtts-statusText',
              'data-phase': server.phase,
              title: server.message || undefined,
              role: 'status',
            },
            statusText,
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dtts-inlineButton',
              disabled: busy !== null || server.phase === 'checking' || !serverValid,
              onClick: () => void probeNow(),
            },
            t('probe'),
          ),
        ),

        h(
          'div',
          { className: 'dtts-card' },
          h(
            'div',
            { className: 'dtts-cardHead' },
            h(
              'div',
              null,
              h('div', { className: 'dtts-cardTitle' }, t('serverTitle')),
              h('div', { className: 'dtts-cardHint' }, t('serverHint')),
            ),
          ),
          h(
            'label',
            { className: 'dtts-field' },
            h('span', { className: 'dtts-label' }, t('serverLabel')),
            h('input', {
              className: 'dtts-input dtts-code',
              type: 'url',
              value: form.serverUrl,
              spellCheck: false,
              autoComplete: 'off',
              disabled: fieldsDisabled,
              onChange: (event) => update('serverUrl', event.target.value),
            }),
            !serverValid ? h('p', { className: 'dtts-fileState', 'data-tone': 'error' }, t('invalidServer')) : null,
          ),
        ),

        h(
          'div',
          { className: 'dtts-card' },
          h(
            'div',
            { className: 'dtts-toggleRow' },
            h(
              'div',
              { className: 'dtts-toggleCopy' },
              h('div', { className: 'dtts-cardTitle' }, t('autoPlayTitle')),
              h('div', { className: 'dtts-cardHint' }, t('autoPlayHint')),
            ),
            h(
              'button',
              {
                type: 'button',
                role: 'switch',
                className: 'dtts-switch',
                'data-on': form.autoPlay === true ? 'true' : undefined,
                'aria-checked': form.autoPlay === true,
                'aria-label': t('autoPlayTitle'),
                disabled: fieldsDisabled,
                onClick: () => update('autoPlay', form.autoPlay !== true),
              },
              h('span', { className: 'dtts-switchThumb', 'aria-hidden': 'true' }),
            ),
          ),
        ),

        h(
          'div',
          { className: 'dtts-card' },
          h(
            'div',
            { className: 'dtts-cardHead' },
            h(
              'div',
              null,
              h('div', { className: 'dtts-cardTitle' }, t('refTitle')),
              h('div', { className: 'dtts-cardHint' }, t('refHint')),
            ),
          ),
          h(
            'label',
            { className: 'dtts-field' },
            h('span', { className: 'dtts-label' }, t('refLabel')),
            h('input', {
              className: 'dtts-input dtts-code',
              type: 'text',
              value: form.refAudioPath,
              spellCheck: false,
              autoComplete: 'off',
              disabled: fieldsDisabled,
              onChange: (event) => update('refAudioPath', event.target.value),
            }),
            h('p', { className: 'dtts-fileState', 'data-tone': refTone }, refText),
            !refValid ? h('p', { className: 'dtts-fileState', 'data-tone': 'error' }, t('requiredRef')) : null,
          ),
          h(
            'label',
            { className: 'dtts-field' },
            h(
              'div',
              { className: 'dtts-labelRow' },
              h('span', { className: 'dtts-label' }, t('promptLabel')),
              h('span', { className: 'dtts-value' }, `${form.promptText.length}/1000`),
            ),
            h('textarea', {
              className: 'dtts-textarea',
              value: form.promptText,
              maxLength: 1000,
              rows: 3,
              spellCheck: false,
              disabled: fieldsDisabled,
              onChange: (event) => update('promptText', event.target.value),
            }),
            h('p', { className: 'dtts-hint' }, t('promptHint')),
          ),
          h(
            'div',
            { className: 'dtts-grid' },
            h(
              'label',
              { className: 'dtts-field' },
              h('span', { className: 'dtts-label' }, t('promptLangLabel')),
              h(
                'select',
                {
                  className: 'dtts-select',
                  value: form.promptLang,
                  disabled: fieldsDisabled,
                  onChange: (event) => update('promptLang', event.target.value),
                },
                Object.entries(LANG_LABELS)
                  .filter(([value]) => value !== 'auto')
                  .map(([value, label]) => h('option', { key: value, value }, label)),
              ),
            ),
            h(
              'label',
              { className: 'dtts-field' },
              h('span', { className: 'dtts-label' }, t('textLangLabel')),
              h(
                'select',
                {
                  className: 'dtts-select',
                  value: form.textLang,
                  disabled: fieldsDisabled,
                  onChange: (event) => update('textLang', event.target.value),
                },
                Object.entries(LANG_LABELS).map(([value, label]) => h('option', { key: value, value }, label)),
              ),
            ),
          ),
          h(
            'label',
            { className: 'dtts-field' },
            h(
              'div',
              { className: 'dtts-labelRow' },
              h('span', { className: 'dtts-label' }, t('speedLabel')),
              h('span', { className: 'dtts-value' }, `${Number(form.speed).toFixed(2)}×`),
            ),
            h('input', {
              className: 'dtts-range',
              type: 'range',
              min: 0.6,
              max: 1.8,
              step: 0.05,
              value: form.speed,
              disabled: fieldsDisabled,
              onChange: (event) => update('speed', Number(event.target.value)),
            }),
            !speedValid ? h('p', { className: 'dtts-fileState', 'data-tone': 'error' }, t('invalidSpeed')) : null,
          ),
        ),

        h(
          'div',
          { className: 'dtts-actions' },
          h(
            'button',
            {
              type: 'button',
              className: 'dtts-primary',
              disabled: busy !== null || preview === 'loading' || !dirty,
              onClick: () => void save(),
            },
            busy === 'save' ? t('saving') : t('save'),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dtts-secondary',
              disabled: busy !== null || preview === 'loading',
              onClick: () => void previewVoice(),
            },
            previewLabel,
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dtts-reset',
              disabled: busy !== null || defaults === null,
              onClick: reset,
            },
            t('reset'),
          ),
        ),

        notice !== null
          ? h(
              'p',
              {
                className: 'dtts-notice',
                'data-tone': notice.tone,
                role: notice.tone === 'error' ? 'alert' : 'status',
              },
              notice.text,
            )
          : null,
      );
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dialogue-tts: dictionaries');
      const t = ctx.locale.bind(NS);

      ctx.effect(() => {
        const style = document.createElement('style');
        style.dataset.plugin = '@local/dialogue-tts';
        style.textContent = CSS;
        document.head.appendChild(style);
        return () => {
          style.remove();
        };
      }, 'dialogue-tts: styles');

      const controller = new PlaybackController();
      const preferences = new VoicePreferences();
      ctx.effect(() => () => controller.dispose(), 'dialogue-tts: playback');

      ctx.effect(() => {
        let active = true;
        const remove = () => {
          document.removeEventListener('pointerdown', unlock, true);
          document.removeEventListener('keydown', unlock, true);
        };
        const unlock = () => {
          if (!active) return;
          active = false;
          remove();
          controller.prime();
        };
        document.addEventListener('pointerdown', unlock, true);
        document.addEventListener('keydown', unlock, true);
        return () => {
          active = false;
          remove();
        };
      }, 'dialogue-tts: audio unlock');

      ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
        name: 'conversation.composer.dock',
        id: 'dialogue-tts-session-guard',
        order: -100,
        locale: NS,
        inject: () => ({ controller, preferences }),
      }, SessionPlaybackGuard));

      ctx.slots.inject('conversation.chat.assistant-actions', () => ctx.slots.register({
        name: 'conversation.chat.assistant-actions',
        id: 'dialogue-tts',
        order: 5,
        locale: NS,
        inject: () => ({ controller }),
      }, ReadAloudAction));

      ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: 'dialogue-tts',
        order: 35,
        label: () => t('nav'),
        locale: NS,
        inject: () => ({ api, controller, preferences }),
      }, TtsSettings));
    }

    return {
      inject: ['slots', 'locale'],
      apply,
    };
  },
});
