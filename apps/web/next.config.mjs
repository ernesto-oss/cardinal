/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@acme/database", "@acme/graphql", "@acme/auth"],
};

export default config;
