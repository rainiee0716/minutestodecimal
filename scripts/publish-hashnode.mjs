#!/usr/bin/env node

import { readArticle, parseCliArgs, printResult, requestJson } from "./lib/article.js";

const DEFAULT_ENDPOINT = "https://gql.hashnode.com";

const PUBLICATION_QUERY = `
  query PublicationByHost($host: String!) {
    publication(host: $host) {
      id
      title
    }
  }
`;

const PUBLISH_MUTATION = `
  mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) {
      post {
        id
        title
        slug
        url
      }
    }
  }
`;

async function graphql({ endpoint, token, query, variables }) {
  return requestJson(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
      "User-Agent": "minutestodecimal-publisher/1.0",
    },
    body: JSON.stringify({ query, variables }),
  });
}

async function resolvePublicationId({ args, token, endpoint }) {
  if (args.publication_id) return args.publication_id;

  const envId = process.env.HASHNODE_PUBLICATION_ID;
  if (envId) return envId;

  const host = args.host || process.env.HASHNODE_HOST;
  if (!host) {
    throw new Error(
      "Set HASHNODE_PUBLICATION_ID, HASHNODE_HOST, or pass --publication-id / --host."
    );
  }

  const result = await graphql({
    endpoint,
    token,
    query: PUBLICATION_QUERY,
    variables: { host },
  });

  const publication = result?.data?.publication;
  if (!publication?.id) {
    throw new Error(`Could not resolve a Hashnode publication for host: ${host}`);
  }

  return publication.id;
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const file = args._[0];

  if (!file) {
    console.error(`Usage:
  node scripts/publish-hashnode.mjs <markdown-file> [options]

Required:
  HASHNODE_PUBLICATION_ID     Your Hashnode publication ID
  HASHNODE_TOKEN              Your Hashnode Personal Access Token

Options:
  --title "..."               Override the article title
  --tags "a,b,c"              Up to 5 tags
  --subtitle "..."            Optional subtitle
  --slug "..."                Optional custom slug
  --cover-image "https://…"   Optional cover image
  --publication-id "..."      Override publication ID
  --host "example.hashnode.dev" Resolve publication ID by host
  --endpoint "https://…"      Override GraphQL endpoint
  --publish                   Publish immediately
  --dry-run                   Print the request payload without sending it
  --json                      Print machine-readable output
`);
    process.exit(1);
  }

  const article = readArticle(file, args);
  const endpoint = args.endpoint || process.env.HASHNODE_GRAPHQL_ENDPOINT || DEFAULT_ENDPOINT;
  const token = process.env.HASHNODE_TOKEN;
  const publicationId = await resolvePublicationId({ args, token, endpoint });

  const input = {
    publicationId,
    title: article.title,
    contentMarkdown: article.body,
    tags: article.tags.slice(0, 5),
    ...(args.subtitle ? { subtitle: args.subtitle } : {}),
    ...(args.slug ? { slug: args.slug } : {}),
    ...(args.cover_image ? { coverImage: args.cover_image } : {}),
  };

  if (args.dry_run) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          endpoint,
          file,
          title: article.title,
          tags: article.tags,
          bodyLength: article.body.length,
          publicationId,
          query: PUBLISH_MUTATION,
          variables: { input },
        },
        null,
        2
      )
    );
    return;
  }

  if (!args.publish) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          reason: "Add --publish to send this article to Hashnode.",
          endpoint,
          file,
          title: article.title,
          tags: article.tags,
          publicationId,
        },
        null,
        2
      )
    );
    return;
  }

  if (!token) {
    throw new Error("HASHNODE_TOKEN is not set. Add it to .env.local or export it before running.");
  }

  const result = await graphql({
    endpoint,
    token,
    query: PUBLISH_MUTATION,
    variables: { input },
  });

  const post = result?.data?.publishPost?.post;
  if (!post) {
    throw new Error(`Hashnode did not return a post:\n${JSON.stringify(result, null, 2)}`);
  }

  printResult(
    {
      id: post.id,
      title: post.title,
      slug: post.slug,
      url: post.url,
      status: "published",
    },
    args
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
