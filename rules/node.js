module.exports = {
  env: {
    node: true,
  },

  rules: {
    // 要求所有require语句在文件开始位置,
    // 当require在代码段中,很难发现依赖关系
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'global-require': 'error',

    // 禁止使用new Buffer()构造,使用Buffer.alloc或Buffer.from
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-buffer-constructor': 'error',

    // todo
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-mixed-requires': 'error',

    // 禁止使用new在require前头
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-new-require': 'error',

    // 禁止用字符串连接__dirname和__filename,
    // 使用path.join创建地址
    /**
     * @meaning
     * @why
     * @wrong
     * @right
     * @group
     */
    'no-path-concat': 'error',
  },
};
