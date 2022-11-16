/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["@acme/graphql", "@acme/database"],
  },
};

export default config;
