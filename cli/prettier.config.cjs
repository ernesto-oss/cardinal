const baseConfig = require("../prettier.config.cjs");

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/(.*)$",
    "^@/helpers(.*)$",
    "^@/installers/(.*)$",
    "^@/utils/(.*)$",
    "",
    "^[./]",
  ],
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
};

module.exports = config;
