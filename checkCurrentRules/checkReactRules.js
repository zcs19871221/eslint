const request = require("request");
const prettierOffRules = require("eslint-config-prettier/react");
const myReactRules = require("../rules/react");

const queryCurrentReactRules = () => {
  return new Promise((resolve, reject) => {
    request(
      "https://github.com/yannickcr/eslint-plugin-react",
      (error, res, body) => {
        if (error) {
          reject(error);
        }
        const allRules = {};
        body.replace(
          /<li>[\s\S]*?<a.*?>(react\/.*?)<\/a>[\s\S]*?<\/li>/g,
          (match, ruleName) => {
            if (!allRules[ruleName]) {
              allRules[ruleName] = true;
            }
          }
        );
        resolve(Object.keys(allRules));
      }
    );
  });
};

const getMyReactRules = () => {
  return Object.keys(myReactRules.rules);
};

const getToAddRules = async (ignoreRules = []) => {
  const currentRules = await queryCurrentReactRules();
  const myRules = getMyReactRules();
  return currentRules.filter(
    rule => !myRules.includes(rule) && !ignoreRules.includes(rule)
  );
};

const offRules = {
  "react/display-name": "必须设置display属性-不需要",
  "react/forbid-component-props": "禁止特定组件props-不需要",
  "react/forbid-dom-props": "禁止htmltag特定属性（比如id）-不需要",
  "react/forbid-elements": "禁止使用jsx元素-不需要",
  "react/no-did-mount-set-state": "didmount中禁止setState",
  "react/no-set-state": "完全禁止setState",
  // 新版本修复后考虑打开
  "react/prefer-stateless-function":
    "偏好使用函数组件-规则有bug，对PureComponent报错，修复后考虑打开",
  "react/require-optimization": "要求每个组件需要一个shouldComponentUpdate方法",
  "react/sort-prop-types": "要求propType按照字母顺序排序",
  "react/state-in-constructor":
    "要求必须用构造函数初始化state或者必须按照属性初始化的写法 - 按照需要来，有构造函数的，写构造函数里，不需要的，直接属性初始化",
  "react/jsx-max-depth": "强制要求jsx的嵌套成熟不能超过多少",
  "react/jsx-no-literals":
    'jsx的内容不允许直接使用字符串，必须这样<div>{"显示"}</div>',
  "react/jsx-sort-default-props": "强制要求defaultProps按照字母排序",
  "react/jsx-sort-props": "强制要求jsx中的属性按照字母排序"
};

const main = async () => {
  const toAddrules = await getToAddRules(
    Object.keys(offRules).concat(Object.keys(prettierOffRules.rules))
  );
  if (toAddrules.length === 0) {
    console.log("无需修改rules/react.js文件");
  } else {
    console.log("需要修改rules/react.js文件，新增了rules，查看下面新增规范：");
    console.log(toAddrules);
  }
};
main();
