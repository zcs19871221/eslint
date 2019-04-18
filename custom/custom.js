const fs = require('fs');
const path = require('path');
const ask = require('./ask');
const pkg = require('../package.json');

const babelParserName = 'babel-eslint';
const prettierConfigName = 'eslint-config-prettier';
const importAliasPgName = 'eslint-import-resolver-alias';
const compatPgName = 'eslint-plugin-compat';
const importPgName = 'eslint-plugin-import';
const jsxPgName = 'eslint-plugin-jsx-a11y';
const reactPgName = 'eslint-plugin-react';

const {
  name: pkgName,
  devDependencies: {
    eslint,
    [babelParserName]: babelParser,
    [prettierConfigName]: prettierConfig,
    [importAliasPgName]: importAliasPg,
    [compatPgName]: compatPg,
    [importPgName]: importPg,
    [jsxPgName]: jsxPg,
    [reactPgName]: reactPg,
  },
} = pkg;

class Custom {
  /* eslint-disable max-lines-per-function */
  constructor() {
    this.features = {
      errors: {
        file: `${pkgName}/rules/errors`,
      },
      style: {
        file: `${pkgName}/rules/style`,
      },
      variables: {
        file: `${pkgName}/rules/variables`,
      },
      'best-practices': {
        file: `${pkgName}/rules/best-practices`,
      },
      compatibility: {
        file: `${pkgName}/rules/compatibility`,
        install: [`${compatPgName}${compatPg}`],
      },
      confusingBrowserGlobals: {
        file: `${pkgName}/rules/confusingBrowserGlobals`,
      },
      es6: {
        file: `${pkgName}/rules/es6`,
        install: [],
      },
      imports: {
        file: `${pkgName}/rules/imports`,
        install: [
          `${importPgName}${importPg}`,
          `${importAliasPgName}${importAliasPg}`,
        ],
      },
      'jsx-accessibility': {
        file: `${pkgName}/rules/jsx-accessibility`,
        install: [`${jsxPgName}${jsxPg}`],
      },
      node: {
        file: `${pkgName}/rules/node`,
      },
      react: {
        file: `${pkgName}/rules/react`,
        install: [`${reactPgName}${reactPg}`],
      },
      prettier: {
        file: 'prettier',
        install: [`${prettierConfigName}${prettierConfig}`],
      },
      prettierReact: {
        file: 'prettier/react',
        install: [`${prettierConfigName}${prettierConfig}`],
      },
    };
    this.init();
  }

  static isUse(name) {
    return ask({ type: 'confirm', message: `使用${name}` });
  }

  init() {
    this.toInstall = [`eslint${eslint}`, `${babelParserName}${babelParser}`];
    this.toExtend = [];
    this.parser = null;
    this.env = {};
    ['best-practices', 'errors', 'style', 'variables'].forEach(each =>
      this.addFeature(each),
    );
  }

  addFeature(pro) {
    if (this.features[pro]) {
      const { file, install, parser } = this.features[pro];
      if (parser) {
        this.parser = parser;
      }
      if (file) {
        this.toExtend.push(file.replace(/^eslint-config-/u, ''));
      }
      if (install) {
        this.toInstall = this.toInstall.concat(install);
      }
    } else {
      throw new Error(`没找到特征${pro}`);
    }
  }

  static uniq(list) {
    const map = {};
    return list.filter(each => {
      if (map[each] === undefined) {
        map[each] = true;
        return true;
      }
      return false;
    });
  }

  static checkList(list) {
    if (Array.isArray(list)) {
      return list.map(each => {
        if (typeof each !== 'string' || !each.trim()) {
          throw new Error('extends配置错误');
        }
        return each.trim();
      });
    }
    return [];
  }

  getExtend() {
    return Custom.uniq(Custom.checkList(this.toExtend));
  }

  getInstall() {
    return Custom.uniq(Custom.checkList(this.toInstall));
  }

  async create() {
    await this.handleFeature();
    const env = await Custom.handleEnv();
    const install = this.getInstall();
    console.log(`npm install --save-dev ${install.join(' ')}`);
    const config = {
      extends: Custom.uniq(this.getExtend()),
      root: true,
      parser: babelParserName,
      parserOptions: {
        ecmaVersion: 2018,
      },
      ...(env && { env }),
    };
    fs.writeFileSync(
      path.join(process.cwd(), '.eslintrc.js'),
      `module.exports = ${JSON.stringify(config, null, 2)}`,
    );
  }

  static async handleEnv() {
    const isUseJest = await Custom.isUse('jest');
    const isUesWebpack = await Custom.isUse('webpack');
    const isUseServiceworker = await Custom.isUse('serviceworker');
    const env = {
      ...(isUseJest && { jest: true }),
      ...(isUesWebpack && { commonjs: true }),
      ...(isUseServiceworker && { serviceworker: true }),
    };
    if (Object.keys.env === 0) {
      return null;
    }
    return env;
  }

  async handleFeature() {
    const isUseEs6 = await Custom.isUse('>=es6语法');
    if (isUseEs6) {
      this.addFeature('es6');
    }
    const env = await ask({
      type: 'list',
      choices: ['browser', 'node'],
      message: '选择环境',
    });
    if (env === 'browser') {
      this.addFeature('confusingBrowserGlobals');
      if (isUseEs6) {
        this.addFeature('imports');
      }
      if (await Custom.isUse('浏览器兼容性检查')) {
        this.addFeature('compatibility');
      }
    } else if (env === 'node') {
      this.addFeature('node');
      this.addFeature('imports');
    }
    const isUseReact = await Custom.isUse('react');
    if (isUseReact) {
      this.addFeature('react');
    }
    if (await Custom.isUse('jsx可访问性检查')) {
      this.addFeature('jsx-accessibility');
    }
    if (await Custom.isUse('prettier格式化')) {
      this.addFeature('prettier');
      if (isUseReact) {
        this.addFeature('prettierReact');
      }
    }
  }
}

const custom = new Custom();
custom.create();
