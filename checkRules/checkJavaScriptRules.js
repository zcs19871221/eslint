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
  'no-await-in-loop': '禁止在循环中使用await - 还是有需要的，关掉',
  'no-console': 'node中有console方便',
  'no-underscore-dangle': '有原生方法是_开头的，必须能够使用',
  'block-scoped-var': '把var视为块级作用域-没必要，禁止使用var',
  'guard-for-in': 'for-in方法必须通过hasownProperty检查-已经不让用for in语法了',
  'no-eq-null': '禁止==和null比较-已经不让用==了',
  'no-extra-label': 'label语法不让用了',
  'no-implicit-globals': '禁止在顶级作用域定义全局变量-不适用于webpack模块化的',
  'no-unused-labels': 'label语法已禁止',
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
