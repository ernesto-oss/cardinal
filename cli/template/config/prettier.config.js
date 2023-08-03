
/** 
 * This is the base configuration for yout Prettier preferences. They get globally
 * applied to every package in the workspace.
 */

/** @type {import("prettier").Config} PrettierConfig*/
const baseConfig = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
}

module.exports = baseConfig;