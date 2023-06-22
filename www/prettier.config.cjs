const baseConfig = require("../prettier.config.cjs");

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  ...baseConfig,
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-tailwindcss"), // MUST come last
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
  ],
  pluginSearchDirs: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx"],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/(.*)$",
    "^@/components/(.*)$",
    "^@/content/(.*)$",
    "^@/utils/(.*)$",
    "",
    "^[./]",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  tailwindConfig: "./tailwind.config.cjs",
};
