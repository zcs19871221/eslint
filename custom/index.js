const getDepend = require('./getDepend');

const createEnv = ({ browser, jest, webpack, serviceworker }) => {
  const commonjs = browser && webpack;
  const useServiceworker = browser && serviceworker;
  if ((jest || commonjs || useServiceworker) === false) {
    return '';
  }
  return `
    env: {
      ${jest ? 'jest: true,' : ''}
      ${commonjs ? 'commonjs: true,' : ''}
      ${useServiceworker ? 'serviceworker: true,' : ''}
    },
  `;
};
/* eslint-disable max-lines-per-function  */
const custom = ({
  es6 = true,
  browser = false,
  node = true,
  compat = false,
  react = false,
  jsx = false,
  prettier = true,
  jest = true,
  webpack = false,
  serviceworker = false,
  atRoot = true,
} = {}) => {
  const useImport = node || (browser && es6);
  const useComp = browser && compat;
  const template = `
    module.exports = {
      extends: [
        'zcs/rules/best-practices',
        'zcs/rules/errors',
        ${node ? "'zcs/rules/node,'" : ''}
        'zcs/rules/style',
        'zcs/rules/variables',
        ${es6 ? "'zcs/rules/es6'," : ''}
        ${browser ? "'zcs/rules/confusingBrowserGlobals'," : ''}
        ${useImport ? "'zcs/rules/imports'," : ''}
        ${useComp ? "'zcs/rules/compatibility'," : ''}
        ${react ? "'zcs/rules/react'," : ''}
        ${jsx ? "'zcs/rules/jsx-accessibility'," : ''}
        ${prettier ? "'prettier'," : ''}
        ${prettier && react ? "'prettier/react'," : ''}
      ],
      ${atRoot ? 'root: true,' : ''}
      parser: 'babel-eslint',
      ${
        es6
          ? `parserOptions: {
              ecmaVersion: 2018,
            },`
          : ''
      }
      ${createEnv({
        browser,
        jest,
        webpack,
        serviceworker,
      })}
    };
  `;
  const depend = getDepend({ prettier, useImport, useComp, jsx, react });
  return {
    template: template
      .split('\n')
      .filter(line => line.trim())
      .join('\n'),
    depend,
  };
};

module.exports = custom;
