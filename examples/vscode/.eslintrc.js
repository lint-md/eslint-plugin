module.exports = {
  extends: [
    'eslint:recommended'
  ],
  overrides: [
    {
      files: ['*.md'],
      parser: '@lint-md/eslint-plugin/lib/parser',
      extends: ['plugin:@lint-md/recommend'],
      rules: {
        // 在这里覆盖已有的 rules
        '@lint-md/no-long-code': [2, {
          "length": 100,
          "exclude": []
        }]
      }
    }
  ],
  root: true
}