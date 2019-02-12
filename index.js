module.exports = {
  extends: [
    "./rules/best-practices",
    "./rules/errors",
    "./rules/node",
    "./rules/style",
    "./rules/variables/variables",
    "./rules/es6",
    "./rules/imports",
    "./rules/react",
    "./rules/react-a11y"
  ]
    .map(require.resolve)
    .concat(["prettier", "prettier/react"]),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {}
};
