#  javaScript和React规范

基于eslint,react插件,import插件,a11y插件,参考了airbnb配置

  - [React规范](./react.md)
  - [React可访问性规范](./reactAccessbility.md)

# 如何使用

    对应npm:eslint-config-zcs1

# 如何更新插件

执行`npm run checkRule`,会把当前规则和eslint最新版本插件比较，按照提示更新rule文件夹

**添加或修改规范后，必须严格按照下面样式更新jsDoc的注释，并重新生成文档**

# 如何创建文档

执行`npm run createDoc` 
根据rule文件夹下的jsDoc注释

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
