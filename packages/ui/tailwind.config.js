const merge = require("lodash.merge");
const { fontFamily } = require("tailwindcss/defaultTheme");

const globalConfig = require("@acme/tailwind-config/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
const localConfig = {
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
};

const mergedConfig = merge(globalConfig, localConfig);

module.exports = mergedConfig;
