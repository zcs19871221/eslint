module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules: {
    /**
     * @meaning
     * 通过继承的类，构造函数必须使用super
     * 非集成的类，不得使用super
     * @why
     * super的作用就是执行父类方法和构造函数
     * 1. super()直接执行父类构造函数
     * 2. super.xx执行父类xx方法
     * @wrong
     * @right
     * @group
     * 类
     */
    'constructor-super': 'error',

    /**
     * @meaning
     * 禁止修改类声明
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-class-assign': 'error',

    /**
     * @meaning
     * 禁止修改const声明变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-const-assign': 'error',

    /**
     * @meaning
     * 类属性禁止重名
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-dupe-class-members': 'error',

    /**
     * @meaning
     * 同一个模块不要import多次
     * @why
     * 保持代码的简洁
     * @wrong
     * import {a} from 'module'
     * import {b} from 'module'
     * @right
     * import {a, b} from 'module'
     * @group
     */
    'no-duplicate-imports': 'error',

    /**
     * @meaning
     * Symbo直接调用,不要用new Symbol
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new-symbol': 'error',

    /**
     * @meaning
     * 继承类的构造函数中,在super调用之前禁止使用this赋值
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-this-before-super': 'error',

    /**
     * @meaning
     * 禁止在对象上使用不必要的[]计算属性
     * @why
     * @wrong
     * const foo = {
     *   ['abc']: 'abc'
     * }
     * @right
     * const foo = {
     *   abc: 'abc'
     * }
     * @group
     */
    'no-useless-computed-key': 'error',

    /**
     * @meaning
     * 不允许出现空构造函数
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-constructor': 'error',

    /**
     * @meaning
     * 禁止解构重命名为原来变量名
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

    /**
     * @meaning
     * 禁止使用var定义变量
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-var': 'error',

    /**
     * @meaning
     * 使用es6的简写方式写属性
     * @why
     * @wrong
     * @right
     * {
     *   a() {
     *   },
     *   x,
     * }
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

    /**
     * @meaning
     * 使用箭头函数作为回调
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

    /**
     * @meaning
     * 不会改变引用的变量都是用const定义
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

    /**
     * @meaning
     * 使用解构来从数组和对象中获取值
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

    /**
     * @meaning
     * 使用rest运算符获取参数,不要用arguments
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-rest-params': 'error',

    /**
     * @meaning
     * 使用...运算符传递参数调用函数
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-spread': 'error',

    /**
     * @meaning
     * 构造器必须包含yield语法
     * @why
     * @wrong
     * @right
     * @group
     */
    'require-yield': 'error',

    /**
     * @meaning
     * 使用Symbol创建唯一值的时候,需要描述字符串
     * @why
     * @wrong
     * @right
     * @group
     */
    'symbol-description': 'error',
  },
};
