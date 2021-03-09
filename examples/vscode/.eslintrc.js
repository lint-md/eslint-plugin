module.exports = {
  extends: ['plugin:lint-md/recommend'],
  // rules 覆盖
  rules: {
    'lint-md/no-long-code': [2, {
      "length": 10,
      "exclude": []
    }]
  }
}