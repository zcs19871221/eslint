module.exports = {
  env: {
    browser: true,
  },
  plugins: ['compat'],
  rules: {
    /**
     * @meaning
     * 不支持你配置的browserslist浏览器功能会报错
     * @why
     * @wrong
     * @right
     * @group
     */
    'compat/compat': 'error',
  },
};
