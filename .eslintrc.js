module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  plugins: ["prettier", "jest"],
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // prettier integration
    "prettier/prettier": "error",

    // project rules overrides
    "no-console": "off",
  },
  ignorePatterns: ["test/mock-project/dist"],
  overrides: [
    {
      files: ["*.test.js"],
      env: {
        "jest/globals": true,
      },
      rules: {
        "no-use-before-define": "off",
      },
    },
  ],
};
