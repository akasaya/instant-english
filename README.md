# Instant English

Instant English is a small static web app for Japanese-to-English instant composition practice.

It is designed for quick repetition: read a Japanese prompt, produce the English sentence immediately, reveal the model answer, and mark whether you got it.

## Features

- 144 prompts across 6 decks
- Writing practice
- Speaking practice with browser speech recognition
- Model answer reveal with English text-to-speech playback
- Level filters
- Shuffle, ordered, and weak-first review modes
- Local progress tracking with streak, accuracy, weak items, and recent history
- No backend, database, account, or runtime API key

## Question Decks

| Deck | Focus | Questions |
| --- | --- | ---: |
| Core | fast grammar recall | 24 |
| Daily | everyday conversation | 24 |
| Work | work and study situations | 24 |
| Travel | travel and going out | 24 |
| Opinion | opinions and explanations | 24 |
| Feelings | feelings and relationships | 24 |

## Local Use

Open `index.html` in a browser.

For microphone testing, use `localhost` instead of opening the file directly:

```bash
python -m http.server 8788
```

Then open:

```text
http://localhost:8788
```

## Question Data

Production questions live in `data/questions.json`.

The browser loads `data/questions.js`, which is generated from the JSON file so the app can still work as a simple static file.

When adding questions through Codex, update `data/questions.json`, then run:

```bash
node scripts/sync-question-data.mjs
```

That regenerates `data/questions.js`.

## Project Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── questions.json
│   └── questions.js
├── scripts/
│   └── sync-question-data.mjs
└── README.md
```

## Deployment

Deployment is handled by the GitHub Actions workflow in `.github/workflows/deploy.yml`.

## License

Private / personal project for now.
