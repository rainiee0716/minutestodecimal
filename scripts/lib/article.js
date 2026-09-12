import fs from "node:fs";
import path from "node:path";

export function parseCliArgs(argv) {
  const args = {
    _: [],
  };

  const valueFlags = new Set([
    "--title",
    "--tags",
    "--cover-image",
    "--canonical-url",
    "--publication-id",
    "--host",
    "--endpoint",
    "--slug",
    "--subtitle",
    "--description",
    "--series",
  ]);

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (valueFlags.has(arg)) {
      const value = argv[i + 1];
      if (value == null || value.startsWith("--")) {
        throw new Error(`Missing value for ${arg}`);
      }
      const key = arg.slice(2).replaceAll("-", "_");
      args[key] = value;
      i += 1;
      continue;
    }

    if (arg === "--publish") {
      args.publish = true;
      continue;
    }

    if (arg === "--draft") {
      args.draft = true;
      continue;
    }

    if (arg === "--dry-run") {
      args.dry_run = true;
      continue;
    }

    if (arg === "--json") {
      args.json = true;
      continue;
    }

    if (arg === "--verbose") {
      args.verbose = true;
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    args._.push(arg);
  }

  return args;
}

function parseFrontmatterValue(value) {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  if (trimmed.toLowerCase() === "true") return true;
  if (trimmed.toLowerCase() === "false") return false;

  return trimmed.replace(/^["']|["']$/g, "");
}

export function parseMarkdown(raw) {
  let source = raw.replace(/\r\n/g, "\n").trim();
  const frontmatter = {};

  if (source.startsWith("---\n")) {
    const endIndex = source.indexOf("\n---", 4);
    if (endIndex === -1) {
      throw new Error("Invalid frontmatter: closing '---' was not found.");
    }

    const block = source.slice(4, endIndex).trim();
    source = source.slice(endIndex + 4).trim();

    for (const line of block.split("\n")) {
      const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
      if (!match) continue;
      frontmatter[match[1].replaceAll("-", "_")] = parseFrontmatterValue(match[2]);
    }
  }

  const heading = /^#\s+(.+)\s*$/m.exec(source);
  const title =
    frontmatter.title ||
    (heading ? heading[1].trim() : "");

  let body = source;
  if (heading && title === heading[1].trim()) {
    body = source.replace(heading[0], "").trim();
  }

  if (!title) {
    throw new Error("Could not determine the article title. Add a '# Title' heading or use --title.");
  }

  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : typeof frontmatter.tags === "string" && frontmatter.tags
      ? frontmatter.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

  return {
    title,
    body,
    tags,
    frontmatter,
  };
}

export function normalizeTags(tags) {
  if (!tags) return [];

  const list = Array.isArray(tags)
    ? tags
    : String(tags).split(",");

  return [...new Set(
    list
      .map((tag) => String(tag).trim().toLowerCase().replace(/\s+/g, "-"))
      .filter(Boolean)
  )];
}

export function readArticle(filePath, args = {}) {
  if (!filePath) {
    throw new Error("A Markdown file is required.");
  }

  const resolved = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Markdown file not found: ${resolved}`);
  }

  const parsed = parseMarkdown(fs.readFileSync(resolved, "utf8"));
  const title = args.title || parsed.title;
  const tags = normalizeTags(args.tags || parsed.tags || []);

  return {
    ...parsed,
    title,
    tags,
    body: args.body || parsed.body,
  };
}

export function printResult(result, options = {}) {
  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (result.url) console.log(`URL: ${result.url}`);
  if (result.id) console.log(`ID: ${result.id}`);
  if (result.title) console.log(`Title: ${result.title}`);
  if (result.slug) console.log(`Slug: ${result.slug}`);
  if (result.status) console.log(`Status: ${result.status}`);
}

export async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();

  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!response.ok) {
    const message =
      json?.error ||
      json?.message ||
      json?.errors?.[0]?.message ||
      `HTTP ${response.status}`;
    throw new Error(`${message}\n${JSON.stringify(json, null, 2)}`);
  }

  return json;
}
