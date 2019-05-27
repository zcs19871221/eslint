const myRules = require('../rules/imports');
const compareRules = require('./compareRules');
const queryWebDocRules = require('./queryWebDocRules');

const offRules = {
  'no-relative-parent-imports': '禁止引用父级模块(../) - 没太必要',
  'no-restricted-paths':
    '限制哪些目录可以import(比如目录里包含客户端和服务端代码） - 目录无法统一',
  'no-internal-modules':
    '只允许按照某种正则导入模块(防止子系统之间耦合) - 太严格，目录无法统一',
  'no-deprecated': 'jsDoc的@deprecated标签模块不允许使用 - 不用jsDoc标签',
  unambiguous: '没看懂',
  'no-commonjs': '禁止使用commonJs模块语法',
  'no-nodejs-modules': '禁止使用nodejs内置模块',
  'no-namespace': '禁止在import语法中使用webpack alias 地址',
  'max-dependencies': '限制最大引用模块数量',
  'no-default-export': '不允许默认导出',
  'no-named-export': '不允许命名默认导出',
  'no-anonymous-default-export': '不允许匿名默认导出:export deafult []',
  'group-exports':
    '不能出现多个export，使用export {}聚合成一组 - export const更方便',
};

module.exports = async () => {
  const webRules = await queryWebDocRules(
    'https://github.com/benmosher/eslint-plugin-import',
    /<a.*?href=.*?\/rules\/([^.]*?).*?><code>\1<\/code>[\s\S]?<\/a>/gu,
  );
  compareRules({
    webRules,
    usedRules: Object.keys(myRules.rules).map(name =>
      name.replace('import/', ''),
    ),
    offRules: Object.keys(offRules),
    rulesPath: '/rules/import',
  });
};
