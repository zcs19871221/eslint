const request = require('request');

const queryWebRules = () => {
  return new Promise((resolve, reject) => {
    request(
      'https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin',
      (error, res, body) => {
        if (error) {
          reject(error);
        }
        const allRules = {};
        body.replace(
          /<table>([\s\S]+?)(<\/table>)/gu,
          (match, ruleScope) => {
            ruleScope.replace(/<code>@typescript-eslint(.*?)<\/code>/gu, (matched, rule) => {
              allRules[`@typescript-eslint${rule}`] = true;
            });
          },
        );
        resolve(Object.keys(allRules));
      },
    );
  });
};
module.exports = queryWebRules;
