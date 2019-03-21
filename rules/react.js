// 本规则是react、jsx相关规范
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
     * 这三个关键词太笼统,起不到文档的约束作用,没有帮助
     * @wrong
     * Component.propTypes = {
     *   a: PropTypes.any,
     *   r: PropTypes.array,
     *   o: PropTypes.object
     * };
     * @right
     * Component.propTypes = {
     *   a: PropTypes.string,
     *   r: PropTypes.arrayOf(PropTypes.number),
     *   o: PropTypes.shape({
     *     color: PropTypes.string,
     *     fontSize: PropTypes.number
     *   })
     * };
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
     * 统一规范,更简洁
     * @wrong
     * <Modal isShow={true} />
     * @right
     * <Modal isShow />
     */
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],

    /**
     * @meaning
     * 循环时组件必须设置key属性
     * 不允许使用...运算符设置key属性
     * @why
     * 循环时使用key为了提高react性能：再次渲染如果key不变就不会重新渲染
     * 不允许使用...设置key,不利于代码可读性(不推荐使用静态key值)
     * @wrong
     * [<Hello />, <Hello />, <Hello />];
     *
     * data.map(x => <Hello>{x}</Hello>);
     *
     * <Hello {...{ key: id, id, caption }} />;
     * @right
     * [<Hello key="first" />, <Hello key="second" />, <Hello key="third" />];
     *
     * data.map(x => <Hello key={x.id}>{x.value}</Hello>);
     *
     * <Hello key={id} {...{ id, caption }} />;
     */
    'react/jsx-key': 'error',

    /**
     * @meaning
     * 禁止在jsx的属性值中包含bind语法函数或创建箭头函数字面量
     * @why
     * 每次渲染时候,在{}中执行bind或箭头函数时候都会创建一个全新的函数
     * 会造成不必要的刷新(这个函数的引用每次都变),出现性能问题
     * @wrong
     * <Foo onClick={this._handleClick.bind(this)}></Foo>
     *
     * <Foo onClick={() => console.log('Hello!')}></Foo>
     * @right
     * // 构造函数时候绑定原型方法到对象属性
     * constructor() {
     *  this.onClick= this.onClick.bind(this);
     * }
     *
     * // 或者使用箭头函数定义：利用箭头函数创建时候绑定this的特性绑定对象
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

    /**
     * @meaning
     * 禁止在jsx的属性中出现重名,大小写不一样的重名也不行
     * @why
     * 组件的props就是一个对象,同名的会覆盖,不同大小写的会认为是不同的,但不推荐使用
     * @wrong
     * <Hello name="John" Name="John" />;
     * @right
     * <Hello name="John"  />;
     */
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

    /**
     * @meaning
     * 禁止使用未定义jsx组件
     * @why
     * @wrong
     * <Hello name="John" />;
     * @right
     * const Hello = ({name}) => {
     *  return <div>{name}</div>
     * }
     * <Hello/>
     */
    'react/jsx-no-undef': 'error',

    /**
     * @meaning
     * 强制要求组件以大骆驼形式命名
     * @why
     * jsx标签第一个字母大写表示这是一个react组件.
     * @wrong
     * <testcomponent />
     * @right
     * <TestComponent />
     */
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],

    /**
     * @meaning
     * 不使用jsx语法时候不要引用React模块
     * @why
     * jsx语法会编译成React.createElement,因此jsx代码范围内必须引用React防止
     * 执行时候报错
     * @wrong
     * @right
     */
    'react/jsx-uses-react': ['error'],

    /**
     * @meaning
     * 使用dangerouslySetInnerHTML时发出警告
     * @why
     * react的一大优势就是免去了用户的dom操作,这不仅仅是方便了开发.
     * 而且因为react自己实现的dom系统可以提升性能和浏览器兼容性,
     * 并且规避了一些特定浏览器或特定情况下的问题(边界条件,安全性问题等).
     * 而dangerouslySetInnerHTML就相当于直接在dom上运行innerHTML,
     * react没有处理输入的字符串,这就有可能造成Xss攻击(字符串中注入JavaScript代码)
     * @wrong
     * @right
     */
    'react/no-danger': 'warn',

    /**
     * @meaning
     * 禁止使用已弃用语法
     * @why
     * 弃用语法有的有安全性问题而且以后版本很可能会不支持
     * @wrong
     * @right
     */
    'react/no-deprecated': ['error'],

    /**
     * @meaning
     * 禁止在componentDidUpdate中调用setState
     * @why
     * 这样很可能会导致死循环重复刷新组件
     * @wrong
     * @right
     */
    'react/no-did-update-set-state': 'error',

    /**
     * @meaning
     * 禁止在componentWillUpdate中使用setState
     * @why
     * componentWillUpdate官方文档禁止使用setState,并且
     * 该方法已经弃用了,并将于react17正式不支持
     * @wrong
     * @right
     */
    'react/no-will-update-set-state': 'error',

    /**
     * @meaning
     * 只允许使用setState改变state,不允许改变state属性或改变索引(不允许直接改变this.state, 唯一可以直接给 this.state 赋值的地方是 constructor)
     * @why
     * react的核心思路就是保持一切都是纯的,然后利用持久化数据结构的原理优化性能：
     * 当有改变发生需要比较状态的时候,找出树状结构上不变和变化的部分,
     * 然后只替换变化的节点和受影响的所有父节点.
     * 这个思路体现在每次render后的元素树的比较上,同样体现在state树上.
     *
     * react的state必须保持纯的,因为react会把当前state
     * 和上一个状态state做一个浅比较,决定是否render.
     * 而且state作为props传到组件的时候,还会再和上一个props进行浅比较决定组件是否刷新
     * 如果只是改变属性的话,引用不变不会刷新
     * @wrong
     * this.state.name = XXX
     * @right
     * this.setState({name: XXX})
     */
    'react/no-direct-mutation-state': 'error',

    /**
     * @meaning
     * 禁止使用isMounted
     * @why
     * react已经弃用这个属性了.
     * 很多人这么用isMounted:
     * ```
     * if (this.isMounted()) {
     *  this.setState({...})
     * }
     * ```
     * 来消除警告：组件已经umount但仍然调用setState.
     * 这个警告通常表示组件没有卸载干净：卸载后仍然保持对组件的引用,有可能导致内存泄漏.
     * 使用isMounted可能会消除警告,但警告的目的是让你发现为什么umount了还会调用setState,从而
     * 发现代码潜在的问题.使用isMounted没有了警告,但你也发现不了问题
     *
     * 这个警告主要发生在异步回调的时候,你可以通过：在Umount中设置flag,在回调中判断flag来解决.
     * 更好的方法是在umount的时候取消数据订阅,或者通过实现promise.cancel方法取消promise
     * @wrong
     * @right
     * @reference
     * <a href="https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html" target="_blank" rel="noopener noreferrer">isMounted is an Antipattern</a>
     */
    'react/no-is-mounted': 'error',

    /**
     * @meaning
     * 一个文件中只允许定义一个react class组件(函数组件不计算)
     * @why
     * 单一职责原则,功能拆分,利于组件复用,增加代码可读性,更好维护和修改
     * @wrong
     * class Hello extends React.PureComponent{
     *   render() {
     *     return <div>Hello {this.props.name}</div>;
     *   }
     * };
     *
     * class HelloJohn extends React.PureComponent{
     *   render: function() {
     *     return <Hello name="John" />;
     *   }
     * };
     * @right
     * const Hello = require('./components/Hello');

     * class HelloJohn extends React.PureComponent{
     *   render: function() {
     *     return <Hello name="John" />;
     *   }
     * };
     */
    'react/no-multi-comp': ['error', { ignoreStateless: true }],

    /**
     * @meaning
     * 禁止使用字符串标识的ref属性
     * @why
     * react以前的ref形式,已经废弃
     * 现在使用ref搭配一个函数来获取dom引用
     * @wrong
     * <div ref="helloDom">Hello, world.</div>
     * @right
     * <div ref={helloDom => { this.helloDom = helloDom; }}>Hello, world.</div>
     */
    'react/no-string-refs': 'error',

    /**
     * @meaning
     * 禁止在原生dom组件中出现非标准(不符合react属性名)的属性
     * @why
     * 具体哪些属性可用见索引
     * @wrong
     * <div class="hello">Hello World</div>
     * @right
     * <div className="hello">Hello World</div>
     * @reference
     * <a href="https://reactjs.org/docs/dom-elements.html" target="_blank" rel="noopener noreferrer">DOM Elements</a>
     */
    'react/no-unknown-property': 'error',

    /**
     * @meaning
     * 禁止使用createReactClass创建组件,使用class
     * @why
     * 用jsx语法,可读性好
     * @wrong
     * const Hello = createReactClass({
     *   render: function() {
     *     return <div>Hello {this.props.name}</div>;
     *   }
     * });
     * @right
     * class Hello extends React.Component {
     *   render() {
     *     return <div>Hello {this.props.name}</div>;
     *   }
     * }
     */
    'react/prefer-es6-class': ['error', 'always'],

    /**
     * @meaning
     * 强制使用 PropTypes检查属性的数据类型
     * @why
     * 使用 PropTypes校验输入属性可以提高组件可用性,其他开发人员可根据定义的类型检查正确使用该组件,
     * 相当于一个绝佳的文档,方便维护
     * @wrong
     * function Hello({ name }) {
     *  return <div>Hello {name}</div>;
     * }
     * @right
     * function Hello({ name }) {
     *   return <div>Hello {name}</div>;
     * }
     *
     * Hello.propTypes = {
     *   name: PropTypes.string.isRequired,
     * };
     */
    'react/prop-types': [
      'error',
      {
        ignore: [],
        customValidators: [],
        skipUndeclared: false,
      },
    ],

    /**
     * @meaning
     * 使用jsx语法一定要引用react
     * @why
     * jsx编译后就是React.createElement,作用域中必须引用React
     * @wrong
     * @right
     */
    'react/react-in-jsx-scope': 'error',

    /**
     * @meaning
     * render方法必须包含return语句
     * @why
     * @wrong
     * class Hello extends React.Component {
     *   render() {
     *     <div>Hello</div>;
     *   }
     * }
     * @right
     * class Hello extends React.Component {
     *   render() {
     *     return <div>Hello</div>;
     *   }
     * }
     */
    'react/require-render-return': 'error',

    /**
     * @meaning
     * 没有子元素的组件强制使用自闭合标签
     * @why
     * 没必要使用闭合标签,简洁,统一
     * @wrong
     * <Modal></Modal>
     * @right
     * <Modal />
     */
    'react/self-closing-comp': 'error',

    /**
     * @meaning
     * 类组件的方法按照以下顺序组织排列
     * 1. 静态方法和属性
     * 2. 生命周期方法
     * 3. 其他方法
     * 4. render方法
     * @why
     * @wrong
     * @right
     * class Ex extends React.Component {
     *      static propTypes = {};
     *      static defaultProps = {};
     *      componentDidmount() {};
     *      myFunc() {};
     *      render() {}
     * }
     */
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

    /**
     * @meaning
     * 使用有`target='_blank'`属性的a标签时候,必须加上rel='noreferrer noopener'属性
     * @why
     * 服务器安全隐患：钓鱼网站.当使用`<a target='_blank'/>`打开新页面时候,新页面可以通过window.opener
     * 获得原页面的window对象,然后黑客可以通过执行window.opener.location
     * 改变你原来的网址重定向到一个相似的钓鱼网站窃取你的信息.添加如上的rel属性可以让window.opener为空
     * @wrong
     * <a target='_blank' href="http://example.com/">
     * @right
     * <p target="_blank"></p>
     * <a target="_blank" rel="noopener noreferrer" href="http://example.com"></a>
     * <a target="_blank" href="path/in/the/host"></a>
     */
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

    /**
     * @meaning
     * 对原生eslint规则no-unused-vars的补充
     * @why
     * 定义的模块名如果使用在jsx中的话，原生规则识别不出来，会报错
     * 这个规则正确识别组件是否使用
     */
    'react/jsx-uses-vars': 'error',

    /**
     * @meaning
     * .jsx后缀的文件才可以包含jsx语法
     * @why
     * 可通过文件名快速了解内容
     * @wrong
     * // filename: MyComponent.js
     * function MyComponent() {
     *   return <div />;
     * }
     * @right
     * // filename: MyComponent.jsx
     * function MyComponent() {
     *   return <div />;
     * }
     */
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],

    /**
     * @meaning
     * 禁止在jsx文本节点中出现注释(行和块注释)
     * @why
     * 防止开发者以为注释了内容,实际没有,导致输出错误信息的问题
     * @wrong
     * class Hello extends React.PureComponent{
     * render() {
     *   return (
     *     <div>
     *       // empty div
     *     </div>
     *     )
     *   }
     * }
     * @right
     * class Hello extends React.PureComponent{
     *   render() {
     *     return <div>{// empty div }</div>;
     *   }
     * }
     */
    'react/jsx-no-comment-textnodes': 'error',

    /**
     * @meaning
     * 禁止使用 `React.render/ReactDOM.render`的返回值
     * @why
     * 这个返回值是对根元素的引用,但是以后有可能会使用异步渲染
     * 为了防止以后升级版本可能出现的问题,不要用,如果要获取dom,使用ref
     * @wrong
     * const inst = ReactDOM.render(<App />, document.body);
     * doSomethingWithInst(inst);
     * @right
     * ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);
     */
    'react/no-render-return-value': 'error',

    /**
     * @meaning
     * 禁止使用findDOMNode方法, 用 ref
     * @why
     * react以后会废弃掉 findDOMNode方法
     * @wrong
     * @right
     */
    'react/no-find-dom-node': 'error',

    /**
     * @meaning
     * 禁止使用dangerouslySetInnerHTML的同时还包含children
     * @why
     * 错误语法
     * @wrong
     * <div dangerouslySetInnerHTML={{ __html: "HTML" }}>
     *   Children
     * </div>
     * @right
     * <div dangerouslySetInnerHTML={{ __html: "HTML" }} />
     * <div>
     *   Children
     * </div>
     */
    'react/no-danger-with-children': 'error',

    /**
     * @meaning
     * 不要定义使用不到的 prop types
     * @why
     * 代码越少越好,代码越多,问题越多
     * @wrong
     * class Hello extends React.PureComponent{
     *   static propTypes= {
     *     name: PropTypes.string
     *   }
     *
     *   render() {
     *     return <div>Hello Bob</div>;
     *   }
     * };
     * @right
     * class Hello extends React.PureComponent{
     *   static propTypes= {
     *     name: PropTypes.string
     *   }
     *
     *   render() {
     *     return <div>Hello {this.props.name}</div>;
     *   }
     * };
     */
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        // 跳过对shape类型的检测,不能准确识别每个属性
        skipShapeProps: true,
      },
    ],

    // 强制要求style属性的值必须是对象
    /**
     * @meaning
     * 强制要求style属性的值必须是对象
     * @why
     * 错误语法 (This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.)
     * @wrong
     * <div style="color: 'red'" />
     * @right
     * <div style={{ color: "red" }} />
     */
    'react/style-prop-object': 'error',

    /**
     * @meaning
     * 禁止在jsx文本节点中出现没有转义字符： > " ' }
     * @why
     * 这几个字符出现了也没事,react会自动转义.但是大概率这几种字符的出现是由于敲错了,比如：
     * ```
     * <Component
     *   a="b">
     *   c="d">
     * >bodytext</Component>
     * ```
     * 因为多敲了一个>,输出错误.这个规则就是让你及早发现错误
     * 如果你需要用到这几个字符,使用转义符号或者通过{}输出：
     * ```
     * > -> &gt;
     * " -> &quot;
     * ' -> &apos;
     * } -> &#125;
     * ```
     * @wrong
     * <div> > </div>
     * @right
     * <div> &gt; </div>
     * <div> {'>'} </div>
     */
    'react/no-unescaped-entities': 'error',

    /**
     * @meaning
     * 禁止使用props的children属性传递子元素
     * @why
     * 放到jsx语法里更好理解
     * @wrong
     * <Father children={<Child/>} />
     * @right
     * <Father><Child/></Father>
     */
    'react/no-children-prop': 'error',

    /**
     * @meaning
     * 禁止使用索引作为属性key的值
     * @why
     * key能告诉react,哪些元素是不变的,哪些元素是变了的从而重新渲染
     * 如果使用索引作为key,不能唯一标识元素,有可能的后果就是,内容变了,但是没有重新刷新
     * 使用元素内容唯一标识
     * @wrong
     * {list.map((item, index) => <div key={index}>{item}</div>)}
     * @right
     * {list.map((item, index) => <div key={item}>{item}</div>)}
     */
    'react/no-array-index-key': 'error',

    /**
     * @meaning
     * 强制要求每个非必需props都有一个对应的defaultProps
     * @why
     * 组件可以看成和js的函数一样的东西,输入就是props,输出就是elements
     * 一个好的函数应该对每个输入值进行类型检查并设置默认值,运行时候保证
     * 各种边界条件可以运行良好.
     * 给所有props设置默认值,也能保证props缺失时组件能正常渲染.
     * @wrong
     * @right
     */
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
      },
    ],

    // 禁止引用别的组件,后直接使用组件的propTypes作为自己的propTypes
    // 防止使用babel插件babel-plugin-transform-react-remove-prop-types时候出现问题
    /**
     * @meaning
     * 禁止直接引用别的组件的proptypes(可以通过import解构重命名使用)
     * @why
     * 防止生产环境下使用babel插件 babel-plugin-transform-react-remove-prop-types
     * 去除propTypes时出现问题
     * @wrong
     * import SomeComponent from './SomeComponent';
     * SomeComponent.propTypes;
     * const { propTypes } = SomeComponent;
     * SomeComponent['propTypes'];
     * @right
     * import SomeComponent, {propTypes as someComponentPropTypes} from './SomeComponent';
     */
    'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],

    // 强制要求defaultProps中的属性必须是notRequired
    // 并且必须在PropTypes中有定义
    /**
     * @meaning
     * 必填(required)的props不允许出现在defaultProps中
     * 没有在propTypes中定义的属性不允许出现在defaultProps中
     * @why
     * 减少冗余
     * @wrong
     * MyStatelessComponent.propTypes = {
     *   foo: React.PropTypes.string.isRequired,
     *   bar: React.PropTypes.string
     * };
     *
     * MyStatelessComponent.defaultProps = {
     *   foo: "foo",
     *   baz: "baz"
     * };
     * @right
     * MyStatelessComponent.propTypes = {
     *   foo: React.PropTypes.string.isRequired,
     *   bar: React.PropTypes.string
     * };
     *
     * MyStatelessComponent.defaultProps = {
     *   bar: "bar"
     * };
     */
    'react/default-props-match-prop-types': [
      'error',
      // required props不允许出现在default中
      { allowRequiredDefaults: false },
    ],

    /**
     * @meaning
     * PureComponent类型的组件禁止使用shouldComponentUpdate方法
     * @why
     * PureComponent默认实现了一个shouldComponentUpdate方法(通过对state和props浅比较决定是否渲染).
     * 再定义shouldComponentUpdate仍然会按照你定义的方法来决定是否渲染
     * 但这样使用PureComponent就没有意义了
     * @wrong
     * @right
     */
    'react/no-redundant-should-component-update': 'error',

    /**
     * @meaning
     * 禁止出现未被使用的state属性
     * @why
     * 减少冗余
     * @wrong
     * @right
     */
    'react/no-unused-state': 'error',

    /**
     * @meaning
     * 强制布尔值变量命名以is或has开始
     * @why
     * 统一规范,帮助理解变量含义
     * @wrong
     * @right
     */
    'react/boolean-prop-naming': [
      'error',
      {
        propTypeNames: ['bool'],
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: '布尔值命名使用is或has开头',
      },
    ],

    /**
     * @meaning
     * 保证react预留的静态类属性和生命周期方法大小写拼写正确
     * @why
     * js属性大小写敏感,写错就不执行了
     * @wrong
     * @right
     */
    'react/no-typos': 'error',

    /**
     * @meaning
     * 不允许花括号给字符串属性或文本节点使用
     * @why
     * 减少冗余
     * @wrong
     * <Test name={"zcs"}>{"zcs"}</Test>
     * @right
     * <Test name="zcs">zcs</Test>
     */
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],

    /**
     * @meaning
     * 强制要求使用解构获取所有props,state,context属性,再通过变量在render中使用
     * @why
     * 1. 减少this.props字符串的书写
     * 2. 减少对this.props的索引搜索
     * @wrong
     * render() {
     *  <Component name={this.props.name} gender={this.props.gender}/>
     * }
     * @right
     * render() {
     *  const {name, gender} = this.props;
     *  <Component name={name} gender={gender}/>
     * }
     */
    'react/destructuring-assignment': ['error', 'always'],

    /**
     * @meaning
     * setState方法中禁止使用this.state
     * @why
     * setState中使用this.state都是为了获取上一次的状态,进行下一次的操作.
     * 但setState有可能是异步的,批量的,因此使用this.state不能准确获取上一次的状态数据
     * 你可以：
     * 1. 要不使用回调函数获取修改后的state
     * 2. 要不通过第一个函数参数获取上一次state
     * @wrong
     * onClick() {
     *    this.setState({
     *        num: this.state.num + 1,
     *    })
     * }
     * @right
     * onClick() {
     *    this.setState(prevState => {
     *        return {
     *          num: prevState.num + 1
     *        }
     *    })
     * }
     * onClick() {
     *    this.setState(xx, () => {
     *        ...
     *    })
     * }
     */
    'react/no-access-state-in-setstate': 'error',

    /**
     * @meaning
     * button标签必须设置type属性(button, submit, reset)
     * @why
     * button的type属性默认值是submit,可能会导致意外现象
     * @wrong
     * <button>Hello</button>
     * @right
     * <button type="button">Hello</button>
     * <button type="submit">Hello</button>
     * <button type="reset">Hello</button>
     */
    'react/button-has-type': 'error',

    /**
     * @meaning
     * 禁止在sfc中出现this指针
     * @why
     * sfc==stateless function component===无状态组件===函数组件
     * 这种组件的this和class组件的不同
     * @wrong
     * function Foo(props) {
     *   return (
     *     <div>{this.props.bar}</div>
     *   );
     * }
     * @right
     * function Foo(props) {
     *   return (
     *     <div>{props.bar}</div>
     *   );
     * }
     */
    'react/no-this-in-sfc': 'error',

    /**
     * @meaning
     * 禁止使用不安全的生命周期方法(componentWillMount,componentWillUpdate,componentWillReceiveProps)
     * @why
     * 1. 这些方法将在react17正式不支持.
     * 2. 这些方法本身就有潜在的问题.
     *     * componentWillMount和 componentWillUpdate都是render前要调用的方法,不能调用setState容易出错
     *     * componentWillReceiveProps有以下问题：
     *       1. 你不能直接把props的值一股脑的设置给state,因为这样会把用户原生操作的状态冲掉
     *       2. 当接收新props时,你需要对内容进行判断,决定更新哪个状态.这是很复杂的,随着props的增多很难维护.而且难以把状态复原
     *       3. state的来源包括mount时候constructor中的props和 componentWillReceiveProps中的判断设置,来源不单一,你可能要写两种情况的代码
     *     * 解决方法是：
     *       1. 尽量不设置state,所有组件只是用props,state统一管理(redux的做法)
     *       2. 使用key关联id,当一个组件的key换了,从新mount,避开 componentWillReceiveProps 方法
     * (这些方法在组价的异步渲染和严格模式下会有问题)
     * @wrong
     * @right
     * @reference
     * <a href="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html" target="_blank" rel="noopener noreferrer">You Probably Don't Need Derived State</a>
     */
    'react/no-unsafe': 'error',

    /**
     * @meaning
     * 强制要求jsx中onXXX(事件处理函数)的对应类的方法前缀必须是handle
     * @why
     * 统一规范,增强可读性
     * @wrong
     * <MyComponent handleChange={this.componentChanged} />
     * @right
     * <MyComponent onChange={this.handleChange} />
     */
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],

    /**
     * @meaning
     * 强制fragment语法使用简写<></>
     * @why
     * 统一规范,减少冗余
     * @wrong
     * <React.Fragment><Foo /></React.Fragment>
     * @right
     * <><Foo /></>
     *
     * <React.Fragment key="key"><Foo /></React.Fragment>
     */
    'react/jsx-fragments': 'error',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
    // propTypes的包装函数,暂时不需要
    propWrapperFunctions: [],
  },
};
