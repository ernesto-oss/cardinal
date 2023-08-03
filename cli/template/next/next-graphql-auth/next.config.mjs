/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/config",
  ],
};

export default config;
