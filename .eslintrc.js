module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:ember-suave/recommended',
    'prettier'
  ],
  env: {
    browser: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'ember/named-functions-in-promises': ['error', { allowSimpleArrowFunction: true }],
    'ember-suave/no-const-outside-module-scope': 'off',
    'prefer-const': 'error'
  }
};
