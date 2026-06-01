import fs from "node:fs/promises";
import crypto from "node:crypto";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const MAX_SOURCE_ITEMS = Number(process.env.MAX_SOURCE_ITEMS || 18);
const MAX_CANDIDATES = Number(process.env.MAX_CANDIDATES || 12);

const root = new URL("../", import.meta.url);
const sourcesPath = new URL("data/sources.json", root);
const candidatesPath = new URL("data/candidates.json", root);

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required to generate web-based question candidates.");
}

const sources = JSON.parse(await fs.readFile(sourcesPath, "utf8"));
const existing = JSON.parse(await fs.readFile(candidatesPath, "utf8").catch(() => "[]"));
const existingKeys = new Set(existing.map(item => item.sourceKey || item.ja));

function stripTags(text) {
  return text
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function itemBlocks(xml) {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map(match => match[0]);
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
  return match ? stripTags(match[1]) : "";
}

async function fetchSource(source) {
  const response = await fetch(source.url, {
    headers: {
      "User-Agent": "instant-english-question-generator/1.0"
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${source.url}: ${response.status}`);
  }
  const xml = await response.text();
  return itemBlocks(xml).slice(0, MAX_SOURCE_ITEMS).map(block => ({
    source: source.name,
    sourceUrl: tag(block, "link") || source.url,
    title: tag(block, "title"),
    summary: tag(block, "description")
  })).filter(item => item.title);
}

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 16);
}

const sourceItems = (await Promise.allSettled(sources.map(fetchSource)))
  .flatMap(result => result.status === "fulfilled" ? result.value : [])
  .slice(0, MAX_SOURCE_ITEMS);

if (!sourceItems.length) {
  throw new Error("No source items were collected.");
}

const prompt = `
Create Japanese-to-English instant composition practice candidates.

Use the web source items only as broad topical inspiration. Do not copy headlines verbatim. Write short, natural, self-contained Japanese sentences that learners can translate into English. Each item must include a natural English model answer and a short Japanese hint.

Return only valid JSON with this shape:
{
  "items": [
    {
      "ja": "日本語の短い文",
      "en": "Natural English answer.",
      "level": 1,
      "hint": "短い日本語ヒント",
      "sourceName": "source name",
      "sourceUrl": "https://..."
    }
  ]
}

Rules:
- Create at most ${MAX_CANDIDATES} items.
- Levels must be 1, 2, or 3.
- Do not include names of private people unless essential.
- Do not include political persuasion, medical advice, financial advice, or disaster instructions.
- Keep Japanese sentences under 45 characters when possible.
- Keep English answers under 18 words when possible.

Sources:
${JSON.stringify(sourceItems, null, 2)}
`;

const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: OPENAI_MODEL,
    input: prompt,
    text: {
      format: {
        type: "json_object"
      }
    }
  })
});

if (!response.ok) {
  throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
}

const payload = await response.json();
const text = payload.output_text || payload.output?.flatMap(part => part.content || []).map(part => part.text || "").join("") || "";
const parsed = JSON.parse(text);
const generated = Array.isArray(parsed.items) ? parsed.items : [];

const now = new Date().toISOString();
const additions = generated
  .filter(item => item.ja && item.en && item.hint && [1, 2, 3].includes(Number(item.level)))
  .map(item => ({
    ja: item.ja.trim(),
    en: item.en.trim(),
    level: Number(item.level),
    hint: item.hint.trim(),
    sourceName: item.sourceName || "web",
    sourceUrl: item.sourceUrl || "",
    sourceKey: hash(`${item.ja}\\n${item.en}`),
    status: "candidate",
    createdAt: now
  }))
  .filter(item => !existingKeys.has(item.sourceKey));

const next = [...additions, ...existing].slice(0, 80);
await fs.writeFile(candidatesPath, JSON.stringify(next, null, 2) + "\\n", "utf8");

console.log(JSON.stringify({
  sources: sourceItems.length,
  generated: generated.length,
  added: additions.length,
  candidates: next.length
}, null, 2));
