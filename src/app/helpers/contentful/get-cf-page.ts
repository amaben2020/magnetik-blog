import contentfulClient from "@/contentful";

export const getContentfulPage = async (slug: string) => {
  const data = await contentfulClient({ preview: false }).getEntries({
    content_type: "page",
    "fields.slug": slug,
    order: ["fields.title"],
  });

  // console.log(data.items[0].fields);

  return {
    hero: data.items[0].fields,
  };
};
