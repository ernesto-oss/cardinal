import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "github-dark" },
    }),
  ],
  site: `https://astro.build`,
});
