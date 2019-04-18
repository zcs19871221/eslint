const inquirer = require('inquirer');

let index = 0;
/* eslint-disable */
const ask = async config => {
  if (!config.name) {
    config.name = `inquirer_${index++}`;
  }
  const answer = await inquirer.prompt(config);

  const result = answer[config.name];
  if (typeof config.dataTransform === 'function') {
    return config.dataTransform(result);
  }
  return result;
};
module.exports = ask;
