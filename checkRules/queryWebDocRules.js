const request = require('request');

const queryWebRules = (docUrl, ruleReg) => {
  return new Promise((resolve, reject) => {
    request(docUrl, (error, res, body) => {
      if (error) {
        reject(error);
      }
      const allRules = {};
      body.replace(ruleReg, (match, ruleName) => {
        if (!allRules[ruleName]) {
          allRules[ruleName] = true;
        }
      });
      resolve(Object.keys(allRules));
    });
  });
};
module.exports = queryWebRules;
