/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
const baseConfig = require("@acme/config/prettier.config");

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  ...baseConfig,
  plugins: [require.resolve("@ianvs/prettier-plugin-sort-imports")],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^@acme/(.*)$",
    "",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
};

module.exports = config;
