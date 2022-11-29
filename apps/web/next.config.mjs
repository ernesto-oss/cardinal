/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    swcMinify: true,
    transpilePackages: ["@acme/database"],
  },
};

export default config;
