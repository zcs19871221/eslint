const getDeprecateRules = ({ usedRules, webRules }) =>
  usedRules.filter(rule => !webRules.includes(rule));
module.exports = getDeprecateRules;
