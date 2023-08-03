/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/
const baseConfig = require("@acme/config/prettier.config");

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  ...baseConfig,
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  tailwindConfig: "./tailwind.config.js",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@acme/(.*)$",
    "",
    "^@/utils/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

module.exports = config;