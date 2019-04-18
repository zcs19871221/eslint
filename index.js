module.exports = {
  parser: 'babel-eslint',
  extends: [
    './rules/best-practices',
    './rules/errors',
    './rules/node',
    './rules/style',
    './rules/variables',
    './rules/confusingBrowserGlobals',
    './rules/es6',
    './rules/imports',
    './rules/react',
    './rules/jsx-accessibility',
    './rules/compatibility',
  ]
    .map(require.resolve)
    .concat(['prettier', 'prettier/react']),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    commonjs: true,
    jest: true,
  },
  rules: {},
};
