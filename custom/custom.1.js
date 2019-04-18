const ask = require('./ask');
const pkg = require('../package.json');

const babelParserName = 'babel-eslint';
const {
  name: pkgName,
  devDependencies: {
    eslint,
    [babelParserName]: babelParser,
    'eslint-config-prettier': prettierConfig,
    'eslint-import-resolver-alias': importAliasPg,
    'eslint-plugin-compat': compatPg,
    'eslint-plugin-import': importPg,
    'eslint-plugin-jsx-a11y': jsxPg,
    'eslint-plugin-react': reactPg,
  },
} = pkg;

const feature = {
  errors: {
    file: 'rules/errors',
  },
  style: {
    file: 'rules/style',
  },
  variables: { file: 'rules/variables' },
  'best-practices': {
    file: 'rules/best-practices',
  },
  compatibility: {
    file: 'rules/compatibility',
    parser: babelParserName,
    install: [babelParser, compatPg],
  },
  confusingBrowserGlobals: {
    file: 'rules/confusingBrowserGlobals',
  },
  es6: {
    file: 'rules/es6',
    parser: babelParserName,
  },
  imports: {
    file: 'rules/imports',
    install: [importPg],
    parser: babelParserName,
  },
  'jsx-accessibility': {
    file: 'rules/jsx-accessibility',
    install: [jsxPg],
    parser: babelParserName,
  },
  node: {
    file: 'rules/node',
  },
  react: {
    file: 'rules/react',
    install: [reactPg],
    parser: babelParserName,
  },
};

const useBabelParser = () => {
  return { parser: babelParser, install: babelParser };
};
const isUse = name => ask({ type: 'confirm', message: `使用${name}` });

const custom = async () => {
  const install = [eslint, pkgName];

  const extendsRuleFiles = ['style', 'best-practices', 'errors', 'variables'];
  const isUseEs6 = await isUse('es6');
  let parser = null;
  if (isUseEs6) {
    extendsRuleFiles.push('es6');
    parser = babelParserName;
    install.push(babelParser);
    const isUseImport = await isUse('import/export语法');
    if (isUseImport) {
      install.push(importPg);
      install.push(importAliasPg);
      extendsRuleFiles.push('imports');
    }
  }
  const env = await ask({ type: 'list', choices: ['browser', 'node'] });
  if (env === 'browser') {
    extendsRuleFiles.push('confusingBrowserGlobals');
    const isUseCompact = await ask({
      type: 'confirm',
      message: '使用兼容性检查?',
    });
    if (isUseCompact) {
      extendsRuleFiles.push('compatibility');
      install.push(compat);
    }
  }
  if (env === 'node') {
    extendsRuleFiles.push('node');
  }
  const isUseReact = await ask({
    type: 'confirm',
    message: '使用React',
  });
  if (isUseReact) {
    parser = babelParserName;
    install.push(babelParser);
    install.push(reactPg);
    extendsRuleFiles.push('react');
  }
  const isUseJsx = await ask({ type: 'confirm', message: '使用jsx语法' });
  if (isUseJsx) {
    parser = babelParserName;
    install.push(babelParser);
    install.push(jsxPg);
    extendsRuleFiles.push('jsx-accessibility');
  }
  const isUserPrettier = await ask({ type: 'confirm', message: '使用jsx语法' });
  const extendsFiles = extendsRuleFiles.map(file => `${name}/rules/${file}`);
  if (isUserPrettier) {
    extendsFiles.push('prettier');
    install.push(prettierConfig);
    if (isUseReact) {
      extendsFiles.push('prettier/react');
    }
  }
  const isUesJest = await ask({ type: 'confirm', message: '使用jest' });
  const isUesWebpack = await ask({ type: 'confirm', message: '使用webpack' });
  const isUseServiceworker = await ask({
    type: 'confirm',
    message: '使用webpack',
  });

  const config = {
    extends: extendsFiles,
    root: true,
    ...(parser && { parser }),
    parseOptions: {
      ecmaVersion: 2018,
    },
    env: {
      ...(isUesJest && { jest: true }),
      ...(isUesWebpack && { commonjs: true }),
      ...(isUseServiceworker && { serviceworker: true }),
    },
  };
};
