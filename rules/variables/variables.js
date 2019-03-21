const confusingGlobals = require('./confusingGlobals');

module.exports = {
  rules: {
    /**
     * @meaning
     * 禁止delete声明变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-delete-var': 'error',

    /**
     * @meaning
     * 禁止使用容易混淆的全局变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(
      confusingGlobals,
    ),

    /**
     * @meaning
     * 不允许声明一个已经在外部作用域声明的同名变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-shadow': 'error',

    /**
     * @meaning
     * 不允许定义和全局变量同名的变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-shadow-restricted-names': 'error',

    /**
     * @meaning
     * 变量必须初始化
     * @why
     * 增加可预测性
     */
    'init-declarations': 'error',

    /**
     * @meaning
     * 禁止使用未声明的变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-undef': 'error',

    /**
     * @meaning
     * 禁止初始化为未定义
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-undef-init': 'error',

    /**
     * @meaning
     * 禁止出现未使用的变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    /**
     * @meaning
     * 不允许在定义变量之前使用变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: true },
    ],
  },
};
