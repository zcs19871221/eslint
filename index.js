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
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: ['./rules/typescript'],
    },
  ],
};
