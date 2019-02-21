const prettierOffReactRules = require('eslint-config-prettier/react');
const myReactRules = require('../rules/react');
const compareRules = require('./compareRules');

const offRules = {
  'no-floating-decimal':
    '浮点数必须包含小数点前的0 - 没生效，而且prettier处理了',
};

module.exports = () => {
  compareRules({
    webDocUrl: 'https://github.com/yannickcr/eslint-plugin-react',
    webRulesReg: /<li>[\s\S]*?<a.*?>(react\/.*?)<\/a>[\s\S]*?<\/li>/g,
    offRules: Object.keys(offRules).concat(
      Object.keys(prettierOffReactRules.rules),
    ),
    usedRules: Object.keys(myReactRules.rules)
      .filter(name => name.startsWith('react/'))
      .concat(Object.keys(prettierOffReactRules.rules)),
    rulesPath: '/rules/react.js',
  });
};
