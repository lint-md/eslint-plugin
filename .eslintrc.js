module.exports = {
  'parser': '@typescript-eslint/parser',
  'rules': {
    'no-multiple-empty-lines': 1,
    'import/no-unresolved': 'off',
    'import/order': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  'root': true,
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
    'node': true
  },
  'plugins': [
    '@typescript-eslint'
  ]
}
