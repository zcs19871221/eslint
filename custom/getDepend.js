const pkg = require('../package.json');

const babelParserName = 'babel-eslint';
const prettierConfigName = 'eslint-config-prettier';
const importAliasPgName = 'eslint-import-resolver-alias';
const compatPgName = 'eslint-plugin-compat';
const importPgName = 'eslint-plugin-import';
const jsxPgName = 'eslint-plugin-jsx-a11y';
const reactPgName = 'eslint-plugin-react';
const {
  name: pkgName,
  version,
  devDependencies: {
    eslint,
    [babelParserName]: babelParser,
    [prettierConfigName]: prettierConfig,
    [importAliasPgName]: importAliasPg,
    [compatPgName]: compatPg,
    [importPgName]: importPg,
    [jsxPgName]: jsxPg,
    [reactPgName]: reactPg,
  },
} = pkg;

const getDepend = ({ prettier, useImport, useComp, jsx, react } = {}) => {
  if (
    prettier === undefined ||
    useImport === undefined ||
    useComp === undefined ||
    jsx === undefined ||
    react === undefined
  ) {
    throw new Error('eslint获取依赖参数有错误');
  }
  const toInstall = [
    `eslint@"${eslint}"`,
    `${babelParserName}@"${babelParser}"`,
    `${pkgName}@"${version}"`,
  ];
  if (prettier) {
    toInstall.push(`${prettierConfigName}@"${prettierConfig}"`);
  }
  if (useImport) {
    toInstall.push(
      `${importPgName}@"${importPg}"`,
      `${importAliasPgName}@"${importAliasPg}"`,
    );
  }
  if (useComp) {
    toInstall.push(`${compatPgName}@"${compatPg}"`);
  }
  if (jsx) {
    toInstall.push(`${jsxPgName}@"${jsxPg}"`);
  }
  if (react) {
    toInstall.push(`${reactPgName}@"${reactPg}"`);
  }
  return toInstall;
};

module.exports = getDepend;
