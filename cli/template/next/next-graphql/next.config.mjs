/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@acme/database",
    "@acme/api",
    "@acme/config",
  ],
};

export default config;
