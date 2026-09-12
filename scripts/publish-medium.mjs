#!/usr/bin/env node

import { readArticle, parseCliArgs, printResult, requestJson } from "./lib/article.js";

const API_BASE = "https://api.medium.com/v1";
const ME_ENDPOINT = `${API_BASE}/me`;

function buildPayload({ article, args }) {
  const publishStatus = args.publish
    ? "public"
    : args.unlisted
      ? "unlisted"
      : "draft";

  return {
    title: article.title,
    contentFormat: "markdown",
    content: article.body,
    tags: article.tags.slice(0, 5),
    publishStatus,
    ...(args.canonical_url ? { canonicalUrl: args.canonical_url } : {}),
    ...(args.license ? { license: args.license } : {}),
    ...(args.notify_followers ? { notifyFollowers: true } : {}),
  };
}

async function resolveUser() {
  const token = process.env.MEDIUM_TOKEN;
  if (!token) {
    throw new Error("MEDIUM_TOKEN is not set. Add it to .env.local or export it before running.");
  }

  const envUserId = process.env.MEDIUM_USER_ID;
  if (envUserId) return envUserId;

  const result = await requestJson(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "minutestodecimal-publisher/1.0",
    },
  });

  const userId = result?.data?.id;
  if (!userId) {
    throw new Error(`Could not resolve your Medium user ID:\n${JSON.stringify(result, null, 2)}`);
  }

  return userId;
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const file = args._[0];

  if (!file) {
    console.error(`Usage:
  node scripts/publish-medium.mjs <markdown-file> [options]

Required:
  MEDIUM_TOKEN    Medium Integration Token

Optional environment:
  MEDIUM_USER_ID  Skip the /me lookup if you already know your Medium user ID

Options:
  --title "..."                 Override the article title
  --tags "a,b,c"                Up to 5 tags
  --canonical-url "https://…"   Canonical URL, useful for cross-posting
  --license "all-rights-reserved" Optional Medium license
  --notify-followers            Ask Medium to notify followers
  --publication-id "..."        Publish to a Medium publication instead of your profile
  --draft                       Create a draft
  --unlisted                    Create an unlisted post
  --publish                     Publish publicly
  --dry-run                     Print the request payload without sending it
  --json                        Print machine-readable output
`);
    process.exit(1);
  }

  const article = readArticle(file, args);
  const payload = buildPayload({ article, args });

  if (args.dry_run || (!args.publish && !args.draft && !args.unlisted)) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          endpoint: "https://api.medium.com/v1",
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

  const token = process.env.MEDIUM_TOKEN;
  if (!token) {
    throw new Error("MEDIUM_TOKEN is not set. Add it to .env.local or export it before running.");
  }

  const endpoint = args.publication_id
    ? `${API_BASE}/publications/${args.publication_id}/posts`
    : `${API_BASE}/users/${await resolveUser()}/posts`;

  const result = await requestJson(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "minutestodecimal-publisher/1.0",
    },
    body: JSON.stringify(payload),
  });

  const post = result?.data;
  if (!post?.url) {
    throw new Error(`Medium did not return a post URL:\n${JSON.stringify(result, null, 2)}`);
  }

  printResult(
    {
      id: post.id,
      title: post.title,
      url: post.url,
      status: payload.publishStatus,
    },
    args
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
