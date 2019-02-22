module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules: {
    // 继承类构造函数必须使用super,
    // 非继承类构造函数不得使用super
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'constructor-super': 'error',

    // 禁止修改类声明
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-class-assign': 'error',

    // 禁止修改const声明变量
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-const-assign': 'error',

    // 类属性禁止重名
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-dupe-class-members': 'error',

    // 从一个模块import多个内容的话,不要import两次
    // bad: import {a} from 'module'
    // bad: import {b} from 'module'
    // good: import {a,b} from 'module'
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-duplicate-imports': 'error',

    // Symbo直接调用,不要用new Symbol
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new-symbol': 'error',

    // 继承类的构造函数中,在super调用之前禁止使用this赋值
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-this-before-super': 'error',

    // 禁止在对象上使用不必要的[]计算属性
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-computed-key': 'error',

    // 不允许无效的构造函数
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-constructor': 'error',

    // 禁止解构重命名为重名
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],

    // 禁止使用var定义变量
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-var': 'error',

    // 使用es6的简写属性
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],

    // 使用箭头函数作为回调
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],

    // 非改变的变量使用const定义
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],

    // 使用解构来从数组和对象中获取值
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // 使用rest运算符获取参数,不要用arguments
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-rest-params': 'error',

    // 使用...运算符传递参数调用函数
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-spread': 'error',

    // 构造器函数必须包含yield语法
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'require-yield': 'error',

    // 使用Symbol创建唯一值的时候,需要描述字符串
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'symbol-description': 'error',
  },
};
