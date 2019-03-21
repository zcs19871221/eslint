module.exports = {
  rules: {
    /**
     * @meaning
     * 变量命名要求驼峰式
     * 检查变量是否中间有_, 有的话报错
     * @why
     * @wrong
     * @right
     * @group
     */
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],

    /**
     * @meaning
     * 禁止出现匿名函数
     * @why
     * 为了更好的debug和定位错误
     * @wrong
     * @right
     * @group
     */
    'func-names': 'warn',

    /**
     * @meaning
     * 强制使用函数表达式,不要用函数声明
     * @why
     * 1. 函数声明会悬置，在块作用域下根据strict模式有不同的表现，可以重新分配索引，这都是错误的隐患
     * 2. 不利于重构：因为函数声明可以悬置，一般把它放到运行代码的下面，看不到就不会去重构。如果使用表达式，强制你先定义,后使用，
     *  这样在读代码的时候,会先读到定义函数的代码,
     *  如果他很大很复杂,你会有欲望把它重构或把他提取出
     *  一个模块,因为太碍事了
     * @wrong
     * @right
     * @group
     */
    'func-style': 'error',

    /**
     * @meaning
     * 变量黑名单,禁止使用data,e,cb,callback
     * @why
     * 这些变量名降低可读性
     * @wrong
     * @right
     * @group
     */
    'id-blacklist': ['error', 'data', 'err', 'e', 'cb', 'callback'],

    /**
     * @meaning
     * 一个函数中最多允许出现25条描述语句（包含定义，条件，返回）
     * @why
     * 强制重构
     * @wrong
     * @right
     * @group
     */
    'max-statements': ['error', 25, { ignoreTopLevelFunctions: true }],

    /**
     * @meaning
     * 如果Object.assign的第一个参数是空对象，使用...操作符
     * @why
     * 强制重构
     * @wrong
     * @right
     * @group
     */
    'prefer-object-spread': 'error',

    /**
     * @meaning
     * 变量名长度在2到20之间
     * @why
     * 非常短的变量名和非常长的变量名会让程序难以阅读和维护
     * @wrong
     * @right
     * @group
     */
    'id-length': [
      'error',
      {
        min: 2,
        max: 30,
      },
    ],

    /**
     * @meaning
     * 强制要求单行注释必须在代码上方
     * @why
     * @wrong
     * @right
     * @group
     */
    'line-comment-position': 'error',

    /**
     * @meaning
     * 强制要求换行必须是unix的\n
     * @why
     * 为了统一unix和windows下的源代码
     * 因为有的时候你在linux下读文件然后进行匹配end换行start字符如下：
     * /end.\nstart/
     * 在windows下这段代码可能就不正确了，因为换行是\r\n
     * 保持一致，减少出错几率
     * @wrong
     * @right
     * @group
     */
    'linebreak-style': ['error', 'unix'],

    /**
     * @meaning
     * 要求类方法之间必须有空格分割
     * @why
     * 提高可读性
     * @wrong
     * @right
     * @group
     */
    'lines-between-class-members': 'error',

    /**
     * @meaning
     * 代码嵌套最多5层
     * @why
     * 过深的嵌套降低可读性
     * @wrong
     * @right
     * @group
     */
    'max-depth': ['error', 4],

    /**
     * @meaning
     * 文件去除空行和注释行的行数<=300
     * @why
     * 过大的文件说明功能不止一个,不利于维护
     * 鼓励重构成多个小文件 单一职责原则
     * @wrong
     * @right
     * @group
     */
    'max-lines': [
      'error',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    /**
     * @meaning
     * 函数去除注释和空行的行数<=50
     * @why
     * 理由同max-lines
     * @wrong
     * @right
     * @group
     */
    'max-lines-per-function': [
      'error',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],

    /**
     * @meaning
     * 回调函数嵌套数<=3
     * @why
     * 降低可读性，使用promise或async
     * @wrong
     * @right
     * @group
     */
    'max-nested-callbacks': ['error', 3],

    /**
     * @meaning
     * 函数参数个数<=3
     * @why
     * 1. 函数参数越多，这个函数就越难读懂，测试就越复杂
     * 2. 参数多，也说明函数做了不止一件事，鼓励让函数只做一件事，对函数进行重构
     * @wrong
     * @right
     * @group
     */
    'max-params': ['error', 4],

    /**
     * @meaning
     * 一行只允许写一个执行语句
     * @why
     * 一行写太多内容降低可读性
     * @wrong
     * var bar; var baz;
     * if (condition) { bar = 1; }
     * @right
     * @group
     */
    'max-statements-per-line': ['error', { max: 1 }],

    /**
     * @meaning
     * 所有用new创建的函数,类,首字母大写
     * @why
     * 类首字母大写
     * @wrong
     * @right
     * @group
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: [
          'Immutable.Map',
          'Immutable.Set',
          'Immutable.List',
        ],
      },
    ],

    /**
     * @meaning
     * 不允许直接调用Array创建数组,使用new Array
     * @why
     * Array全局可能被更改引用
     * @wrong
     * @right
     * @group
     */
    'no-array-constructor': 'error',

    /**
     * @meaning
     * 禁止使用按位运算符|
     * @why
     * 前端很少使用bit运算符（除了面试可能）
     * 用的时候一般都是||忘了敲一个|
     * @wrong
     * @right
     * @group
     */
    'no-bitwise': 'error',

    /**
     * @meaning
     * 禁止使用continue
     * @why
     * 降低代码可读性，不易debug
     * @wrong
     * @right
     * @group
     */
    'no-continue': 'error',

    /**
     * @meaning
     * 禁止注释和代码放到同一行
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-inline-comments': 'error',

    /**
     * @meaning
     * 禁止if语句是else语句中的唯一语句
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-lonely-if': 'error',

    /**
     * @meaning
     * 禁止使用链式分配 a = b = c
     * @why
     * 会造成意外的全局变量
     * function x() {
     *   var a = b = c = 5;
     * }
     * x()
     * console.log(b)
     * @wrong
     * var a = b = c = 5;
     * @right
     * const a = 5;
     * const b = 5;
     * const c = 5;
     * @group
     * 变量
     */
    'no-multi-assign': ['error'],

    /**
     * @meaning
     * 禁止在if else和三目运算符中的判断条件出现否定表达(`! !=`)
     * @why
     * 否定句式降低可读性：
     * 下面第一种比第二种更难以理解
     * if (!notHigh) else {}
     * if (low) else {}
     * @wrong
     * if (!a) {
     *    doSomething();
     * } else {
     *    doSomethingElse();
     * }
     * if (a != b) {
     *     doSomething();
     * } else {
     *     doSomethingElse();
     * }
     * !a ? c : b
     * @right
     * @group
     */
    'no-negated-condition': 'error',

    /**
     * @meaning
     * 禁止嵌套三目运算符
     * @why
     * 降低可读性
     * @wrong
     * var thing = foo ? bar : baz === qux ? quxx : foobar;
     * foo ? baz === qux ? quxx() : foobar() : bar();
     * @right
     * @group
     */
    'no-nested-ternary': 'error',

    /**
     * @meaning
     * 使用字面量创建新对象,不要用new Object
     * @why
     * 更简洁，少敲代码
     * @wrong
     * var myObject = new Object();
     * @right
     * var myObject = {};
     * @group
     */
    'no-new-object': 'error',

    /**
     * @meaning
     * 不允许使用自增减一元运算符
     * @why
     * ++--会影响asi行为。
     * asi规定：当本行除了换行符和空白外只有++或--，那么换行符不自动插入\n
     * 所以：
     * var i = 10;
     * var j = 20;
     * i
     * ++
     * j
     * //等价于 i;++j; i = 10, j = 21
     * @wrong
     * i++
     * @right
     * i += 1;
     * i -= 1
     * @group
     */
    'no-plusplus': 'error',

    /**
     * @meaning
     * 禁止使用for in,with,label语法
     * @why
     * for..in遍历原型链，容易出错
     * label和with容易混淆
     * @wrong
     * @right
     * @group
     */
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    /**
     * @meaning
     * 禁止使用无效的三目运算符
     * @why
     * @wrong
     * var isYes = answer === 1 ? true : false;
     * @right
     * var isYes = answer === 1;
     * @group
     */
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    /**
     * @meaning
     * 一个声明符只声明一个变量
     * @why
     * 一个声明符声明多个的坏处是：
     * 1. 添加新变量的时需要费心在哪个位置添加：在中间，需要添加逗号。在底部必须更改之前最后一个变量的;变成,否则会产生意外的全局变量.
     * 2. debug时候一次跳到声明结束，没法对每一个声明语句debug。
     * @wrong
     * let a,b,c
     * @right
     * let a;
     * let b;
     * let c;
     * @group
     */
    'one-var': ['error', 'never'],

    /**
     * @meaning
     * 尽可能使用简写赋值运算符 +=
     * @why
     * 更简洁
     * @wrong
     * x = x + y
     * @right
     * x += y;
     * @group
     */
    'operator-assignment': ['error', 'always'],

    /**
     * @meaning
     * 使用that保存this索引
     * @why
     * 统一，增加可读性
     */
    'consistent-this': 'error',

    /**
     * @meaning
     * 要求注释开头空一格
     * @why
     * @wrong
     * @right
     * @group
     */
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!'],
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!'],
          balanced: true,
        },
      },
    ],
  },
};
