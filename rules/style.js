module.exports = {
  rules: {
    // 变量命名要求驼峰式
    // 检查变量是否中间有_，有的话报错
    camelcase: "error",

    // 禁止出现匿名函数，即使是函数表达式，为了更好的debug
    "func-names": "warn",

    // 强制使用函数表达式，不要用函数声明
    // 防止在定义之前使用，这样有可能出现问题
    // 且不利于重构：因为如果你先定义，后使用
    // 在读代码的时候，会先读到定义函数的代码，
    // 如果他很大很复杂，你会倾向于重构或把他提取出
    // 一个模块，但如果你先使用，后面再声明，很可能你就不管他了
    "func-style": "error",

    // 变量黑名单，禁止使用data，e，cb，callback
    // 的变量或函数名，因为这些名字不表达开发者的意图
    "id-blacklist": ["error", "data", "err", "e", "cb", "callback"],

    // 要求变量名在2到20之间
    // 非常短的变量名和非常长的变量名会让程序
    // 难以阅读和维护
    "id-length": ['error', {
      "min": 2,
      "max": 30
    }],

    // 变量必须是骆驼式，类必须是首字母大写
    "id-match": ["error", "^(([a-z]+([A-Z][a-z]+))|([A-z][a-z]+))*$"],

    // 强制要求单行注释必须在代码上方
    "line-comment-position": 'error',

    // 强制要求换行必须是unix的\n
    // 为了统一unix和windows下风格
    "linebreak-style": ["error", "unix"],

    // 要求类方法之间必须有空格分割，提高可读性
    "lines-between-class-members": 'error',

    // 要求代码逻辑最大嵌套4层，
    // 过深的嵌套不利于理解代码
    "max-depth": ["error", 3],

    // 要求一个文件的去除空行和注释的行数
    // 不能超过300行
    // 过大的文件说明功能不止一个，不利于维护
    // 重构成多个小文件 单一职责原则
    "max-lines": [
      "error",
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true
      }
    ],

    // 强制要求一个函数行数不超过30行，行数不包含空行和注释
    "max-lines-per-function": [
      "error",
      {
        max: 30,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true
      }
    ],

    // 最大回调嵌套数量
    "max-nested-callbacks": ["error", 3],

    // 函数参数最多为3
    // 函数参数多，读代码就困难，
    // 也说明函数做了不止一件事。
    // 函数参数少，可以根据函数名和参数很快就理解函数的意图
    "max-params": ["error", 3],

    // 函数中最多允许出现十个声明语句
    "max-statements":  ["error", 10],

    // 一行允许最多一个声明语句
    "max-statements-per-line": ["error", { max: 1 }],

    // 要求所有用new创建的函数，类，首字母大写
    "new-cap": [
      "error",
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ["Immutable.Map", "Immutable.Set", "Immutable.List"]
      }
    ],

    // 不允许直接调用Array创建数组，使用new Array
    "no-array-constructor": "error",

    // 禁止使用按位运算符|，一般这个出现多半是输入||输错了
    "no-bitwise": "error",

    // 禁止使用continue语句，不易debug，维护
    "no-continue": "error",

    // disallow comments inline after code
    "no-inline-comments": "error",

    // 禁止在else语句中出现唯一if语句，
    // 这种情况应该使用else if
    "no-lonely-if": "error",

    // 禁止使用链式分配，容易造成意外的全局变量
    "no-multi-assign": ["error"],

    // 不允许在if else条件判断的if中出现否定判断条件
    "no-negated-condition": "error",

    // 禁止嵌套三目运算符
    "no-nested-ternary": "error",

    // 使用字面量创建新对象，不要用new Object
    "no-new-object": "error",

    // 不允许使用自增减一元运算符
    "no-plusplus": "error",

    // 禁止使用for in，with，label语法
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ],

    // 禁止在变量中使用_下划线
    "no-underscore-dangle": [
      "error",
      {
        allow: [],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: false
      }
    ],

    // 禁止使用无用的三目运算符
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],

    // 一个声明符只声明一个变量
    "one-var": ["error", "never"],

    // 尽可能使用赋值运算符
    "operator-assignment": ["error", "always"],

    // 要求注释开头空一格
    "spaced-comment": [
      "error",
      "always",
      {
        line: {
          exceptions: ["-", "+"],
          // space here to support sprockets directives
          markers: ["=", "!"] 
        },
        block: {
          exceptions: ["-", "+"],
          // space here to support sprockets directives
          markers: ["=", "!"], 
          balanced: true
        }
      }
    ]
  }
};
