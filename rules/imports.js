module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        // 如果省略了后缀，那么按照下面顺序自动添加后缀然后查找
        extensions: ['.js', '.mjs', '.jsx'],
      },
      alias: {
        extensions: ['.js', '.mjs', '.jsx'],
      },
    },
    // 解析器会把下面三种后缀进行模块化解析
    'import/extensions': ['.js', '.mjs', '.jsx'],
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  rules: {
    /**
     * @meaning
     * 如果从模块food中named导入pizza,那么food中必须定义named导出pizza
     * @why
     * @wrong
     * @right
     * @group
     * hide
     */
    'import/named': 'error',

    /**
     * @meaning
     * 如果从模块food中default导入,那么food中必须定义default导出
     * @why
     * @wrong
     * @right
     * @group
     * hide
     */
    'import/default': 'error',

    /**
     * @meaning
     * 保证`import * as all from 'module'`的索引`all`访问的属性都在module中有定义
     * @why
     * @wrong
     * @right
     * @group
     * hide
     */
    'import/namespace': 'error',

    /**
     * @meaning
     * 禁止出现重复的named或default导出
     * @why
     * @wrong
     * @right
     * @group
     * hide
     */
    'import/export': 'error',

    /**
     * @meaning
     * 如果模块有default和named导出,禁止导入时把default命名成和named冲突的变量.
     * @why
     * 可能导致
     * - 混淆：熟悉导入模块的人以为default导入的是命名变量
     * - 语法错误：本来想导入named模块,写错了变成导入default模块
     * @wrong
     * // foo.js
     * export default 'foo';
     * export const bar = 'baz';
     * // bar.js
     * import bar from './foo.js';
     * @right
     * // foo.js
     * export default 'foo';
     * export const bar = 'baz';
     * // bar.js
     * import bar from './foo.js';
     * @group
     * module
     */
    'import/no-named-as-default': 'error',

    /**
     * @meaning
     * 禁止default导出的属性设置成和named导出的名称重复
     * @why
     * 这样写法,大概率是语法写错了
     * 写的人就是想引入default和named模块
     * 但是因为不熟悉语法,以为可以通过default[named]获取named模块.
     * @wrong
     * // foo.js
     * export default foo;
     * export const bar = 'baz.js'
     * // bar.js
     * import foo from './foo.js
     * const bar = foo.bar;
     * @right
     * // foo.js
     * export default foo;
     * export const bar = 'baz.js'
     * // bar.js
     * import foo, {bar} from './foo.js
     * @group
     * module
     */
    'import/no-named-as-default-member': 'error',

    /**
     * @meaning
     * 禁止export let(var)声明的变量
     * @why
     * es的模块机制和commonJs的模块机制不同,
     * es的模块是编译时生成接口,实际用到接口时再实时获取值.因此`import interface from module`可以理解成生成一个内置对象,属性就是interface,关联到模块中定义的interface,具体值是什么等用到这个interface时候再动态去模块中取.这就导致,如果你在module中改变了interface的引用,之后所有别的模块使用interface的引用也都变了,所以禁止使用var或let.当然class或function也可以改变引用,但是eslint有规则禁止改变函数和类的索引所以没问题.
     * commonJs的模块是运行时候生成接口,当执行到`require('xx')`的时候,会去这个`xx`模块中执行,执行的时候直接执行值传递.因此commonJs原模块的索引改变,也不会影响引入该模块的模块.
     * @wrong
     * export let count = 2
     * @right
     * export const count = 2
     * @group
     * module
     */
    'import/no-mutable-exports': 'error',

    /**
     * @meaning
     * 不允许使用amd语法
     * @why
     * @wrong
     * @right
     * @group
     * hide
     */
    'import/no-amd': 'error',

    /**
     * @meaning
     * import语句之前不允许有其他语句
     * @why
     * import语句会悬置,先使用import变量后import语句可能导致未知错误.
     * @wrong
     * @right
     * @group
     * module
     */
    'import/first': 'error',

    /**
     * @meaning
     * 所有export语句在底部
     * @why
     * 增强可读性,减少读模块时间
     * @wrong
     * @right
     * @group
     * module
     */
    'import/exports-last': 'error',

    /**
     * @meaning
     * 不允许import一个模块多次
     * @why
     * 防止不同的开发者在一个文件中多次引入一个模块
     * @wrong
     * @right
     * @group
     * module
     */
    'import/no-duplicates': 'error',

    /**
     * @meaning
     * import`js,jsx,mjs`后缀的文件时路径不允许使用后缀
     * 非上面三种后缀文件import时候必须加后缀
     * @why
     * 对于常用后缀文件,减少冗余
     * 对于不常用文件,写清后缀
     * @wrong
     * // import a.js
     * import a from './a.js'
     * // import b.less
     * import b from '/b'
     * @right
     * // import a.js
     * import a from './a'
     * // import b.less
     * import b from '/b.less'
     * @group
     * module
     */
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      },
    ],

    /**
     * @meaning
     * import模块书写顺序按照node内置(fs,http) -> 第三方包(webpack) -> 内部模块(alias)
     * @why
     * @wrong
     * @right
     * import fs from 'fs';
     * import _ from 'lodash';
     * import foo from 'Src/foo';
     * @group
     * module
     */
    'import/order': [
      'error',
      { groups: [['builtin', 'external', 'internal']] },
    ],

    /**
     * @meaning
     * 引用模块必须能够解析到
     * 注意alias不支持，请在settings中设置alias插件
     * @why
     * @wrong
     * @right
     * @group
     */
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        caseSensitive: true,
      },
    ],

    /**
     * @meaning
     * 强制最后一个导入语句之后有一行空行
     * @why
     * 统一规范
     * @wrong
     * @right
     * @group
     * module
     */
    'import/newline-after-import': 'error',

    /**
     * @meaning
     * 如果一个模块只有一个导出,使用default导出
     * @why
     * 有人说,named导出`export {a,}`不是更好,
     * 如果我需要新增一个模块导出,直接在后面添加`export {a,b,c..}`不好吗？.
     * 对于小的项目来说,named导出可能会让你少敲几行代码.
     * 但是对于大项目,长期维护来说,export default鼓励的是把不同功能拆分成多个文件,
     * 单一职责原则：一个文件只做一件事.
     * 这有利于后续的维护和可读性.
     * 如果你要export别的模块,把它拆分成新的文件.
     * @wrong
     * export {oneModule}
     * @right
     * export default oneModule;
     * @group
     * module
     */
    'import/prefer-default-export': 'error',

    /**
     * @meaning
     * 导入地址禁止使用绝对地址
     * @why
     * 和环境耦合,不利于迁移和维护,使用相对地址
     * @wrong
     * import f from '/foo';
     * var f = require('/some/path');
     * @right
     * var foo = require('./foo');
     * import _ from 'lodash';
     * @group
     * module
     */
    'import/no-absolute-path': 'error',

    /**
     * @meaning
     * require语法的地址必须使用静态地址
     * @why
     * 1. 会阻止打包工具和语法检查工具的正常使用
     * 2. 不利于代码可读性
     * @wrong
     * require(name);
     * require(`../${name}`);
     * @right
     * require('../name');
     * @group
     * module
     */
    'import/no-dynamic-require': 'error',

    /**
     * @meaning
     * 禁止在模块引入时使用webpack loader语法
     * @why
     * @wrong
     * @right
     * @group
     * hide
     */
    'import/no-webpack-loader-syntax': 'error',

    /**
     * @meaning
     * 禁止把default import重命名
     * @why
     * @wrong
     * import { default as foo } from './foo.js';
     * @right
     * import foo from './foo.js';
     * @group
     * hide
     */
    'import/no-named-default': 'error',

    /**
     * @meaning
     * 禁止在模块中引用自己
     * @why
     * @wrong
     * // foo.js
     * import foo from './foo';
     * @right
     * @group
     * hide
     */
    'import/no-self-import': 'error',

    /**
     * @meaning
     * 禁止循环依赖
     * @why
     * 1. 造成紧耦合,不利于维护
     * 2. commonJs下,循环依赖会导致模块不正确加载
     * @wrong
     * // a.js
     * import b from './b.js'
     * // b.js
     * import a from './a.js'
     * @right
     * @group
     * module
     */
    'import/no-cycle': ['error', { maxDepth: Infinity }],

    /**
     * @meaning
     * 禁止在模块路径中出现无效的符号
     * @why
     * 增强代码可读性
     * @wrong
     * import "./../pages/about.js";
     * import "./pages//about"
     * @right
     * import "../pages/about.js";
     * import "./pages/about"
     */
    'import/no-useless-path-segments': 'error',

    /**
     * @meaning
     * 动态加载模块必须使用webpack magic comment的`webpackChunkName`来配置打包模块名称
     * @why
     * 1. 报错时候可以迅速定位错误文件
     * 2. 统一规范
     * @wrong
     * @right
     * @group
     * module
     */
    'import/dynamic-import-chunkname': [
      'error',
      {
        importFunctions: [],
        webpackChunknameFormat: '[a-zA-Z]+-\\[request\\]',
      },
    ],
  },
};
