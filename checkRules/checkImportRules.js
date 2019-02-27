const myRules = require('../rules/imports');
const compareRules = require('./compareRules');
const queryWebDocRules = require('./queryWebDocRules');

const offRules = {
  'import/no-extraneous-dependencies':
    '引用的模块不能在dev里 - 和脚手架ci冲突，关闭',
  'no-relative-parent-imports': '禁止引用父级模块(../) - 没太必要',
  'no-unresolved': '引用的模块必须能够访问到 - 不支持webpackalias',
  'no-restricted-paths':
    '限制哪些目录可以import(比如目录里包含客户端和服务端代码） - 目录无法统一',
  'no-internal-modules':
    '只允许按照某种正则导入模块(防止子系统之间耦合) - 太严格，目录无法统一',
  'no-deprecated': 'jsDoc的@deprecated标签模块不允许使用 - 不用jsDoc标签',
  'no-extraneous-dependencies':
    '不允许import在package.json中devDependencies，optionalDependencies，peerDependencies定义的模块 - 脚手架使用了devDependencies',
  unambiguous: '没看懂',
  'no-commonjs': '禁止使用commonJs模块语法',
  'no-nodejs-modules': '禁止使用nodejs内置模块',
  'no-namespace': '禁止在import语法中使用webpack alias 地址',
  'max-dependencies': '限制最大引用模块数量',
  'no-unassigned-import':
    '不允许获取模块不分配变量(import "should")为了防止模块副作用 - cssloader会报错',
  'no-default-export': '不允许默认导出',
  'no-named-export': '不允许命名默认导出',
  'no-anonymous-default-export': '不允许匿名默认导出:export deafult []',
  'group-exports':
    '不能出现多个export，使用export {}聚合成一组 - export const更方便',
};

module.exports = async () => {
  const webRules = await queryWebDocRules(
    'https://github.com/benmosher/eslint-plugin-import',
    /<a.*?href=.*?\/rules\/([^.]*?).*?><code>\1<\/code>[\s\S]?<\/a>/g,
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
