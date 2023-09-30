import contentfulClient from "@/contentful";

export const getContentfulPages = async () => {
  const data = await contentfulClient({ preview: false }).getEntries({
    content_type: "page",
    include: 2,
    // order: ["fields.title"],
  });

  return null;
};
