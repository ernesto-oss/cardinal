/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslintrc.cjs", "next"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off"
  }
};
