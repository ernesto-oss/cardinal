/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    swcMinify: true,
    transpilePackages: ["@acme/graphql", "@acme/database"],
  },
};

export default config;
