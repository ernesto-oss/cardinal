/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@acme/database", "@acme/api", "@acme/auth"],
  experimental: {
    appDir: true,
    // serverComponentsExternalPackages: ["@prisma/client"],
  }
};

export default config;
