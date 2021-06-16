const typescript = require('../rules/typescript');
const queryTsDocRules = require('./queryTypescriptDocRules');
const compareRules = require('./compareRules');

const offRules = {
  '@typescript-eslint/ban-ts-comment':
    '禁止使用@ts-<directive> comments 用不着',
  '@typescript-eslint/ban-tslint-comment':
    '禁止使用// tslint:<rule-flag> 用不着',
  '@typescript-eslint/class-literal-property-style': 'getter setter相关 用不着',
  '@typescript-eslint/consistent-type-definitions': '强制要求用interface或type 用不着',
  '@typescript-eslint/no-confusing-non-null-assertion': '禁止在容易混淆的位置用! 假定存在运算符 用不着parser会报错',
  
  '@typescript-eslint/no-extra-non-null-assertion': '禁止使用重复的非空假定符!!! 用不着',
  '@typescript-eslint/no-extraneous-class': '禁止使用类作为命名范围 用不着',
  '@typescript-eslint/no-non-null-asserted-optional-chain': '用不着 这样写编译就不过',
  '@typescript-eslint/no-parameter-properties': '构造函数中直接readonly定义属性 不要关，更简洁',
  '@typescript-eslint/no-require-imports': '用import，不要用require 用不着',
  '@typescript-eslint/no-type-alias': '禁止用type 用不着',
  '@typescript-eslint/no-unnecessary-qualifier': 'namespace用不着',
  '@typescript-eslint/no-unnecessary-type-arguments': '默认类型重复 用不着',
  '@typescript-eslint/no-unsafe-argument': '用不着已经哪儿都不让用any了',
  '@typescript-eslint/no-unsafe-assignment': '用不着已经哪儿都不让用any了',
  '@typescript-eslint/no-unsafe-call': '用不着已经哪儿都不让用any了',
  '@typescript-eslint/no-unsafe-member-access': '用不着已经哪儿都不让用any了',
  '@typescript-eslint/no-unsafe-return': '用不着已经哪儿都不让用any了',
  '@typescript-eslint/non-nullable-type-assertion-style': '用非空表达式!而不是强制转换',
  '@typescript-eslint/prefer-function-type': '用不着',
  '@typescript-eslint/prefer-literal-enum-member': '用不着',
  '@typescript-eslint/prefer-namespace-keyword': '用不着',
  '@typescript-eslint/prefer-readonly-parameter-types': '用不着',
  '@typescript-eslint/typedef': '尽量不让ts自己猜类型 用不着',
  '@typescript-eslint/unified-signatures': '用不着',
  '@typescript-eslint/no-magic-numbers': '用不着',
};
const check = async function checkJavaScriptRules() {
  const webRules = await queryTsDocRules();
  const usedRules = Object.keys(typescript.rules).filter(
    (k) => typescript.rules[k] !== 'off',
  );
  compareRules({
    webRules,
    offRules: Object.keys(offRules),
    usedRules,
    rulesPath: '/rules/typescript',
  });
};

module.exports = check;
