import apolloClient from "@/app/utils/apollo-client";
import gql from "graphql-tag";

export async function getHeader() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetHeader {
        headerCollection {
          items {
            navigationsCollection {
              items {
                title
                url
                isExternal
              }
            }
            logo {
              image {
                title
                description
                url
              }
              link {
                url
                title
                isExternal
              }
            }
          }
        }
      }
    `,
  });
  console.log("Header,", data);

  const contentTypeId = data?.sys;
  console.log(contentTypeId);

  return data.headerCollection.items;
}

export async function getAllPosts() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllPosts {
        postCollection {
          items {
            title
            subtitle
            sys {
              publishedAt
            }
            slug
            image {
              url
            }
          }
        }
      }
    `,
  });
  return data.postCollection.items;
}

export async function getPostBySlug(slug: string) {
  const { data } = await apolloClient.query({
    query: gql`
      query GetPostBySlug($slug: String!) {
        postCollection(where: { slug: $slug }) {
          items {
            title
            subtitle
            sys {
              publishedAt
            }
            image {
              url
            }
            content
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return data.postCollection.items[0];
}

export default { getAllPosts, getPostBySlug, getHeader };
