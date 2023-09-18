import { createClient } from "contentful";

// initialize the client
const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env;
if (
  !CONTENTFUL_ACCESS_TOKEN ||
  !CONTENTFUL_SPACE_ID ||
  CONTENTFUL_PREVIEW_ACCESS_TOKEN
) {
  throw new Error("Please insert env.local Contentful API key");
}

export const client = createClient({
  space: CONTENTFUL_SPACE_ID!,
  accessToken: CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: CONTENTFUL_SPACE_ID!,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export default function contentfulClient({ preview = false }) {
  if (preview) {
    return previewClient;
  }

  return client;
}
