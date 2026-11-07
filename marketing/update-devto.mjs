// 原地更新 DEV.to 已发布文章（PUT /api/articles/{id}）
// 用法: node --env-file=.env.local marketing/update-devto.mjs <article-id> <markdown-file>
import { readFileSync } from "node:fs";

const [id, mdPath] = process.argv.slice(2);
if (!id || !mdPath) {
  console.error("usage: node --env-file=.env.local marketing/update-devto.mjs <article-id> <markdown-file>");
  process.exit(1);
}

const md = readFileSync(mdPath, "utf8");
const titleMatch = md.match(/^# (.+)$/m);
const title = titleMatch[1].trim();
const body = md.replace(/^# .+\n/, "").trim();

const res = await fetch(`https://dev.to/api/articles/${id}`, {
  method: "PUT",
  headers: {
    "api-key": process.env.DEVTO_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    article: { title, body_markdown: body },
  }),
});
const out = await res.json();
console.log(res.status, JSON.stringify({ url: out.url, edited: out.edited_at ?? null, error: out.error ?? null }));
