module.exports = {
  env: {
    node: true,
  },

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
    'global-require': 'error',

    /**
     * @meaning
     * 禁止使用new Buffer()构造,使用Buffer.alloc或Buffer.from
     * @why
     * Buffer构造函数已弃用,存在安全性问题
     * @wrong
     * @right
     * @group
     */
    'no-buffer-constructor': 'error',

    /**
     * @meaning
     * 禁止使用new在require前头
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new-require': 'error',

    /**
     * @meaning
     * 禁止用字符串连接__dirname和__filename
     * 使用path.join创建地址
     * @why
     * 防止不同操作系统路径分割不一致
     * @wrong
     * @right
     * @group
     */
    'no-path-concat': 'error',

    /**
     * @meaning
     * 回调必须使用return
     * @why
     * 防止意外的多次执行callback函数
     */
    'callback-return': 'error',

    /**
     * @meaning
     * 回调的错误必须处理
     * @why
     */
    'handle-callback-err': ['error', '^(err|error)$'],

    /**
     * @meaning
     * require语句必须按照core,module,file的顺序引入
     * @why
     * 增加可读性
     */
    'no-mixed-requires': ['error', { grouping: true, allowCall: false }],
  },
};
