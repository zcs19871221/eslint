const confusingGlobals = require('./confusingGlobals');

module.exports = {
  rules: {

    // 不允许删除变量
    'no-delete-var': 'error',

    // 禁止出现容易混淆的全局变量
    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(confusingGlobals),

    // 不允许声明一个已经在外部作用域声明的同名变量
    'no-shadow': 'error',

    // 不允许定义和全局变量同名的变量
    'no-shadow-restricted-names': 'error',

    // 禁止使用未声明的变量
    'no-undef': 'error',

    // 禁止初始化为未定义
    'no-undef-init': 'error',

    // 禁止出现未使用的变量
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    // 不允许在定义变量之前使用
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
  }
};
