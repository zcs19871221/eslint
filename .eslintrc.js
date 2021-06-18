module.exports = {
  extends: ["zcs/base", "zcs/rules/node", "zcs/rules/confusingBrowserGlobals"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
      },
    },
  ],
};
