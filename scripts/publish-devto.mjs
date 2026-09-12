#!/usr/bin/env node

import { readArticle, parseCliArgs, printResult, requestJson } from "./lib/article.js";

const API_URL = "https://dev.to/api/articles";

function buildPayload({ article, args }) {
  return {
    article: {
      title: article.title,
      body_markdown: article.body,
      published: Boolean(args.publish),
      tags: article.tags.slice(0, 4),
      ...(args.description ? { description: args.description } : {}),
      ...(args.cover_image ? { main_image: args.cover_image } : {}),
      ...(args.canonical_url ? { canonical_url: args.canonical_url } : {}),
      ...(args.series ? { series: args.series } : {}),
    },
  };
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const file = args._[0];

  if (!file) {
    console.error(`Usage:
  node scripts/publish-devto.mjs <markdown-file> [options]

Options:
  --title "..."              Override the article title
  --tags "a,b,c"             Up to 4 tags
  --description "..."        Optional SEO description
  --cover-image "https://…"  Optional cover image
  --canonical-url "https://…" Optional canonical URL
  --series "..."             Optional DEV.to series
  --publish                  Publish immediately
  --dry-run                  Print the request payload without sending it
  --json                     Print machine-readable output
`);
    process.exit(1);
  }

  const article = readArticle(file, args);
  const payload = buildPayload({ article, args });

  if (args.dry_run || (!args.publish && !args.draft)) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          endpoint: API_URL,
          file,
          title: article.title,
          tags: article.tags,
          bodyLength: article.body.length,
          payload,
        },
        null,
        2
      )
    );
    return;
  }

  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) {
    throw new Error("DEVTO_API_KEY is not set. Add it to .env.local or export it before running.");
  }

  const result = await requestJson(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
      "User-Agent": "minutestodecimal-publisher/1.0",
    },
    body: JSON.stringify(payload),
  });

  printResult(
    {
      id: result.id,
      title: result.title,
      slug: result.slug,
      url: result.url,
      status: payload.article.published ? "published" : "draft",
    },
    args
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
