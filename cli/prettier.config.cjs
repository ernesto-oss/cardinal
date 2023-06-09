const baseConfig = require("../prettier.config.cjs");

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins],
};

module.exports = config;
