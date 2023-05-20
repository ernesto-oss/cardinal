/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    '@acme/database',
    '@acme/api',
    '@acme/auth',
    '@acme/config',
  ],
  experimental: {
    appDir: true,
  },
};

export default config;
