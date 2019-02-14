# eslint

一个 eslint 预配置项目，基于 airbnb 规范

# 对应 npm 包 eslint-config-zcs1

# 关于注释

注释风格是 jsdoc 形式,具体格式如下

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
