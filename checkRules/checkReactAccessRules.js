const myReactAccessRules = require('../rules/react-accessibility');
const compareRules = require('./compareRules');

const offRules = {
  'no-onchange': '不允许使用onchange事件',
};
compareRules({
  webDocUrl: 'https://github.com/evcohen/eslint-plugin-jsx-a11y',
  webRulesReg: /<li>[\s\S]*?<a.*?href=.*?\/rules\/.*?>(.*?)<\/a>[\s\S]*?<\/li>/g,
  usedRules: Object.keys(myReactAccessRules.rules).map(name =>
    name.replace('jsx-a11y/', ''),
  ),
  offRules: Object.keys(offRules),
  rulesPath: '/rules/react-accessibility',
});
