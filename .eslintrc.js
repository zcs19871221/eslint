module.exports = {
  extends: [
    "./base",
    "./rules/node",
    "./rules/confusingBrowserGlobals",
    "./rules/react",
    "./rules/jsx-accessibility",
  ],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
      },
    },
  ],
  settings: {
    "import/resolver": {
      alias: [["@Utils", "./bin"]],
    },
  },
};
