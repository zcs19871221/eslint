module.exports = {
  rules: {
    /**
     * @meaning
     * 禁止for循环设置错误的循环方向
     * @why
     * @wrong
     * @right
     * @group
     */
    'for-direction': 'error',
    /**
     * @meaning
     * 禁止promise中的函数使用async函数
     * @why
     * 不需要用,async就是返回promise
     * @wrong
     * @right
     * @group
     */
    'no-async-promise-executor': 'error',

    /**
     * @meaning
     * 强制在getter函数中使用return
     * @why
     * @wrong
     * @right
     * @group
     */
    'getter-return': ['error', { allowImplicit: true }],

    /**
     * @meaning
     * 禁止与-0比较
     * @why
     * 0 === -0 0 === +0 于-0比较没意义
     * @wrong
     * @right
     * @group
     */
    'no-compare-neg-zero': 'error',

    /**
     * @meaning
     * 禁止在条件语句中赋值
     * @why
     * if (user.jobTitle = 'manage')这段代码容易让人混淆
     * 到底是一个赋值还是仅仅是少写了一个===号，虽然执行结果一致，
     * 但是赋值会重新设置user的属性
     * @wrong
     * if (user.jobTitle = 'manage')
     * @right
     * if (user.jobTitle === 'manage')
     * @group
     * 条件判断
     */
    'no-cond-assign': ['error', 'always'],

    /**
     * @meaning
     * 条件判断中禁止使用常量
     * @why
     * 如果条件判断是常量，一般都是写错的情况
     * @wrong
     * if (true)
     * while (true)
     * @right
     * if (x === 0)
     * while (x)
     * @group
     */
    'no-constant-condition': 'warn',

    /**
     * @meaning
     * 检查是否正则中有多个码点字符
     */
    'no-misleading-character-class': 'error',

    /**
     * @meaning
     * 禁止+=中出现可能导致条件竞争的语法
     * @why
     * 如果有多个并行的a += await b语句，可能导致出错
     * a += await b
     * a += await c
     * 这里a += 时候，执行到await的时候，会把当前a的值读取并等待结果做处理
     * 这样有可能忽略并行对结果的改变
     */
    'require-atomic-updates': 'error',
    /**
     * @meaning
     * 禁止正则中的控制字符
     * @why
     * 控制字符是ASCII范围0-31中的特殊不可见字符。这些字符在JavaScript字符串中很少使用，因此包含这些字符的正则表达式很可能是错误的。
     * @wrong
     * var pattern1 = /\x1f/;
     * @right
     * var pattern1 = /\x20/;
     * @group
     */
    'no-control-regex': 'error',

    /**
     * @meaning
     * 禁止使用debugger
     * @why
     * 在生产环境遗留debugger代码会导致浏览器定制代码
     * 如果debug使用浏览器断点
     * @wrong
     * debugger;
     * @right
     * @group
     * 最佳实践
     */
    'no-debugger': 'error',

    /**
     * @meaning
     * 函数参数中禁止出现重复名称
     * @why
     * 1. 最后出现的重名参数会覆盖之前的
     * 2. 这很可能是一个拼写错误
     * @wrong
     * function foo(a, b, a)
     * @right
     * function foo(a, b, c)
     * @group
     * 函数
     */
    'no-dupe-args': 'error',

    /**
     * @meaning
     * 对象中禁止出现重复属性
     * @why
     * 1. 最后出现的重名参数会覆盖之前的
     * 2. 这很可能是一个拼写错误
     * @wrong
     * var foo = {a:'1234', b:'2344'}
     * @right
     * @group
     * 对象
     */
    'no-dupe-keys': 'error',

    /**
     * @meaning
     * witch语句中禁止出现同样条件的case块
     * @why
     * 这很可能是复制case代码段后忘了改变条件造成的错误
     * @wrong
     * @right
     * @group
     * 条件判断
     */
    'no-duplicate-case': 'error',

    /**
     * @meaning
     * 禁止出现空块语句
     * @why
     * 空语句块有可能是遗漏或忘了处理造成的错误
     * 如果有空语句块，请通过加入注释证明确实不是开发人员的失误造成的
     * @wrong
     * if (foo) {}
     * while (foo) {}
     * switch(foo) {}
     * @right
     * if (foo) {
     *  // empty
     * }
     * while (foo) {
     *  // empty
     * }
     * switch(foo) {
     *  // empty
     * }
     * @group
     */
    'no-empty': 'error',

    /**
     * @meaning
     * 禁止正则的[]是空的
     * @why
     * 防止意外输错
     * @wrong
     * @right
     * @group
     */
    'no-empty-character-class': 'error',

    /**
     * @meaning
     * 禁止在catch语句中为错误参数重新赋值
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-ex-assign': 'error',

    /**
     * @meaning
     * 禁止不必要的强制布尔转换
     * @why
     * @wrong
     * var foo = !!!bar;
     * @right
     * @group
     */
    'no-extra-boolean-cast': 'error',

    /**
     * @meaning
     * 禁止在代码某些位置换行而不添加;
     * @why
     * 由于ansi规则，有些会被程序认为是错误的
     * ansi:
     * 1. 默认\n插入;
     * 2. 特殊情况不插入分号
     *     - 本行
     *       1. 有未结束括号[](){}
     *       2. 以操作符结尾(+ - * / )
     *       3. 以,结尾
     *       4. 以.结尾
     *       5. 只有++或--
     *     - 下一行
     *       1. 以括号[]()开始
     *       2. 以操作符开始 + - * /
     *       3. 以正则开始 //
     *       4. 以模板符号开始 ``
     *       5. 以.开始
     * @wrong
     * var foo = '1234'
     * /1234/.test(foo)
     * @right
     * var foo = '1234';
     * /1234/.test(foo);
     * @group
     */
    'no-unexpected-multiline': 'error',

    /**
     * @meaning
     * 禁止出现不必要的分号
     * @why
     * @wrong
     * var x = 5;;
     * @right
     * @group
     */
    'no-extra-semi': 'error',

    /**
     * @meaning
     * 声明函数禁止重新赋值
     * @why
     * 函数声明会悬置，作用域很大，如果改变了赋值（一般都是意外输入），会造成错误
     * @wrong
     * @right
     * @group
     * 函数
     */
    'no-func-assign': 'error',

    /**
     * @meaning
     * 禁止在嵌套块中定义函数
     * @why
     * 在es6中增加了块作用域，在严格模式下，禁止在块作用域中定义函数声明
     * 在非严格模式下，在块作用域中的函数声明会悬置到块作用域，表现和普通的函数声明悬置一样
     * 也会悬置到函数作用域，表现和var悬置一样，因此，在嵌套块中定义会出现意外错误
     * function test() {
     *   // undefined
     *   console.log(aa);
     *   {
     *    // [Function: aa]
     *     console.log(aa);
     *     function aa() {}
     *   }
     * }
     * test();
     * @wrong
     * if (1) {
     *  function aa() {}
     * }
     * @right
     * @group
     * 函数
     */
    'no-inner-declarations': 'error',

    /**
     * @meaning
     * 禁止在正则中出现非法字符
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-invalid-regexp': 'error',

    /**
     * @meaning
     * 禁止在代码中出现非规范空格字符串
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-irregular-whitespace': 'error',

    /**
     * @meaning
     * 禁止将全局对象属性调用为函数
     * @why
     * Math,JSON,Reflect对象不能作为函数调用（没有[[Call]]属性）
     * @wrong
     * var math = Math();
     * var json = JSON();
     * var reflect = Reflect();
     * @right
     * @group
     */
    'no-obj-calls': 'error',

    /**
     * @meaning
     * 禁止通过自定义对象调用Object的原生方法
     * @why
     * 1. 自定义对象的prototype属性可能为空导致访问错误：const obj = Object.create(null)
     * 2. 自定义对象的prototype属性可能被覆盖：const obj = Object.create({hasOwnProperty: 1})导致调用错误
     * @wrong
     * foo.hasOwnProperty(1)
     * @right
     * Object.prototype.hasOwnProperty.call(foo, 'bar')
     * {}.hasOwnProperty.call(foo, 'bar')
     * const hasOwnProperty = Object.prototype.hasOwnProperty
     * @group
     * 对象
     */
    'no-prototype-builtins': 'error',

    /**
     * @meaning
     * 禁止在正则中出现多个空格
     * @why
     * 保持正则简单，可读
     * @wrong
     * /a   /
     * @right
     * /a {3}
     * @group
     * 正则
     */
    'no-regex-spaces': 'error',

    /**
     * @meaning
     * 禁止稀疏数组
     * @why
     * 不利于代码可读性
     * 多半是意外多写一个逗号造成
     * @wrong
     * [1,,3]
     * @right
     * [1,2,3]
     * @group
     */
    'no-sparse-arrays': 'error',

    /**
     * @meaning
     * 禁止在普通字符串中出现模板字符串中的占位符语法
     * @why
     * 防止写模板字符串时候使用了字符串的引号导致错误
     * @wrong
     * '${abc}'
     * @right
     * `${abc}`
     * @group
     */
    'no-template-curly-in-string': 'error',

    /**
     * @meaning
     * 禁止出现到达不了的语句
     * @why
     * 1. 有可能是书写错误
     * 2. 确实是没用的语句，删除减少冗余，增加可读性
     * @wrong
     * function fn() {
     *  x = 1;
     *  return x;
     *  x = 3
     * }
     * @right
     * @group
     */
    'no-unreachable': 'error',

    /**
     * @meaning
     * 禁止在finally语句中出现return/throw/break/continue语句
     * @why
     * try-catch-finally语法中，try和catch中的代码执行完后，即使执行的是
     * return/throw/break/continue这种控制语句，仍然回去执行finally
     * 这时候finally的控制语句会覆盖try-catch中的
     * @wrong
     * try {
     *   return 1
     * } catch (e) {
     *   return 2
     * } finally () {
     *   return 3
     * }
     * @right
     * @group
     * 最佳实践
     */
    'no-unsafe-finally': 'error',

    /**
     * @meaning
     * 不允许!操作符出现在in,instanceof的左边
     * @why
     * 防止书写错误，一般都是这样表达：if (!(key instanceof obj))
     * 有可能写着写着就忘了变成 if (!key instanceof obj)
     * @wrong
     * if (!key instanceof obj)
     * @right
     * if (!(key instanceof obj))
     * @group
     * 最佳实践
     */
    'no-unsafe-negation': 'error',

    /**
     * @meaning
     * 禁止对NaN进行直接比较
     * @why
     * 因为NaN是一个特殊的数字，他的特性是
     * (NaN !=== NaN) // true
     * (NaN === NaN) // false
     * 不能直接比较，使用Number.isNaN来判断
     * @wrong
     * foo == NaN
     * @right
     * Number.isNaN(foo)
     * @group
     * 数字
     */
    'use-isnan': 'error',

    /**
     * @meaning
     * 保证和typeof结果比较的是有效字符
     * @why
     * typeof 结果只能是 string,object,undefined,symbol,number,boolean,function之一
     * @wrong
     * typeof foo === 'null'
     * @right
     * @group
     */
    'valid-typeof': ['error', { requireStringLiterals: true }],

    /**
     * @meaning
     * 禁止重复else if语句，更多是错误写法
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-dupe-else-if': 'error',

    /**
     * @meaning
     * 检测可能失去精度的证书
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-loss-of-precision': 'error',

    /**
     * @meaning
     * 禁止给import的模块重新assign变量，这些是只读的
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-import-assign': 'error',

    /**
     * @meaning
     * 禁止在new Promise和setter内部函数return 具体的值。return 具体值一般是错误的
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-promise-executor-return': 'error',
    'no-setter-return': 'error',

    /**
     * @meaning
     * 如果循环内部的逻辑导致循环内部逻辑只执行一次，那么报错。
     * 应该使用if，else重构或检查是否有逻辑错误
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-unreachable-loop': 'error',

    /**
     * @meaning
     * 禁止不安全的?.操作符
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-unsafe-optional-chaining': 'error',

    
    /**
     * @meaning
     * 禁止正则中无效的分组捕获括号
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-useless-backreference': 'error',
  },
};
