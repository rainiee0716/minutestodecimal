# Publishing automation

These scripts publish a Markdown article to DEV.to or Hashnode.

## Safety behavior

- Both scripts default to **dry-run**.
- Add `--publish` to actually send the article.
- DEV.to also supports `--draft` to create an unpublished draft through the API.
- Hashnode currently uses a publish mutation, so use `--publish` only when you are ready to post.
- Never commit real API tokens to Git. Put them in `.env.local`, which is already ignored.

## 1. DEV.to

### Create an API key

1. Open DEV.to.
2. Go to **Settings → Extensions → DEV Community API Keys**.
3. Generate an API key.
4. Add it to `.env.local`:

```env
DEVTO_API_KEY=your-devto-api-key
```

### Preview the request

```bash
node scripts/publish-devto.mjs \
  marketing/external-channels/devto-article-full.md \
  --tags "excel,javascript,productivity,tutorial" \
  --dry-run
```

### Create a draft

```bash
node --env-file=.env.local scripts/publish-devto.mjs \
  marketing/external-channels/devto-article-full.md \
  --tags "excel,javascript,productivity,tutorial" \
  --draft
```

### Publish immediately

```bash
node --env-file=.env.local scripts/publish-devto.mjs \
  marketing/external-channels/devto-article-full.md \
  --tags "excel,javascript,productivity,tutorial" \
  --publish
```

### Optional flags

- `--title "..."` — override the Markdown title
- `--description "..."` — set the article description
- `--cover-image "https://..."` — set the cover image
- `--canonical-url "https://..."` — set a canonical URL
- `--series "..."` — assign the article to a DEV.to series
- `--json` — print machine-readable output

DEV.to accepts up to 4 tags.

---

## 2. Hashnode

### Create a token

1. Open Hashnode.
2. Go to **Settings → Developer**.
3. Create a Personal Access Token.
4. Add it to `.env.local`:

```env
HASHNODE_TOKEN=your-hashnode-token
HASHNODE_PUBLICATION_ID=your-publication-id
```

If you do not know the publication ID, you can let the script resolve it from your publication host:

```env
HASHNODE_HOST=minutestodecimal.hashnode.dev
```

### Preview the request

```bash
HASHNODE_PUBLICATION_ID=your-publication-id \
node scripts/publish-hashnode.mjs \
  marketing/external-channels/hashnode-article-full.md \
  --tags "javascript,webdev,tutorial,programming" \
  --dry-run
```

### Publish immediately

```bash
node --env-file=.env.local scripts/publish-hashnode.mjs \
  marketing/external-channels/hashnode-article-full.md \
  --tags "javascript,webdev,tutorial,programming" \
  --publish
```

### Optional flags

- `--title "..."` — override the Markdown title
- `--subtitle "..."` — set the subtitle
- `--slug "..."` — set a custom slug
- `--cover-image "https://..."` — set the cover image
- `--host "example.hashnode.dev"` — resolve the publication ID from a host
- `--publication-id "..."` — pass the publication ID directly
- `--endpoint "https://..."` — override the GraphQL endpoint
- `--json` — print machine-readable output

Hashnode accepts up to 5 tags.

### Important note

Hashnode has changed API access rules over time. If the endpoint rejects the request, check your Hashnode plan and current API documentation. The script supports `--endpoint` so you can switch to any endpoint Hashnode provides for your account.

---

## Markdown format

The scripts expect a normal Markdown file beginning with:

```markdown
# Article title

Article body...
```

You may also use simple frontmatter:

```markdown
---
title: Article title
tags: javascript, webdev
---

Article body...
```

The first `#` heading is removed from the body before publishing.

---

## 3. Medium

### Create an integration token

1. Open Medium.
2. Go to **Settings → Security and apps → Integration tokens**.
3. Create an integration token.
4. Add it to `.env.local`:

```env
MEDIUM_TOKEN=your-medium-token
```

Optionally add your Medium user ID to skip the `/me` lookup:

```env
MEDIUM_USER_ID=your-medium-user-id
```

### Preview the request

```bash
node scripts/publish-medium.mjs \
  marketing/external-channels/medium-article-full.md \
  --tags "payroll,timesheet,productivity,hr" \
  --dry-run
```

### Create a draft

```bash
node --env-file=.env.local scripts/publish-medium.mjs \
  marketing/external-channels/medium-article-full.md \
  --tags "payroll,timesheet,productivity,hr" \
  --draft
```

### Create an unlisted post

```bash
node --env-file=.env.local scripts/publish-medium.mjs \
  marketing/external-channels/medium-article-full.md \
  --tags "payroll,timesheet,productivity,hr" \
  --unlisted
```

### Publish publicly

```bash
node --env-file=.env.local scripts/publish-medium.mjs \
  marketing/external-channels/medium-article-full.md \
  --tags "payroll,timesheet,productivity,hr" \
  --publish
```

### Publish to a Medium publication

If you have permission to post to a Medium publication, pass its ID:

```bash
node --env-file=.env.local scripts/publish-medium.mjs \
  marketing/external-channels/medium-article-full.md \
  --tags "payroll,timesheet,productivity,hr" \
  --publication-id "your-publication-id" \
  --draft
```

### Optional flags

- `--title "..."` — override the Markdown title
- `--canonical-url "https://..."` — set a canonical URL
- `--license "all-rights-reserved"` — set a Medium license
- `--notify-followers` — ask Medium to notify followers
- `--publication-id "..."` — post to a publication instead of your profile
- `--json` — print machine-readable output

Medium accepts up to 5 tags.
