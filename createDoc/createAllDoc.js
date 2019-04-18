const path = require('path');
const createEslintDoc = require('./createEslintDoc');
const createDoc = require('./createDoc');

const main = () => {
  createDoc({
    rulePath: path.join(__dirname, '../rules/react.js'),
    title: 'React 和 jsx 规范',
    outPutPath: path.join(__dirname, '../doc/react.md'),
    linkTemplate: ruleName =>
      `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${ruleName}.md`,
  });
  createDoc({
    rulePath: path.join(__dirname, '../rules/jsx-accessibility.js'),
    title: 'React 可访问性规范',
    outPutPath: path.join(__dirname, '../doc/reactAccessbility.md'),
    linkTemplate: ruleName =>
      `https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/${ruleName}.md`,
  });
  createDoc({
    rulePath: path.join(__dirname, '../rules/imports.js'),
    title: '模块化规范',
    outPutPath: path.join(__dirname, '../doc/imports.md'),
    linkTemplate: ruleName =>
      `https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/${ruleName}.md`,
  });
  createEslintDoc();
};
main();
