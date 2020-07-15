module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["google", "plugin:vue/essential", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "require-jsdoc": "off",
  },
  ignorePatterns: ["dist"],
};
