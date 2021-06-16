module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    /* 将重载的签名group到一起 
      type Foo = {
        foo(s: string): void;
        foo(n: number): void;
        bar(): void;
        foo(sn: string | number): void;
      };
      class Foo {
        foo(s: string): void;
        foo(n: number): void;
        bar(): void {}
        foo(sn: string | number): void {}
      }
      =>
      type Foo = {
        foo(s: string): void;
        foo(n: number): void;
        foo(sn: string | number): void;
        bar(): void;
      };
      class Foo {
        foo(s: string): void;
        foo(n: number): void;
        foo(sn: string | number): void {}
        bar(): void {}
      }
    */
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    // 数组类型签名统一成T[]，禁止Array<T>
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
    // 禁止对一般函数执行
    // const fn = () => {};
    // await fn(); throw error
    // 一般这种是程序错误
    '@typescript-eslint/await-thenable': 'warn',
    // 禁止某些特定的类型命名，默认是这样：
    // 1. 禁止大写String，Boolean等原始类型
    // 2. 禁止Function类型，因为没有类型检查，而且接受类声明，这样在没有new关键词时候会错误
    // 3. 禁止Object和{}类型，因为他们意味着任意对象类型。
    // 如果想要空对象类型，如下定义：
    // type EmptyObject = Record<string, never>; // or {[k: string]: never}
    '@typescript-eslint/ban-types': 'error',
    // 下面这两种类型是等价的，因此强制使用Record，更简洁
    // type Foo = {
    //   [key: string]: unknown;
    // };
    // type Foo = Record<string, unknown>;
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    /*     1. 强制使用as作为类型推断语法（<>语法有可能会和React语法冲突而且和类型混淆）
    2. 禁止使用 const x = { ... } as T 这样的强制语法
    建议使用 const x = {name:'zcs'} as const;
    这样x的属性也无法随意进行拓展 */
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    // 强制函数必须有返回类型
    '@typescript-eslint/explicit-function-return-type': 'error',
    // 强制类定义必须有修饰符（即使是pulic）
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // 强制导出的函数必须有返回类型
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    // 强制导出的函数必须有返回类型
    '@typescript-eslint/member-delimiter-style': 'error',
    // 强制类，接口分组（按照修饰符和位置）
    '@typescript-eslint/member-ordering': 'error',
    // 接口的函数类型使用如下写法
    // interface T1 {
    //   func: (arg: string) => number;
    // }
    '@typescript-eslint/method-signature-style': 'error',
    // 骆驼
    '@typescript-eslint/naming-convention': 'warn',
    // 禁止对对象直接进行string的转换，除非对象已经定义了toString方法
    // 下面两种都会保存，因为没有显示定义toString方法，这样类型转换后就会显示
    // [object Object]没有意义
    // '' + {};
    // class MyClass {}
    // const value = new MyClass();
    // `Value: ${value}`;
    '@typescript-eslint/no-base-to-string': 'error',

    // 禁止有未处理的reject
    '@typescript-eslint/no-floating-promises': 'error',

    // 当函数返回值是void的话，禁止类似这种混淆的return
    // return console.log('sdffsdf')
    // 改成：console.log('sdffds'); return;
    '@typescript-eslint/no-confusing-void-expression': 'error',
    // 禁止动态delete对象的属性
    '@typescript-eslint/no-dynamic-delete': 'error',
    // 禁止定义空接口 interface Foo{}
    '@typescript-eslint/no-empty-interface': 'error',
    // 禁止用any
    '@typescript-eslint/no-explicit-any': 'error',
    // 禁止用重复非空断言 foo!!!
    // '@typescript-eslint/no-extra-non-null-assertion': 'error',
    // 禁止for in 用在数组上
    '@typescript-eslint/no-for-in-array': 'error',
    // catch到的error使用unknown类型来保证安全性
    '@typescript-eslint/no-implicit-any-catch': 'error',
    // 显而易见的推断类型不要手动加类型
    '@typescript-eslint/no-inferrable-types': 'error',
    // 禁止在return和泛型外使用void
    '@typescript-eslint/no-invalid-void-type': 'error',
    // 禁止错误使用new操作符
    '@typescript-eslint/no-misused-new': 'error',
    // 禁止错误使用promise操作符
    // 比如这些错误：把promise作为判断条件，在forEach中使用async方法，在promise中使用async等等
    '@typescript-eslint/no-misused-promises': 'error',
    // 禁止使用module foo{}或namespce foo{}这种命名范围语法，这些语法过时了，使用export/import语法
    '@typescript-eslint/no-namespace': 'error',
    // 禁止使用非空断言
    '@typescript-eslint/no-non-null-assertion': 'error',
    // 禁止给this别名，比如const that = this;
    // 使用箭头函数
    '@typescript-eslint/no-this-alias': 'error',
    // 禁止不必要的对boolean类型的条件判断，比如const flag:boolean = true; if (flag === true)
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    // 禁止不正确的条件判断，比如：
    // items: T[] if (items)
    '@typescript-eslint/no-unnecessary-condition': 'error',
    // 禁止不必要的类型断言
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    // 禁止不必要的泛型extend
    // 比如：
    // interface FooAny<T extends any> {}
    // interface FooUnknown<T extends unknown> {}
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    // 禁止使用const a = require('b')
    // 使用 import a = require('b')替换
    '@typescript-eslint/no-var-requires': 'error',
    // 使用as const来约束const
    '@typescript-eslint/prefer-as-const': 'error',
    // 使用enum时候必须初始化
    // 因为enum默认值都是从0开始算的，有可能这样：
    // 本来Open映射0
    // enum Status {
    //   Open, // infer 0
    //   Closed, // infer 1
    // }
    // 后来Open映射1，如果数据还在别的地方用，可能造成数据不一致
    // enum Status {
    //   Pending, // infer 0
    //   Open, // infer 1
    //   Closed, // infer 2
    // }
    // 这样：
    // enum Status {
    //   Open = 'Open',
    //   Close = 'Close',
    // }
    '@typescript-eslint/prefer-enum-initializers': 'error',
    // 使用for of遍历数组
    '@typescript-eslint/prefer-for-of': 'error',
    // 使用includes而不是indexOf来判断
    '@typescript-eslint/prefer-includes': 'error',
    // 使用??操作符来进行非空的话赋值操作
    // const x = y ?? 'sdffsd';等价于：
    // const x = (y !== null && y !== undefined) ? y : 'sdffsd';
    // const x = y || 'sdffsd';有可能不符合预期，当y是0或空字符串时候
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    // 使用optional 操作符，比如：
    // inteface Foo {
    //   bar?: {
    //     name:string
    //   }
    // }
    // foo.bar?.name
    // 和nullish操作符结合：
    // const animationDuration = response.settings?.animationDuration ?? 300;
    '@typescript-eslint/prefer-optional-chain': 'error',
    // 如果私有成员没改变过，强制使用readonly
    '@typescript-eslint/prefer-readonly': 'error',
    // Array.reduce必须提供初始化泛型
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    // 当没有g的正则，使用RegExp.exec而不用String.match
    // 为了统一，而且exec也要稍快一些？
    '@typescript-eslint/prefer-regexp-exec': 'error',
    // 使用startWith和endsWith替代indexOf判断
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    // 使用@ts-expect-error来暂时性跳过ts检查，通常用于单元测试
    // 比如你写一个库，calCulate(string,string)但是要面对js用户，所以要有runtime类型检查，
    // 但是你的测试是ts写的,但是又想测试诸如：calCulate(1,2)这种不符合tscompile但是需要实时检查的语法
    // 这样写
    // @tes-expect-error
    // calCulate(1,2)
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    // 返回promise的函数强制必须加上async 标志。
    // 考虑如下例子，函数pj返回一个promise，但是pj其实隐藏着throw error的可能，
    // 所以实际上pj有可能有两种错误要处理：
    // 1. throw error 2. reject error
    // 这样调用pj的非async函数必须用try catch和.catch处理错误两次
    // const main = ():void => {
    //   try {
    //     Promise.resolve(pj()).then(v => {
    //       console.log(v);
    //     }).catch(error => {
    //       // 相同处理
    //       console.error(error)
    //     })
    //   } catch (error:unknown) {
    //     // 相同处理
    //     console.error(error);
    //   }
    // };
    // function pj():Promise<unknown> {
    //   throw new Error('throw error');
    //   return new Promise((reject) => {
    //     reject(new Error('reject error'));
    //   });
    // }
    // main();
    // 因此将pj改成async函数，只需处理一个.catch即可
    // const main = ():void => {
    //     Promise.resolve(pj()).then(v => {
    //       console.log(v);
    //     }).catch(e => {
    //       console.error(e);
    //     });
    // };
    // async function pj():Promise<boolean> {
    //   // throw new Error('fucked');
    //   return new Promise((resolve, reject) => {
    //     reject(new Error('fucked two'));
    //   });
    // }
    // main();
    '@typescript-eslint/promise-function-async': 'error',
    // js sort强制需要传入比较函数，因为默认的sort方法是把每个元素
    // 转换成字符串再进行字母比较，这样如果传入[1,2,10]的话，sort后
    // 变成[1,10,2]，为了防止出现和自己期望不一致的结果，请传入compareFunction
    '@typescript-eslint/require-array-sort-compare': 'error',
    // +符号的两边类型必须一致防止出现意外的错误
    '@typescript-eslint/restrict-plus-operands': 'error',
    // 禁止在模板运算符中出现非字符串变量（防止意外的自动类型转换）
    '@typescript-eslint/restrict-template-expressions': 'error',
    //union type必须按照字母排序：1. 可以保持代码一致性 2. 找出重复的部分  3. 防止diff时候出现遗漏
    '@typescript-eslint/sort-type-union-intersection-members': 'error',
    //条件判断（if,三元，for，while，do-while，&&，||）中的表达式变量，如果包含null(undefined)和其他的类型，比如
    // type X = null|number type Y = undefined|string;禁止直接使用，必须判断变量类型然后再做处理，因为number为0或string为''的话，
    // 条件判断会为false，有可能和期望的不一致。
    '@typescript-eslint/strict-boolean-expressions': 'error',
    // switch 目标如果是union类型，需要覆盖所有类型或提供一个default语句
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    // 禁止使用三反斜杠语法，用import/// <reference path="foo" />
    '@typescript-eslint/triple-slash-reference': 'error',
    // 统一冒号前空格距离
    '@typescript-eslint/type-annotation-spacing': 'error',
    // 禁止把对象的方法拿出来单独使用，有可能导致错误this
    // 或者直接使用对象调用，或者用箭头函数定义或者用bind方法
    '@typescript-eslint/unbound-method': 'error',

    // 强制要求import type时候这样写
    // import type { Foo } from 'Foo
    // import type Bar from 'Foo
    '@typescript-eslint/consistent-type-imports': 'error',

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error'],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error'],
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': ['error'],
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['error'],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': ['error'],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error'],
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['error'],
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': ['error'],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['error'],
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['error'],
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': ['error'],
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['error'],
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': ['error'],
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': ['error'],
    // 'no-magic-numbers': 'off',
    // '@typescript-eslint/no-magic-numbers': ['error'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': ['error'],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'require-await': 'off',
    '@typescript-eslint/require-await': ['error'],
    'return-await': 'off',
    '@typescript-eslint/return-await': ['error'],
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error'],
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': ['error'],
  },
};
