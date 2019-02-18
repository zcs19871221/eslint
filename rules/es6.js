module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules: {
    // 继承类构造函数必须使用super，
    // 非继承类构造函数不得使用super
    'constructor-super': 'error',

    // 禁止修改类声明
    'no-class-assign': 'error',

    // 禁止修改const声明变量
    'no-const-assign': 'error',

    // 类属性禁止重名
    'no-dupe-class-members': 'error',

    // 从一个模块import多个内容的话，不要import两次
    // bad: import {a} from 'module'
    // bad: import {b} from 'module'
    // good: import {a,b} from 'module'
    'no-duplicate-imports': 'error',

    // Symbo直接调用，不要用new Symbol
    'no-new-symbol': 'error',

    // 继承类的构造函数中，在super调用之前禁止使用this赋值
    'no-this-before-super': 'error',

    // 禁止在对象上使用不必要的[]计算属性
    'no-useless-computed-key': 'error',

    // 不允许无效的构造函数
    'no-useless-constructor': 'error',

    // 禁止解构重命名为重名
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],

    // 禁止使用var定义变量
    'no-var': 'error',

    // 使用es6的简写属性
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],

    // 使用箭头函数作为回调
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],

    // 非改变的变量使用const定义
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],

    // 使用解构来从数组和对象中获取值
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

    // 使用rest运算符获取参数，不要用arguments
    'prefer-rest-params': 'error',

    // 使用...运算符传递参数调用函数
    'prefer-spread': 'error',

    // 构造器函数必须包含yield语法
    'require-yield': 'error',

    // 使用Symbol创建唯一值的时候，需要描述字符串
    'symbol-description': 'error',
  },
};
