module.exports = {
  extends: [
    "eslint:recommended"
  ],
  env: {
    node: true
  },
  overrides: [
    {
      files: ["*.js"],
      plugins: [
        "prettier"
      ],
      rules: {
        "prettier/prettier": ["error", {
          "endOfLine": "auto"
        }]
      }
    },
    {
      files: ["*.md"],
      parser: "@lint-md/eslint-plugin/src/parser",
      extends: ["plugin:@lint-md/recommend"],
      rules: {
        // 在这里覆盖已有的 rules
        "@lint-md/no-long-code": [2, {
          "length": 100,
          "exclude": []
        }]
      }
    }
  ],
  root: true,
  ignorePatterns: [
    ".eslintrc.js"
  ]
};