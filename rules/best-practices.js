module.exports = {
  rules: {
    // 数组回调必须有return语句 allowImplicit：可以return后面不包含值（return undefined）
    "array-callback-return": ["error", { allowImplicit: true }],

    // 类的方法必须使用this，待商榷
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: []
      }
    ],

    // 函数如果有return语句，需要在每个可能执行路径都包含return。 要不就不要return
    "consistent-return": "error",

    // switch语句强制要求default块，除非你在块中使用注释no default
    "default-case": ["error", { commentPattern: "^no default$" }],

    // 对象的静态标准属性，必须使用.访问。（有些-连接的，得用括号包裹）
    "dot-notation": ["error", { allowKeywords: true }],

    // 强制使用 === 和 !== 比较
    eqeqeq: ["error", "always"],

    // 不允许使用alert
    "no-alert": "warn",

    // 不允许使用arguments.caller or arguments.callee
    "no-caller": "error",

    // 不允许在switch语句中直接使用变量声明语句(var,const,let)，如果用的话，
    // 每个case请用{}括起来。为了防止定义的变量互相污染，因为整个switch共享一个
    // 作用域
    "no-case-declarations": "error",

    // 不允许空函数
    "no-empty-function": "error",

    // 不允许解构出现空的解构对象
    "no-empty-pattern": "error",

    // 不允许使用eval
    "no-eval": "error",

    // 不允许拓展原生方法
    "no-extend-native": "error",

    // 不允许执行无效的bind。（比如bind出的函数没有用this或bind箭头函数）
    "no-extra-bind": "error",

    // 不允许switch语句中的case后面缺失break（因为缺失break，case顺着执行，导致执行了多个case代码段）
    "no-fallthrough": "error",

    // 小数点不允许缺少前头的0
    "no-floating-decimal": "error",

    // disallow reassignments of native objects or read-only globals
    // 不允许重新分配原生对象或只读全局对象的引用
    "no-global-assign": ["error", { exceptions: [] }],

    // 不允许隐式使用eval，比如settimeout第一个参数可以传字符串，解析成函数
    "no-implied-eval": "error",

    // 不允许使用 __iterator__ 属性,这个属性是SpiderMonkey拓展所使用的属性
    "no-iterator": "error",

    // 不允许在switch和循环中使用标签（我都不知道这个语法）
    "no-labels": "error",

    // 不允许出现无效的代码块{}
    "no-lone-blocks": "error",

    // 不允许在循环中创建函数
    "no-loop-func": "error",

    // 禁止使用多行字符串，字符串中使用转义换行符：\\n
    "no-multi-str": "error",

    // 禁止直接在语法中出现非赋值的new运算符：(const a = new Person()可以，不能直接new Person())
    // 一般new的对象都要返回，如果只new不返回使用，有可能是写错了，造成意外错误
    "no-new": "error",

    // 不允许使用new操作符创建函数(通过解析字符串创建函数，一般也就模板引擎这么干)
    "no-new-func": "error",

    // 禁止使用包装器对象创建string，number，boolean类型
    // 首先明确，stirng，number，boolean是原始类型，不是对象，但是他们为什么有
    // 类似'str'.toUppserCase()的方法呢，因为在读取值的时候，幕后使用包装器对象String('str')
    // 把它转换成对象以使用String类的全部方法，使用完成后，将丢弃包装器对象。
    // 那么用包装器对象有什么问题呢
    // 1. 使用包装器对象返回的是对象，不是原始类型
    // 1. const str = new String('str'); typeof str //'object'
    // 2. 使用包装器对象创建bool值，永远是true
    // 2. if (new Boolean(fasle)) { //执行}
    "no-new-wrappers": "error",

    // 禁止八进制形式的数字
    "no-octal": "error",

    // 禁止八进制字符串中的转义字符
    // var foo = 'Copyright \251';
    "no-octal-escape": "error",

    // 禁止重新分配，操作函数参数
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          // for reduce accumulators
          "acc",
          // for reduce accumulators
          "accumulator",
          // for e.returnvalue
          "e",
          // for Koa routing
          "ctx",
          // for Express requests
          "req",
          // for Express requests
          "request",
          // for Express responses
          "res",
          // for Express responses
          "response"
        ]
      }
    ],

    // 禁止使用__proto__属性，这个属性指向一个对象的原型对象
    "no-proto": "error",

    // 不允许重复声明一个变量
    "no-redeclare": "error",

    // 禁止使用特定对象的特定属性
    // 1. 禁止使用arguments.callee
    // 2. 禁止使用全局对象（global，self，window）的isFinite，(使用Number.isFinite，因为全局的isFinite会转换成数字后判断)
    // 3. 禁止使用全局对象（同上）的isNaN，(请使用Number.isNaN，因为全局的isFinite会转换成数字后判断)
    // 4. 禁止使用对象的__defineGetter__和__defineSetter__方法，使用Object.definePropery代替
    // 5. 禁止使用Math.pow。幂运算，使用**代替
    "no-restricted-properties": [
      "error",
      {
        object: "arguments",
        property: "callee",
        message: "arguments.callee is deprecated"
      },
      {
        object: "global",
        property: "isFinite",
        message: "Please use Number.isFinite instead"
      },
      {
        object: "self",
        property: "isFinite",
        message: "Please use Number.isFinite instead"
      },
      {
        object: "window",
        property: "isFinite",
        message: "Please use Number.isFinite instead"
      },
      {
        object: "global",
        property: "isNaN",
        message: "Please use Number.isNaN instead"
      },
      {
        object: "self",
        property: "isNaN",
        message: "Please use Number.isNaN instead"
      },
      {
        object: "window",
        property: "isNaN",
        message: "Please use Number.isNaN instead"
      },
      {
        property: "__defineGetter__",
        message: "Please use Object.defineProperty instead."
      },
      {
        property: "__defineSetter__",
        message: "Please use Object.defineProperty instead."
      },
      {
        object: "Math",
        property: "pow",
        message: "Use the exponentiation operator (**) instead."
      }
    ],

    // 在return语句中禁止执行赋值语法
    "no-return-assign": ["error", "always"],

    // 禁止在return中使用await语法
    "no-return-await": "error",

    // 禁止在url中使用JavaScript脚本。ex：location.href = "javascript:void(0)";
    // 安全性问题
    "no-script-url": "error",

    // 禁止自我分配
    "no-self-assign": [
      "error",
      {
        props: false
      }
    ],

    // 禁止自己和自己比较
    "no-self-compare": "error",

    // 禁止使用逗号运算符
    "no-sequences": "error",

    // throw只允许throw error对象
    "no-throw-literal": "error",

    // 禁止出现独立的表达式，包含短路、三目、模板字符（表达式结果没有赋值，有可能会修改变量，造成副作用）
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false
      }
    ],

    // 禁止无效的字符串连接('a' + 'b' => 'ab')
    "no-useless-concat": "error",

    // 禁止出现无效的转义符号（'a\b'）
    "no-useless-escape": "error",

    // 禁止出现return后面什么都不带（要不return具体值，要不别写return）
    "no-useless-return": "error",

    // 禁止使用void运算符
    "no-void": "error",

    // 禁止使用with语法
    "no-with": "error",

    // promise reject的必须使用error对象或自定义对象
    "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],

    // parseInt函数必须提供第二个参数-进制基数。
    // 因为parseInt会根据输入自动检测是属于哪个进制，这可能会造成
    // 和意图不符合的意外错误，比如：
    // var num = parseInt("071");      // 57
    // var num = parseInt("071", 10);  // 71
    radix: "error",

    // 要求条件判断语句中先出现变量，后出现常量
    // good：if (color === 'red')
    // bad：if ('red' === 'color')
    // 名字来源于星球大战中的尤达大师，说话
    // 喜欢这样反着来
    yoda: "error"
  }
};