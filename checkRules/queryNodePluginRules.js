const request = require('request');

const queryWebRules = () => {
  return new Promise((resolve, reject) => {
    request('https://github.com/mysticatea/eslint-plugin-node', (error, res, body) => {
      if (error) {
        reject(error);
      }
      const allRules = {};
      body.replace(
        /<h3[^>]*>(.*?)<\/h3>([\s\S]+?)(<\/table>)/gu,
        (match, id, ruleScope) => {
          if (!id.toLowerCase().includes('deprecated')) {
            ruleScope.replace(/<a.*?>(.*?)<\/a>/gu, (matched, rule) => {
              allRules[rule] = true;
            });
          }
        },
      );
      resolve(Object.keys(allRules));
    });
  });
};
queryWebRules()
module.exports = queryWebRules;
