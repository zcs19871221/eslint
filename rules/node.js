module.exports = {
  plugins: ['node'],
  rules: {
    /**
     * @meaning
     * 要求所有require语句在文件开始位置,
     * @why
     * 当require在代码段中, 很难发现依赖关系
     * @wrong
     * @right
     * @group
     */
    'node/global-require': 'error',

    'node/no-path-concat': 'error',
    'node/no-unsupported-features/node-builtins': 'error',
    'node/shebang': 'error',
    'node/no-deprecated-api': 'error',
    'node/no-deprecated-api': 'error',

    /**
     * @meaning
     * 禁止使用process.exit
     * @why
     * 这个exit可以在任何位置调用，是很危险的，有可能有未处理的资源或事务没处理就直接退出了
     * 正确做法是抛出错误，然后别的程序（可能最外层）可以正确处理错误。统一在一个位置处理错误。如果想让程序崩溃，直接在最外层throw error就好
     * @wrong
     * @right
     * @group
     */
    'node/no-process-exit': 'error',
    /**
     * @meaning
     * 禁止使用process.env
     * @why
     * 全局变量可能被人改而不知道，使用统一的配置更好
     * @wrong
     * if(process.env.NODE_ENV === "development") {
     *   //...
     * }
     * @right
     * var config = require("./config");
     * if(config.env === "development") {
     *   //...
     * }
     * @group
     */
    'node/no-process-env': 'error',

    /**
     * @meaning
     * 禁止使用new在require前头
     * @why
     * @wrong
     * @right
     * @group
     */
    'node/no-new-require': 'error',

    /**
     * @meaning
     * 回调必须使用return
     * @why
     * 防止意外的多次执行callback函数
     */
    'node/callback-return': 'error',

    /**
     * @meaning
     * 回调的错误必须处理
     * @why
     */
    'node/handle-callback-err': ['error', '^.*(e|E)rr'],

    /**
     * @meaning
     * require语句必须按照core,module,file的顺序引入
     * @why
     * 增加可读性
     */
    'node/no-mixed-requires': ['error', { grouping: true, allowCall: false }],

    /**
     * @meaning
     * 强制使用全局Buffer,console,process
     * 强制使用promisfy的dns和fs api
     * 强制不让用sync api
     * @why
     * 增加可读性
     */
    'node/prefer-global/buffer': 'error',
    'node/prefer-global/console': 'error',
    'node/prefer-global/process': 'error',
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'node/no-sync': 'off',

    /**
     * @meaning
     * 强制使用全局TextDecoder 
     * @why
     * 增加可读性
     */
    'node/prefer-global/text-decoder': 'error',

    /**
     * @meaning
     * 强制使用全局TextEncoder
     * @why
     * 增加可读性
     */
    'node/prefer-global/text-encoder': 'error',
    
    /**
     * @meaning
     * 强制使用全局URLSearchParams
     * @why
     * 增加可读性
     */
    'node/prefer-global/url-search-params': 'error',

    /**
     * @meaning
     * 强制使用全局URL
     * @why
     * 增加可读性
     */
    'node/prefer-global/url': 'error',
  },
  env: {
    node: true,
  },
};
