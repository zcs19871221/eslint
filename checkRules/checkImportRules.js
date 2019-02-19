const myRules = require('../rules/import');
const compareRules = require('./compareRules');

const offRules = {
  'import/no-extraneous-dependencies':
    '引用的模块不能在dev里 - 和脚手架ci冲突，关闭',
};

module.exports = () => {
  compareRules({
    webDocUrl: 'https://github.com/benmosher/eslint-plugin-import',
    webRulesReg: /<li>[\s\S]*?<a.*?href=.*?\/rules\/.*?>(.*?)<\/a>[\s\S]*?<\/li>/g,
    usedRules: Object.keys(myRules.rules).map(name =>
      name.replace('import/', ''),
    ),
    offRules: Object.keys(offRules),
    rulesPath: '/rules/import',
  });
};
