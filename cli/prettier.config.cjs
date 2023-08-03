/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "", 
    "^@/(.*)$",
    "^@/helpers(.*)$",
    "^@/installers/(.*)$",
    "^@/utils/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
};

module.exports = config;
