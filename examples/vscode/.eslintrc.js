module.exports = {
  plugins: [
    'lint-md'
  ],
  overrides: [
    {
      files: ['*.md'],
      parser: 'eslint-plugin-lint-md/src/parser',
      rules: {
        'lint-md/space-round-alphabet': ["warn"],
        'lint-md/no-empty-list': ["warn"],
        'lint-md/no-long-code': [2, {
          "length": 10,
          "exclude": []
        }]
      }
    },
  ]
}
