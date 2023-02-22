/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 120,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require.resolve('prettier-plugin-tailwindcss')
  ],
  tailwindConfig: './tailwind.config.cjs',
}
