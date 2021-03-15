# 在使用 prettier 的项目中使用本插件

将 prettier 配置放到 overrides 中, 单独指定 prettier 要处理的文件后缀：

```javascript
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
```