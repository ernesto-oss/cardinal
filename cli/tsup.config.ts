import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PACKAGE_MANAGER_OVERRIDE: process.env.PACKAGE_MANAGER_OVERRIDE as string,
  },
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  minify: !isDev,
  metafile: !isDev,
  sourcemap: true,
  target: "esnext",
  outDir: "dist",
});
