/** @format */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: [2, "double"],
    "comma-dangle": "off",
    semi: "always",
    indent: ["error", 2],
  },
  plugins: ["html"],
};
