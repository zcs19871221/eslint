module.exports = {
  rules: {
    // 强制要求循环方向正确
    "for-direction": "error",

    // 强制在getter函数中使用return
    "getter-return": ["error", { allowImplicit: true }],

    // Disallow await inside of loops
    // https://eslint.org/docs/rules/no-await-in-loop
    // 'no-await-in-loop': 'error',

    // 禁止与-0比较
    "no-compare-neg-zero": "error",

    // 禁止在条件语句中赋值
    "no-cond-assign": ["error", "always"],

    // 禁止使用console
    // 定义自己的全局console
    "no-console": "warn",

    // 条件判断中禁止使用常量
    "no-constant-condition": "warn",

    // 禁止正则中的控制字符
    "no-control-regex": "error",

    // 禁止使用debugger
    "no-debugger": "error",

    // 函数参数中禁止出现重复名称
    "no-dupe-args": "error",

    // 对象中禁止出现重复属性
    "no-dupe-keys": "error",

    // switch语句中禁止出现同样条件的case块
    "no-duplicate-case": "error",

    // 禁止出现空块语句
    "no-empty": "error",

    // 禁止在正则的[]中出现空
    "no-empty-character-class": "error",

    // 禁止在catch语句中赋值
    "no-ex-assign": "error",

    // 禁止不必要的强制布尔转换
    "no-extra-boolean-cast": "error",

    // 禁止出现不必要的分号
    "no-extra-semi": "error",

    // 声明function禁止重新赋值
    "no-func-assign": "error",

    // 禁止在嵌套块中定义函数
    "no-inner-declarations": "error",

    // 禁止在正则中出现非法字符
    "no-invalid-regexp": "error",

    // 禁止非规范空格字符串
    "no-irregular-whitespace": "error",

    // 禁止将全局对象属性调用为函数
    "no-obj-calls": "error",

    // 不允许直接使用对象的内置原型对象方法
    // 在某个模块中统一引出
    "no-prototype-builtins": "error",

    // 禁止在字符串中出现多个空格
    // bad: /a    /
    // good: /a {3}/
    "no-regex-spaces": "error",

    // 禁止稀疏数组([1,,2])
    "no-sparse-arrays": "error",

    // 禁止在普通字符串中出现模板字符串中的占位符语法${}
    "no-template-curly-in-string": "error",

    // Avoid code that looks like two expressions but is actually one
    // https://eslint.org/docs/rules/no-unexpected-multiline
    "no-unexpected-multiline": "error",

    // 禁止出现到达不了的语句
    "no-unreachable": "error",

    // disallow return/throw/break/continue inside finally blocks
    // 禁止在finally语句中出现return/throw/break/continue语句，
    // 因为finally中的控制语句会覆盖catch中的语句
    "no-unsafe-finally": "error",

    // 不允许!操作符出现在in,instanceof的左边，容易敲错造成意外的逻辑
    // bad:!key in object
    // good:!(key in object)
    "no-unsafe-negation": "error",

    // 禁止对NaN进行比较，使用Number.isNaN
    "use-isnan": "error",

    // 保证typeof和有效的字符串进行比较
    // typeof的结果只能是
    // string,object,undefined,symbol,number,boolean,function
    // 之一
    "valid-typeof": ["error", { requireStringLiterals: true }]
  }
};
