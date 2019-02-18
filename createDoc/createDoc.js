const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const createContent = require('./createContent');
const createContentList = require('./createContentList');
const createTitle = require('./createTitle');

const createDoc = ({ rulePath, title, outPutPath, linkTemplate }) => {
  try {
    const file = fs.readFileSync(rulePath, 'utf-8');
    const { content, rulesName } = createContent(file, linkTemplate);
    const doc = createTitle(title) + createContentList(rulesName) + content;
    fs.writeFileSync(outPutPath, doc);
    console.log(chalk.bold.green(`规则${rulePath}的文档已创建：${outPutPath}`));
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
};

const main = () => {
  createDoc({
    rulePath: path.join(__dirname, '../rules/react.js'),
    title: 'React 和 jsx 规范',
    outPutPath: path.join(__dirname, '../react.md'),
    linkTemplate: ruleName =>
      `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${ruleName}.md`,
  });
  createDoc({
    rulePath: path.join(__dirname, '../rules/react-accessibility.js'),
    title: 'React 可访问性规范',
    outPutPath: path.join(__dirname, '../reactAccessbility.md'),
    linkTemplate: ruleName =>
      `https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/${ruleName}.md`,
  });
};
main();
