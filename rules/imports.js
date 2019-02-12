module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".mjs", ".js", ".json"]
      }
    },
    "import/extensions": [".js", ".mjs", ".jsx"],
    "import/core-modules": [],
    "import/ignore": ["node_modules", "\\.(coffee|scss|css|less|hbs|svg|json)$"]
  },

  // 详细规则请使用这个地址查看
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/${named}.md
  // 替换地址使用import/{}括号中的
  rules: {
    // 保证named导入的模块包含导入的命名
    "import/named": "error",

    // 保证default导入的模块包含default export
    "import/default": "error",

    // 保证import * as names from 'module'这种格式
    // 的names.variable中的variable在'module'中有定义
    "import/namespace": "error",

    // 重复的named或default导出报错
    "import/export": "error",

    // 不允许default导入的名称和named export中名称冲突
    // a.js: export default 'foo'; export const bar = 'bar'
    // b.js: import bar from './a.js'
    // b的语法是导入了一个default命名空间，但是这个名字
    // 是和a的named命名bar一样，很容易混淆到底你是想使用{bar} from './a.js'
    // 引入bar还是单纯的写重了
    "import/no-named-as-default": "error",

    // import的default变量，获取这个变量的属性名称不允许和import的named变量崇明
    // a.js: export default 'foo'; export const bar = 'bar';
    // b.js: import foo from './a.js';
    // 错误: const {bar} = foo; const bar = foo.bar;
    // 这种语法很容易混淆，写的人是不是想要这样： import {bar} from './a.js'
    // 还是导出中单纯有一个bar属性。不要这样写。
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    "import/no-named-as-default-member": "error",

    // 禁止import package.json中dev依赖的包
    // 关闭，因为脚手架中打包相关的依赖我都放到dev中
    // 这样和实际开发区别开
    "import/no-extraneous-dependencies": "off",

    // 禁止export可突变变量
    // 禁止export var|let
    "import/no-mutable-exports": "error",

    // 不允许使用amd语法
    "import/no-amd": "error",

    // Style guide:

    // import语句之前不允许有其他语句
    "import/first": "error",

    // 要求所有export在底部
    "import/exports-last": "error",

    // 不允许有重复import
    "import/no-duplicates": "error",

    // js,jsx,mjs后缀的文件import时候不允许使用后缀
    // 其他后缀文件import时候必须使用后缀
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never"
      }
    ],

    // 要求引入模块顺序，官方建议按照
    // 内置(fs,http) -> 第三方包(webpack) -> 内部模块(alias模块) -> 父级(../) -> 兄弟(./xx) -> index(./)
    // 现在只是要求了前三个顺序
    "import/order": [
      "error",
      { groups: [["builtin", "external", "internal"]] }
    ],

    // import后面必须有一行空行
    "import/newline-after-import": "error",

    // 如果只export一个变量，使用default
    "import/prefer-default-export": "error",

    // 禁止导入时候使用绝对地址
    // 绑定环境，迁移出问题
    "import/no-absolute-path": "error",

    // nodeJs的require禁止使用表达式动态生成地址
    // 难以分析问题以及找到代码位置
    "import/no-dynamic-require": "error",

    // 禁止使用webpack loader参数语法在模块里
    "import/no-webpack-loader-syntax": "error",

    // Prevent importing the default as if it were named
    // 禁止把default导入重命名为其他名称
    // 错误：import {default as foo} from 'modules'
    "import/no-named-default": "error",

    // 禁止在模块中引用自己
    "import/no-self-import": "error",

    // 禁止循环依赖
    // a.js import b from 'b.js'
    // b.js import a from 'a.js'
    // 理论上，es6是支持循环引入的，但是为了可读性，以及移植到commonJs的话，
    // 不要有循环引用
    "import/no-cycle": ["error", { maxDepth: Infinity }],

    // 禁止路径中出现无效符号
    // 比如: './../' './/abc'
    "import/no-useless-path-segments": "error",

    // 动态加载模块强制要求通过webpack magic comment来配置
    // 动态模块名称，增加可读性
    "import/dynamic-import-chunkname": [
      "error",
      {
        importFunctions: [],
        webpackChunknameFormat: "[0-9a-zA-Z-_/.]+"
      }
    ],

    // Use this rule to prevent imports to folders in relative parent paths.
    // https://github.com/benmosher/eslint-plugin-import/blob/c34f14f67f077acd5a61b3da9c0b0de298d20059/docs/rules/no-relative-parent-imports.md
    "import/no-relative-parent-imports": "off"
  }
};
