import contentfulClient from "@/contentful";

export const getCFFooter = async () => {
  const data = await contentfulClient({ preview: false }).getEntries({
    content_type: "footer",
  });

  console.log(data);

  return {
    logo: data.items[0].fields.logo,
    links: data.items[0].fields.links,
    newsletter: data.items[0].fields.newsletter,
  };
};
