const inquirer = require('inquirer');

/* eslint-disable no-plusplus,no-param-reassign */
const uniqName = (() => {
  let id = 0;
  return () => `$inquirer_name_${id++}`;
})();

const ask = async config => {
  if (typeof config !== 'object') {
    throw new Error('参数必须是对象');
  }
  if (!config.name) {
    config.name = uniqName();
  }
  const answer = await inquirer.prompt(config);
  const result = answer[config.name];
  if (typeof config.dataTransform === 'function') {
    return config.dataTransform(result);
  }
  return result;
};
module.exports = ask;
