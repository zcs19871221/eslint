const request = require('request');

const queryWebRules = () => {
  return new Promise((resolve, reject) => {
    request('https://eslint.org/docs/rules/', (error, res, body) => {
      if (error) {
        reject(error);
      }
      const allRules = {};
      body.replace(
        /<h2[^>]*>(.*?)<\/h2>([\s\S]+?)(<\/table>)/g,
        (match, id, ruleScope) => {
          if (!['deprecated', 'removed'].includes(id.toLowerCase())) {
            ruleScope.replace(/<a.*?>(.*?)<\/a>/g, (matched, rule) => {
              allRules[rule] = true;
            });
          }
        },
      );
      resolve(Object.keys(allRules));
    });
  });
};
module.exports = queryWebRules;
