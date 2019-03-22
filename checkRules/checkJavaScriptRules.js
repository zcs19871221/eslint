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
  'prefer-named-capture-group':
    'ECMAScript2018的语法支持对正则的分组增加名称，增加可读性-但是现在环境一般不支持这么高的版本',
  'vars-on-top': '要求var放到顶部-不需要，禁止使用var',
  'no-label-var': '不使用var',
  'no-undefined':
    '禁止使用undefined，因为undefined是一个全局变量可别人赋值-但是我们通过禁止改变全局变量来防止错误',
  'no-process-env':
    '禁止使用process.env因为他们怕到处读写，弄乱而且怕和其他的工具冲突-但是weback很多打包地方用了，我如果换一个，等于得维护两个，一个process.env.node_env一个自己的，麻烦',
  'no-process-exit': '不让用exit-必须的',
  'no-restricted-modules':
    '禁止引入某些模块-防止模块过多或在不必要的环境引入无用的模块或者禁止lodash而用自己的模块',
  'no-restricted-imports': '禁止引入某些模块-理由同上',
  'no-sync': '禁止同步方法-小脚本没关系',
  'id-match': '命名很难约束',
  'multiline-comment-style': '单行//，多行块注释-注释不做样式要求',
  'no-ternary': '禁止出现三目运算符-不要过度优化',
  'padding-line-between-statements': '语句之间填充行-意义不大',
  'max-statements': '一个函数最大可以生命的变量数',
  'sort-keys': '要求排序对象的键-没必要',
  'sort-vars': '要求排序声明-没必要',
  'sort-imports': '要求排序引用-没必要',
  'prefer-numeric-literals': '意义不明',
  'no-invalid-this': '在适当的环境使用this - 箭头函数不让用this，react不行',
  'func-name-matching':
    '要求函数名和分配的变量名一致 - 已经禁止使用var并且不能使用function定义函数了',
  'capitalized-comments':
    '强制要求注释的第一个字母大写-写就好，要求多就更不写了',
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
