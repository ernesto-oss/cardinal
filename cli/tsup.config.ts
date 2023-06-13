import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/index.ts"],
  format: ["esm"],
  minify: !isDev,
  metafile: !isDev,
  sourcemap: isDev,
  target: "esnext",
  outDir: "dist",
});
