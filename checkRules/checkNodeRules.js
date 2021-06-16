const node = require('../rules/node');
const queryNodePluginRules = require('./queryNodePluginRules');
const compareRules = require('./compareRules');

const offRules = {
  'node/no-callback-literal': '要求cb或特定函数名函数执行时候，第一个参数必须是null或undefined，和node回调一致 - 没必要',
  'node/no-exports-assign': '禁止给exports重新设置ref - 继承自recommend，已经有',
  'node/no-extraneous-import': '继承自recommend，已经有',
  'node/no-extraneous-require': '继承自recommend，已经有',
  'node/no-path-concat': '继承自recommend，已经有',
  'node/no-unpublished-bin': '继承自recommend，已经有',
  'node/no-unpublished-import': '继承自recommend，已经有',
  'node/no-unpublished-require': '继承自recommend，已经有',
  'node/no-unsupported-features/es-builtins': '继承自recommend，已经有',
  'node/no-unsupported-features/es-syntax': '继承继承自recommend，已经有自recommend，已经有',
  'node/no-unsupported-features/node-builtins': '',
  'node/process-exit-as-throw': '继承自recommend，已经有',
  'node/shebang': '继承自recommend，已经有',
  'node/no-deprecated-api': '继承自recommend，已经有',
  'node/exports-style': '强制用module.exports或exports - 没必要',
  'node/file-extension-in-import': '引用强制加上文件类型 - 没必要',
  'node/no-restricted-import': '强制不允许使用某个模块（比如不让用fs） - 暂时用不到',
  'node/no-restricted-require': '同上',
};
const check = async function checkJavaScriptRules() {
  const webRules = await queryNodePluginRules();
  const usedRules = Object.keys({
    ...node.rules,
  });
  const offedRules = Object.keys(offRules);
  compareRules({
    webRules,
    offRules: offedRules,
    usedRules,
    rulesPath: 'node',
  });
};

module.exports = check;
