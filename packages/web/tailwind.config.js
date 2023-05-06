const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const localConfig = {
  content: [
    `./components/**/*.{js,ts,jsx,tsx}`,
    `./app/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
};

module.exports = localConfig;
