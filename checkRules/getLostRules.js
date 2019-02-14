const getLostRules = async ({ offRules = [], usedRules, webRules }) => {
  return webRules.filter(
    rule => !usedRules.includes(rule) && !offRules.includes(rule),
  );
};
module.exports = getLostRules;
