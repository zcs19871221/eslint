const chalk = require('chalk');
const getLostRules = require('./getLostRules');
const queryCurrentReactRules = require('./queryWebDocRules');
const getDeprecateRules = require('./getDeprecateRules');

const main = async ({
  webDocUrl,
  webRulesReg,
  offRules,
  usedRules,
  rulesPath,
}) => {
  try {
    const webRules = await queryCurrentReactRules(webDocUrl, webRulesReg);
    const lostRules = await getLostRules({
      offRules,
      usedRules,
      webRules,
    });
    const deprecateRules = getDeprecateRules({
      usedRules,
      webRules,
    });
    const lostRulesNum = lostRules.length;
    const deprecateRulesNum = deprecateRules.length;
    if (lostRulesNum === 0 && deprecateRulesNum === 0) {
      console.log(chalk.green.bold(`${rulesPath}无需修改`));
    } else {
      console.log(chalk.red(`需要修改${rulesPath}文件`));
      if (deprecateRulesNum > 0) {
        console.log(chalk.red(`废弃了rules：`));
        console.log(chalk.yellow.bold(deprecateRules));
      }
      if (lostRulesNum > 0) {
        console.log(chalk.red(`新增了rules：`));
        console.log(chalk.yellow.bold(lostRules));
      }
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = main;
