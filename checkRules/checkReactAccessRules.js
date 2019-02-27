const myReactAccessRules = require('../rules/react-accessibility');
const compareRules = require('./compareRules');
const queryWebDocRules = require('./queryWebDocRules');

const offRules = {
  'no-onchange': '不允许使用onchange事件',
};

module.exports = async () => {
  const webRules = await queryWebDocRules(
    'https://github.com/evcohen/eslint-plugin-jsx-a11y',
    /<li>[\s\S]*?<a.*?href=.*?\/rules\/.*?>(.*?)<\/a>[\s\S]*?<\/li>/g,
  );
  compareRules({
    webRules,
    usedRules: Object.keys(myReactAccessRules.rules).map(name =>
      name.replace('jsx-a11y/', ''),
    ),
    offRules: Object.keys(offRules),
    rulesPath: '/rules/react-accessibility',
  });
};
