import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);
const questionsPath = new URL("data/questions.json", root);
const questionsJsPath = new URL("data/questions.js", root);

const decks = JSON.parse(await fs.readFile(questionsPath, "utf8"));
await fs.writeFile(
  questionsJsPath,
  `window.QUESTION_DECKS = ${JSON.stringify(decks, null, 2)};\n`,
  "utf8"
);

console.log(`Synced ${decks.reduce((sum, deck) => sum + deck.items.length, 0)} questions.`);
