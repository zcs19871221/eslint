# javaScript 和 React 规范

- [React 规范](./doc/react.md)
- [React 可访问性规范](./doc/reactAccessbility.md)
- [模块化规范](./doc/imports.md)
- [最佳实践](./doc/best-practices.md)
- [错误语法](./doc/errors.md)
- [es6](./doc/es6.md)
- [node](./doc/node.md)
- [代码样式](./doc/style.md)
- [变量](./doc/variables.md)

# node规范需要设置engine属性
# 如何使用

## 安装

`npm install eslint-config-zcs`

## 创建 eslint 配置文件

1. 全局安装`npm install -g eslint-config-zcs`
2. 在需要创建的目录下，执行`eslint-zcs`
3. 根据提示信息进行选择，最终在脚本执行路径下生成`.eslintrc.js`文件

## 更新规则

执行`npm run checkRule`,会把当前规则和 eslint 官网以及使用插件官网上的规则进行比较，按照提示更新 rule 文件夹

**添加或修改规范后，必须严格按照下面样式更新 jsDoc 的注释，并重新生成文档**

## 更新规范文档

执行`npm run createDoc`
根据 rule 文件夹下的 jsDoc 注释生成文档

# 关于规范中的注释

注释风格是 jsdoc 形式,请严格按照如下格式修改

    /**
     * @meaning
     * 强制要求<hX>的内容不为空
     * @why
     * 标题对正常和残障人士一样重要：精心编写和正确排序的<hX>标签可以
     * 帮助用户更好了解文章内容，节省用户时间。
     * 对于阅读器用户来说，看不到样式，只能通过<hX>标签来确定标题，因此<hX>标签很重要
     * @wrong
     * <h1 />
     * <h1><TextWrapper aria-hidden />
     * @right
     * <h1>Heading Content!</h1>
     * <h1><TextWrapper /><h1>
     * <h1 dangerouslySetInnerHTML={{ __html: 'foo' }} />
     */

## meaning

规则含义

## why

解释为什么定这个规则

## wrong

错误例子

## right

正确例子

# 关于文件后缀

    import中的settings的import/resolver的extension表示如果文件a省略后缀，将按照a.js a.jsx a.json
    的顺序尝试解析
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    }


    import中的规则的extension表示，这些后缀是默认的，不允许出现
