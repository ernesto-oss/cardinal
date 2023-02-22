import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

export default defineConfig({
  integrations: [
  // Enable Preact to support Preact JSX components.
  preact(),
  // Enable React for the Algolia search component.
  react(), tailwind(), image({
    serviceEntryPoint:  "@astrojs/image/sharp"
  })],
  site: `https://astro.build`
});
