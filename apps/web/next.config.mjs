import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@acme/database", "@acme/graphql", "@acme/auth"],
};

export default config;
