const path = require('path');
const createDoc = require('./createDoc');

const createEslintDoc = () => {
  const eslint = [
    {
      rulePath: 'best-practices',
      title: '最佳实践',
    },
    {
      rulePath: 'errors',
      title: '错误语法',
    },
    {
      rulePath: 'es6',
      title: 'es6语法',
    },
    {
      rulePath: 'node',
      title: 'node语法',
    },
    {
      rulePath: 'style',
      title: '代码样式',
    },
    {
      rulePath: 'variables',
      title: '变量',
    },
  ];
  eslint.forEach(config => {
    const { rulePath, title } = config;
    const realPath = path.join(__dirname, '../rules', `${rulePath}.js`);
    const baseName = path.basename(realPath);
    const outPutPath = path.join(
      __dirname,
      `../doc/${baseName.replace('.js', '.md')}`,
    );
    createDoc({
      rulePath: realPath,
      title,
      outPutPath,
      linkTemplate: ruleName => `https://eslint.org/docs/rules/${ruleName}`,
    });
  });
};
module.exports = createEslintDoc;
