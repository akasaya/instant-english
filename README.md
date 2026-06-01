# Instant English

Instant English is a small browser app for Japanese-to-English "shunkan eisakubun" practice.

日本語の文を見て、すぐに英語で書く・話す練習をするための静的Webアプリです。ライティング練習とスピーキング練習の両方に対応しています。

## Features

- 144 Japanese-to-English prompts across 6 decks
- Writing mode for typed translation practice
- Speaking mode using browser speech recognition
- Model answer reveal with English text-to-speech playback
- Level filters: Level 1, Level 2, Level 3, or all
- Question order: shuffle, ordered, or weak-first review
- Local progress tracking with streak, accuracy, weak items, and recent history
- Static app: no backend, database, account, or API key required

## Practice Decks

| Deck | Focus | Questions |
| --- | --- | ---: |
| 基礎瞬発 | core grammar and fast sentence production | 24 |
| 日常会話 | everyday conversation | 24 |
| 仕事・学習 | work and study situations | 24 |
| 旅行・外出 | travel and going out | 24 |
| 意見・説明 | opinions and explanations | 24 |
| 感情・人間関係 | feelings and relationships | 24 |

## How To Use

1. Read the Japanese sentence.
2. Translate it into English immediately, either by typing or speaking.
3. Press `答えを見る` to reveal the model answer.
4. Mark the result with `できた` or `もう一回`.
5. Use `苦手優先` to review prompts you missed.

The app stores progress in `localStorage`, so your history stays in the same browser on the same site.

## Microphone Notes

Speaking mode depends on browser support for the Web Speech API. It works best in Chrome or Chromium-based browsers.

For microphone permission to be remembered, open the app from a secure origin:

- `https://...` such as Cloudflare Pages
- `http://localhost...` during local development

Opening the app as a local `file://` URL may cause the browser to ask for microphone permission repeatedly, or speech recognition may be unavailable. If the microphone was blocked, open the browser site settings from the address bar and allow microphone access for the site.

## Local Use

Because this is a static app, you can open `index.html` directly.

For microphone testing, open it from `localhost` or an HTTPS URL instead of `file://`:

```bash
python -m http.server 8788
```

Then open:

```text
http://localhost:8788
```

## Project Structure

```text
.
├── index.html      # App markup
├── styles.css      # Visual design and responsive layout
├── app.js          # Question data and practice logic
├── data/           # Question data and generated candidates
├── scripts/        # Question data maintenance scripts
└── README.md
```

## Question Data

Production questions live in `data/questions.json`. The browser loads `data/questions.js`, which is generated from that JSON so the app still works when opened directly as a static file.

Web-based additions are collected as review candidates in `data/candidates.json`. They are not shown in the app until they are manually reviewed and moved into `data/questions.json`.

## Browser Compatibility

| Feature | Requirement |
| --- | --- |
| Writing practice | Any modern browser |
| Progress saving | `localStorage` |
| Answer playback | `speechSynthesis` |
| Speech input | `SpeechRecognition` / `webkitSpeechRecognition` |
| Persistent mic permission | HTTPS or localhost |

## License

Private / personal project for now. Add a license before distributing broadly.
