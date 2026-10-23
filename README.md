# 朗读对话 / Read Aloud

一个 DeepSeek Harness Web 插件：用本地 GPT-SoVITS 朗读助手的回复，并在设置中配置参考语音。

## 功能

- 每条已完成的助手回复下方增加一个喇叭按钮：点击合成并播放，再次点击停止。
- 长文本按约 600 字自动分段，优先在句子边界切分；当前段播放时预取下一段，然后依次排队播放。
- “设置 → 朗读对话”提供完整配置：
  - GPT-SoVITS 服务地址
  - 参考音频路径（Host 与 GPT-SoVITS 进程都必须能读取）
  - 参考音频文本与语言（用于提升音色相似度）
  - 朗读语言与语速
  - 连接检测、参考文件检查、试听与保存
- 设置持久化到 `%DSH_HOME%/plugin-data/dialogue-tts/settings.json`，不会写入插件仓库。
- 合成音频按消息分段缓存在当前页面内；保存新参考语音后会清空缓存。

## 默认配置

| 配置项 | 默认值 |
| --- | --- |
| `serverUrl` | `http://127.0.0.1:9880` |
| `refAudioPath` | 空 |
| `promptText` | 空 |
| `promptLang` | `zh` |
| `textLang` | `zh` |
| `speed` | `1.0` |

首次使用时必须在设置中填写参考音频路径；仓库不包含任何参考音频、试听音频或本地配置。

## 安装

```bash
git clone git@github.com:zarcc3/dsh-dialogue-tts.git
```

在 DeepSeek Harness 的 Plugin Manager 中，从克隆后的本地目录安装 `@local/dialogue-tts`。插件安装后不需要把源码复制到 profile 目录。

## 使用

1. 启动 GPT-SoVITS API（默认端口 9880）。
2. 在 Harness 中启用本插件。
3. 打开“设置 → 朗读对话”，填写本机 GPT-SoVITS 能读取的参考音频路径；按需填写参考文本并选择语言。
4. 点击“检测连接”确认服务与参考文件，点击“试听参考语音”确认音色。
5. 保存设置后，在助手回复的操作栏点击喇叭按钮朗读。

## GPT-SoVITS 接口

Host 端以 `POST {serverUrl}/tts` 调用 GPT-SoVITS，请求字段包括：

```json
{
  "text": "要朗读的文本",
  "text_lang": "zh",
  "ref_audio_path": "C:\\path\\to\\reference.wav",
  "prompt_text": "参考音频里说出的文字",
  "prompt_lang": "zh",
  "text_split_method": "cut5",
  "speed_factor": 1
}
```

## 配置与隐私

- 仓库只包含插件源码、语言资源、图标和文档。
- 运行时配置 `settings.json`、参考音频和试听音频都不会被提交；`.gitignore` 已忽略音频文件、`settings.json`、`node_modules` 和日志。
- 浏览器只访问 Harness 同源 Host 路由 `/plugin-api/dialogue-tts/*`；参考音频路径不会上传到第三方服务。

## 实现

- Host 端（`index.js`）注册同源 HTTP 路由，负责设置读写、服务探测、参考文件检查与音频代理。
- Client 端（`client.js`）注册：
  - `conversation.chat.assistant-actions`：每条助手回复的朗读按钮。
  - `settings.section`：设置页面。

## 已知限制

- 长文本按约 600 字分段，每段一次合成请求；如果 GPT-SoVITS 合成速度慢于播放速度，段与段之间会出现等待。
- 只朗读助手回复中的正文文本块；代码块和 Markdown 标记会被清理，不朗读。
- 参考音频必须能被运行 GPT-SoVITS 的进程读取；浏览器不会上传或读取该文件。
