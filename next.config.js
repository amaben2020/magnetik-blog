/** @type {import('next').NextConfig} */
const { config: dotenvConfig } = require("dotenv");
dotenvConfig();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET: "xxx",
  },
};

module.exports = nextConfig;
