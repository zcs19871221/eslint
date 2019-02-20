const fs = require('fs');
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

module.exports = createDoc;
