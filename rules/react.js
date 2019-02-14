// 本规则是react、jsx相关规范
// 如何查看规则详细：
// 1. 获取rulesName: 'react/forbid-prop-types'取斜线后边部分forbid-prop-types
// 2. 地址替换rulesName：
// `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${rulesName}.md`
module.exports = {
  plugins: ['react'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    // 强制要求非预设方法使用this
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          'render',
          'getInitialState',
          'getDefaultProps',
          'getChildContext',
          'componentWillMount',
          'UNSAFE_componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'UNSAFE_componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'UNSAFE_componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount',
          'componentDidCatch',
          'getSnapshotBeforeUpdate',
        ],
      },
    ],

    /**
     * @meaning
     * propTypes校验禁止使用类型any,array(arrayOf替换),object(shape替换)
     * @why
     * 这三个关键词太笼统，起不到文档或约束作用，没有帮助
     * @wrong
     * @right
     */
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any', 'array', 'object'],
        checkContextTypes: true,
        checkChildContextTypes: true,
      },
    ],

    /**
     * @meaning
     * jsx中使用省略写法设置属性为true的值
     * @why
     * 统一规范，更简洁
     * @wrong
     * <Modal isShow={true} />
     * @right
     * <Modal isShow />
     */
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],

    // 数组或循环输出jsx，必须提供唯一的key
    // 注意这个key要根据内容产生，不能使用index，否则会出现更大的问题
    /**
     * @meaning
     * 循环时组件必须设置key属性
     * 不允许使用...运算符设置key属性
     * @why
     * 循环时使用key为了提高react性能：再次渲染如果key不变就不会重新渲染
     * 不允许使用...设置key，不利于代码可读性
     * @wrong
     * [<Hello />, <Hello />, <Hello />];
     * data.map(x => <Hello>{x}</Hello>);
     * <Hello {...{ key: id, id, caption }} />
     * @right
     * [<Hello key="first" />, <Hello key="second" />, <Hello key="third" />];
     * data.map(x => <Hello key={x.id}>{x.value}</Hello>);
     * <Hello key={id} {...{ id, caption }} />
     */
    'react/jsx-key': 'error',

    /**
     * @meaning
     * 禁止在jsx的属性值中包含bind语法或创建箭头函数字面量
     * @why
     * 每次渲染时候，在{}中执行bind或箭头函数时候都会创建一个全新的函数
     * 这样这个组件就可能会造成不必要的刷新(这个函数的引用每次都变)
     * 造成性能问题
     * @wrong
     * <Foo onClick={this._handleClick.bind(this)}></Foo>
     * <Foo onClick={() => console.log('Hello!')}></Foo>
     * @right
     * 构造函数时候绑定原型方法到对象属性
     * 或在使用箭头函数定义利用箭头函数创建时候绑定上下文的特性绑定对象
     * constructor() {
     *  this.onClick= this.onClick.bind(this);
     * }
     * or
     * onClick = () => {}
     * <Foo onClick={this.onClick}></Foo>
     */
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: false,
      },
    ],

    // 禁止在jsx中出现相同的属性名，忽略大小写
    // wrong：<Hello name='1234' Name='1234'>/
    /**
     * @meaning
     * 禁止在jsx的属性中出现重名，大小写不一样的重名也不行
     * @why
     * 组件的props就是一个对象，同名的会覆盖，不同大小写的会认为是不同的
     * @wrong
     * <Hello name="John" Name="John" />;
     * @right
     * <Hello name="John"  />;
     */
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

    // 禁止在jsx中出现未定义的变量
    'react/jsx-no-undef': 'error',

    // 强制要求自定义组件以大骆驼形式命名
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],

    // 禁止出现无效的react引用
    // 如果没有jsx语法，不要引用react
    'react/jsx-uses-react': ['error'],

    // 不允许出现定义未使用的组件
    'react/jsx-uses-vars': 'error',

    // 使用直接设置innerHTML的react语法时候，
    // 发出警告
    'react/no-danger': 'warn',

    // 禁止使用已启用语法
    'react/no-deprecated': ['error'],

    // 禁止在componentDidUpdate中调用setState
    // 这样很可能会导致死循环重复刷新组件
    'react/no-did-update-set-state': 'error',

    // 禁止在willUpdate中使用setState
    // 实际上，willUpdate已经启用了，并将于react17正式不支持
    'react/no-will-update-set-state': 'error',

    // 禁止直接改变state，必须使用setState
    // react的state必须保持纯的，因为react会根据当前state
    // 和上一个state做一个浅比较，决定是否render，而且state
    // 如果作为props传到组件里，还会再进行浅比较决定组件是否刷新
    'react/no-direct-mutation-state': 'error',

    // 禁止使用isMounted
    // isMounted使用场景是为了消除警告：一个组件已经umount但仍然调用了setState
    // 使用isMounted可能会消除警告，但是警告的目的是让你发现为什么umount了还会调用setState，从而
    // 发现代码潜在的问题。使用了isMounted没有警告了，也发现不了问题
    // 绝大多数的问题都发生在异步的回调，你可以通过：在Umount中设置flag，在回调中判断flag来解决。
    // 更好的方法是在umount的时候取消数据订阅，或者通过实现promise.cancel方法取消promise
    'react/no-is-mounted': 'error',

    // 一个文件中只允许出现一个react组件（使用class定义，函数组件不计算）
    'react/no-multi-comp': ['error', { ignoreStateless: true }],

    // 禁止使用字符串作为refdom参数
    'react/no-string-refs': 'error',

    // 禁止在原生dom组件中出现非标准（不符合react属性名）的属性
    'react/no-unknown-property': 'error',

    // 禁止使用createReactClass创建组件，强制使用class
    'react/prefer-es6-class': ['error', 'always'],

    // 强制使用propTypes检查属性
    'react/prop-types': [
      'error',
      {
        ignore: [],
        customValidators: [],
        skipUndeclared: false,
      },
    ],

    // 如果有jsx语法，那么必须在作用域中引用react
    // 如果没有jsx语法，不要引用react
    'react/react-in-jsx-scope': 'error',

    // 强制要求render方法包含return语句
    'react/require-render-return': 'error',

    // 没有children的组件强制要求使用自闭合语法，不要
    // <Hello />
    'react/self-closing-comp': 'error',

    // 强制要求组件内部按照
    // 1. 静态方法
    // 2. 事件循环方法
    // 3. 其他方法
    // 4. render方法
    // 的顺序排列
    'react/sort-comp': [
      'error',
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'rendering'],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],

    // 当使用a标签的target='_blank'属性时候，有安全隐患，新开的页面可以通过
    // window.opener获取原始页面的windows对象，想象你打开了一个连接到一个恶意网站，
    // 该网站通过window.opener.location='一个高仿钓鱼网站'窃取你的信息
    // 因此当href是域名开头或者变量的时候，要求必须添加属性rel='noreferrer noopener'
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

    // 强制要求.jsx后缀的文件才可以包含jsx语法
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],

    // 禁止在jsx节点中出现//，防止开发者以为注释了，实际上会输出字符串的问题
    // wrong:
    // <div>//不需要了。。</div>
    // right:
    // <div>/* 不需要了。。 */</div>
    'react/jsx-no-comment-textnodes': 'error',

    // 禁止使用React.render/ReactDOM.render的返回值
    // 这个返回值是对根元素的引用，但是以后有可能会使用异步渲染，再用这个会有问题
    // 请使用ref获取dom元素
    'react/no-render-return-value': 'error',

    // 禁止使用findDOMNode方法，因为这个方法以后会废弃掉
    // 使用ref获取dom引用
    'react/no-find-dom-node': 'error',

    // 禁止使用dangerouslySetInnerHTML的同时还包含children
    'react/no-danger-with-children': 'error',

    // 禁止定义没有被使用的props
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],

    // 强制要求style属性的值必须是对象
    'react/style-prop-object': 'error',

    // 禁止在jsx标签中出现无效的字符串
    // 比如意外的闭合，> " ' } 等符号使用转义符号
    // > -> &gt;
    // " -> &quot;
    // ' -> &apos;
    // } -> &#125;
    'react/no-unescaped-entities': 'error',

    // 禁止使用props的children属性传递子元素
    // wrong: <Father children={<Child/>} />
    // wright: <Father><Child/></Father>
    'react/no-children-prop': 'error',

    // 禁止使用索引作为属性key的值
    'react/no-array-index-key': 'error',

    // 强制要求每个非必需props都有一个对应的defaultProps属性
    // why?组件可以看成和js的函数一样的东西，输入就是props，输出就是elements
    // 一个良好的函数的特点包括，对每个输入值进行类型检查并设置默认值，保证运行时候
    // 各种边界条件可以运行良好（各种奇怪的传值或不传），同理react组件的props也要
    // 设置好输入，保证以后各种情况下保持表现的一致。
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
      },
    ],

    // 禁止引用别的组件，后直接使用组件的propTypes作为自己的propTypes
    // 防止使用babel插件babel-plugin-transform-react-remove-prop-types时候出现问题
    'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],

    // 禁止给自闭合html标签设置children属性
    // wrong: <img children={} />
    'react/void-dom-elements-no-children': 'error',

    // 强制要求defaultProps中的属性必须是notRequired
    // 并且必须在PropTypes中有定义
    'react/default-props-match-prop-types': [
      'error',
      { allowRequiredDefaults: false },
    ],

    // 如果继承自PureComponent,禁止使用shouldComponentUpdate方法
    'react/no-redundant-should-component-update': 'error',

    // 禁止定义未使用的state
    'react/no-unused-state': 'error',

    // 强制布尔值变量以is或has开始
    'react/boolean-prop-naming': [
      'error',
      {
        propTypeNames: ['bool'],
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: '布尔值命名使用is或has开头',
      },
    ],

    // 保证预留关键字的大小写拼写正确
    // 检查：1. propTypes 2. lifecycle方法
    'react/no-typos': 'error',

    // 强制要求不要出现不必要的花括号，比如
    // <Test p={'1234}>
    // <Test p='1234'>
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],

    // 强制要求使用解构获取所有props属性，再通过变量在render中使用
    // wrong: render() { return <div>{this.props.name}</div>}
    // wright: render() { const {name} = this.props; return <div>{name}</div>}
    // 这样可读性更好，一下就可看到用了哪些属性，统一位置
    'react/destructuring-assignment': ['error', 'always'],

    // 在setState方法中禁止使用this.state,因为setState是异步、批量处理的，
    // 使用this.state获取的状态不一定是上一次状态，使用第一个参数获取上一次状态
    'react/no-access-state-in-setstate': 'error',

    // 强制要求button标签设置type属性
    // 因为button默认属性是submit，可能会导致意外现象
    'react/button-has-type': 'error',

    // sfc==stateless function component===无状态组件===函数组件
    // 禁止在sfc中出现this指针
    'react/no-this-in-sfc': 'error',

    // 禁止使用废弃的Unsafe方法
    'react/no-unsafe': 'error',

    // 强制要求jsx中onXXX的对应类的方法前缀必须是handleXXX
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],

    // 强制fragment语法使用简写<></>
    'react/jsx-fragments': 'error',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    react: {
      pragma: 'React',
      version: '16.8',
    },
    // propTypes的包装函数，暂时不需要
    propWrapperFunctions: [],
  },
};
