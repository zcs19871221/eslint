#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { confirm } = require("./confirm");

const TS = `overrides: [
  {
    files: ['**/*.ts?(x)'],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: './tsconfig.json',
    },
  },
],`;

const alias = `settings: {
  'import/resolver': {
    alias: [
      ['@Utils', './src/utils'],
    ]
  }
}`;

const createExtends = (config) => {
  return `extends: [${[
    'zcs/base',
    config.isUseNode && 'zcs/rules/node',
    config.isUseBrowser && 'zcs/rules/confusingBrowserGlobals',
    config.isUseReact && 'zcs/rules/react',
    config.isUseReactA11y && 'zcs/rules/jsx-accessibility',
  ].filter(Boolean).map(e => `'${e}',`).join('\n')}],`;
};

const queryConfig = async () =>{
  const isUseNode = await confirm('nodeJs环境');
  if (isUseNode) {
    const pkgJson = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(pkgJson)) {
      const pkgObj = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
      if (!pkgObj.engines || !pkgObj.engines.node) {
        pkgObj.engines = pkgObj.engines || {};
        pkgObj.engines.node = `>=${process.version.replace('v', '')}`;
        fs.writeFileSync(pkgJson, JSON.stringify(pkgObj, null, 2));
      }
    }
  }
  const isUseBrowser = await confirm('browser环境');
  const isUseTs = await confirm('使用TypeScript');
  const isUseReact = await confirm('使用React', isUseBrowser);
  let isUseReactA11y = false;
  if (isUseReact) {
    isUseReactA11y = await confirm('使用React访问性检查', false);
  }
  const isUseAlias = await confirm('使用路径alias', false);
  return {
    isUseNode,
    isUseBrowser,
    isUseReact,
    isUseReactA11y,
    isUseTs,
    isUseAlias,
  };
}


const generateConfig =  (config) => {
  return prettier.format(`module.exports = {
    ${[createExtends(config), config.isUseTs && TS, config.isUseAlias && alias].filter(Boolean).join('\n')}
  };`, {
    parser: 'babel'
  });
};

const createConfig = async () => {
  const config = await queryConfig();
  const configStr = generateConfig(config);
  fs.writeFileSync(path.join(process.cwd(), '.eslintrc.js'), configStr);
}
createConfig()
