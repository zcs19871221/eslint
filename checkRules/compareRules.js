const { printWarn } = require('./printWarn');

const getLostRules = require('./getLostRules');
const getDeprecateRules = require('./getDeprecateRules');

const main = async ({ webRules, offRules, usedRules, rulesPath }) => {
  try {
    const lostRules = await getLostRules({
      offRules,
      usedRules,
      webRules,
    });
    const deprecateRules = getDeprecateRules({
      usedRules,
      webRules,
    });
    printWarn(lostRules, deprecateRules, rulesPath);
  } catch (error) {
    console.error(error);
  }
};
module.exports = main;
