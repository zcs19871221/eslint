const prettierOffRules = require('eslint-config-prettier');
const bestPractices = require('../rules/best-practices');
const errors = require('../rules/errors');
const es6 = require('../rules/es6');
const node = require('../rules/node');
const style = require('../rules/style');
const variable = require('../rules/variables/variables');
const queryEslintDocRules = require('./queryEslintDocRules');
const compareRules = require('./compareRules');

const offRules = {
  'no-floating-decimal':
    '浮点数必须包含小数点前的0 - 没生效，而且prettier处理了',
};

const check = async function checkJavaScriptRules() {
  const webRules = await queryEslintDocRules();
  const usedRules = Object.keys({
    ...bestPractices.rules,
    ...errors.rules,
    ...es6.rules,
    ...node.rules,
    ...style.rules,
    ...variable.rules,
  });
  const offedRules = Object.keys(offRules).concat(
    Object.keys(prettierOffRules.rules),
  );
  compareRules({
    webRules,
    offRules: offedRules,
    usedRules,
    rulesPath: 'bestPractices,errors,es6,node,style,variable',
  });
};

module.exports = check;
