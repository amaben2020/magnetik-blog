import { createClient } from "contentful";

// initialize the client

if (
  !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
  !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
) {
  throw new Error("Please insert env.local Contentful API key");
}

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export default function contentfulClient({ preview = false }) {
  if (preview) {
    return previewClient;
  }

  return client;
}
