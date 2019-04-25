const getDepend = require('./getDepend');

const createEnv = ({ jest, webpack, serviceworker }) => {
  if ((serviceworker || webpack || serviceworker) === false) {
    return '';
  }
  return `
    env: {
      ${jest ? 'jest: true,' : ''}
      ${webpack ? 'commonjs: true,' : ''}
      ${serviceworker ? 'serviceworker: true,' : ''}
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
      ${createEnv({ jest, webpack, serviceworker })}
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
