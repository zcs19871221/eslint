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
  },
};
