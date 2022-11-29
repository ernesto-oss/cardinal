/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslintrc.cjs", "next"],
  /* Ignore artifacts from codegen */
  ignorePatterns: ["fragment-masking.ts"],
};
