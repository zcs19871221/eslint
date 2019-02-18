# React 和 jsx 规范

## 目录

1. [react/forbid-prop-types](#react/forbid-prop-types)
2. [react/jsx-boolean-value](#react/jsx-boolean-value)
3. [react/jsx-key](#react/jsx-key)
4. [react/jsx-no-bind](#react/jsx-no-bind)
5. [react/jsx-no-duplicate-props](#react/jsx-no-duplicate-props)
6. [react/jsx-no-undef](#react/jsx-no-undef)
7. [react/jsx-pascal-case](#react/jsx-pascal-case)
8. [react/jsx-uses-react](#react/jsx-uses-react)
9. [react/no-danger](#react/no-danger)
10. [react/no-deprecated](#react/no-deprecated)
11. [react/no-did-update-set-state](#react/no-did-update-set-state)
12. [react/no-will-update-set-state](#react/no-will-update-set-state)
13. [react/no-direct-mutation-state](#react/no-direct-mutation-state)
14. [react/no-is-mounted](#react/no-is-mounted)
15. [react/no-multi-comp](#react/no-multi-comp)
16. [react/no-string-refs](#react/no-string-refs)
17. [react/no-unknown-property](#react/no-unknown-property)
18. [react/prefer-es6-class](#react/prefer-es6-class)
19. [react/prop-types](#react/prop-types)
20. [react/react-in-jsx-scope](#react/react-in-jsx-scope)
21. [react/require-render-return](#react/require-render-return)
22. [react/self-closing-comp](#react/self-closing-comp)
23. [react/sort-comp](#react/sort-comp)
24. [react/jsx-no-target-blank](#react/jsx-no-target-blank)
25. [react/jsx-filename-extension](#react/jsx-filename-extension)
26. [react/jsx-no-comment-textnodes](#react/jsx-no-comment-textnodes)
27. [react/no-render-return-value](#react/no-render-return-value)
28. [react/no-find-dom-node](#react/no-find-dom-node)
29. [react/no-danger-with-children](#react/no-danger-with-children)
30. [react/no-unused-prop-types](#react/no-unused-prop-types)
31. [react/style-prop-object](#react/style-prop-object)
32. [react/no-unescaped-entities](#react/no-unescaped-entities)
33. [react/no-children-prop](#react/no-children-prop)
34. [react/no-array-index-key](#react/no-array-index-key)
35. [react/require-default-props](#react/require-default-props)
36. [react/forbid-foreign-prop-types](#react/forbid-foreign-prop-types)
37. [react/default-props-match-prop-types](#react/default-props-match-prop-types)
38. [react/no-redundant-should-component-update](#react/no-redundant-should-component-update)
39. [react/no-unused-state](#react/no-unused-state)
40. [react/boolean-prop-naming](#react/boolean-prop-naming)
41. [react/no-typos](#react/no-typos)
42. [react/jsx-curly-brace-presence](#react/jsx-curly-brace-presence)
43. [react/destructuring-assignment](#react/destructuring-assignment)
44. [react/no-access-state-in-setstate](#react/no-access-state-in-setstate)
45. [react/button-has-type](#react/button-has-type)
46. [react/no-this-in-sfc](#react/no-this-in-sfc)
47. [react/no-unsafe](#react/no-unsafe)
48. [react/jsx-handler-names](#react/jsx-handler-names)
49. [react/jsx-fragments](#react/jsx-fragments)

<a id='react/forbid-prop-types'></a>
## react/forbid-prop-types

- 规则含义

  propTypes校验禁止使用类型any,array(arrayOf替换),object(shape替换)

- 规则原因

  这三个关键词太笼统，起不到文档或约束作用，没有帮助

## react/jsx-boolean-value<a id='react/jsx-boolean-value'></a>

- 规则含义

  jsx中使用省略写法设置属性为true的值

- 规则原因

  统一规范，更简洁

- 错误例子

      <Modal isShow={true} />

- 正确例子

      <Modal isShow />

## react/jsx-key<a id='react/jsx-key'></a>

- 规则含义

  循环时组件必须设置key属性  
  不允许使用...运算符设置key属性

- 规则原因

  循环时使用key为了提高react性能：再次渲染如果key不变就不会重新渲染  
  不允许使用...设置key，不利于代码可读性

- 错误例子

      [<Hello />, <Hello />, <Hello />];  
      data.map(x => <Hello>{x}</Hello>);  
      <Hello {...{ key: id, id, caption }} />

- 正确例子

      [<Hello key="first" />, <Hello key="second" />, <Hello key="third" />];  
      data.map(x => <Hello key={x.id}>{x.value}</Hello>);  
      <Hello key={id} {...{ id, caption }} />

## react/jsx-no-bind<a id='react/jsx-no-bind'></a>

- 规则含义

  禁止在jsx的属性值中包含bind语法函数或创建箭头函数字面量

- 规则原因

  每次渲染时候，在{}中执行bind或箭头函数时候都会创建一个全新的函数  
  会造成不必要的刷新(这个函数的引用每次都变)，出现性能问题

- 错误例子

      <Foo onClick={this._handleClick.bind(this)}></Foo>  
      <Foo onClick={() => console.log('Hello!')}></Foo>

- 正确例子

      构造函数时候绑定原型方法到对象属性  
      或者使用箭头函数定义：利用箭头函数创建时候绑定this的特性绑定对象  
      constructor() {  
       this.onClick= this.onClick.bind(this);  
      }  
      or  
      onClick = () => {}  
      <Foo onClick={this.onClick}></Foo>

## react/jsx-no-duplicate-props<a id='react/jsx-no-duplicate-props'></a>

- 规则含义

  禁止在jsx的属性中出现重名，大小写不一样的重名也不行

- 规则原因

  组件的props就是一个对象，同名的会覆盖，不同大小写的会认为是不同的

- 错误例子

      <Hello name="John" Name="John" />;

- 正确例子

      <Hello name="John"  />;

## react/jsx-no-undef<a id='react/jsx-no-undef'></a>

- 规则含义

  禁止未定义jsx组件就使用

- 错误例子

      <Hello name="John" />;

- 正确例子

      const Hello = ({name}) => {  
       return <div>{name}</div>  
      }  
      <Hello/>

## react/jsx-pascal-case<a id='react/jsx-pascal-case'></a>

- 规则含义

  强制要求组件以大骆驼形式命名

- 规则原因

  jsx标签第一个字母大写表示这是一个react组件。

## react/jsx-uses-react<a id='react/jsx-uses-react'></a>

- 规则含义

  不使用jsx语法时候不要引用React模块

- 规则原因

  jsx语法会编译成React.createElement，因此jsx代码范围内必须引用React防止  
  执行时候报错

## react/no-danger<a id='react/no-danger'></a>

- 规则含义

  使用dangerouslySetInnerHTML时发出警告

- 规则原因

  react的一大优势就是免去了用户的dom操作，这不仅仅是方便了开发。  
  而且因为react自己实现的dom系统可以提升性能和浏览器兼容性，  
  并且规避了一些特定浏览器或特定情况下的问题(边界条件，安全性问题等)。  
  而dangerouslySetInnerHTML就相当于直接在dom上运行innerHTML，  
  react没有处理输入的字符串，这就有可能造成Xss攻击(字符串中注入JavaScript代码)

## react/no-deprecated<a id='react/no-deprecated'></a>

- 规则含义

  禁止使用已弃用语法

- 规则原因

  弃用语法有的有安全性问题而且以后版本很可能会不支持

## react/no-did-update-set-state<a id='react/no-did-update-set-state'></a>

- 规则含义

  禁止在componentDidUpdate中调用setState

- 规则原因

  这样很可能会导致死循环重复刷新组件

## react/no-will-update-set-state<a id='react/no-will-update-set-state'></a>

- 规则含义

  禁止在willUpdate中使用setState

- 规则原因

  willUpdate官方文档禁止使用setState，并且  
  改语法已经弃用了，并将于react17正式不支持

## react/no-direct-mutation-state<a id='react/no-direct-mutation-state'></a>

- 规则含义

  只允许使用setState改变state，不允许改变state属性或改变索引

- 规则原因

  react的核心思路就是保持一切都是纯的，然后利用持久化数据结构的原理优化性能：  
  当有改变发生需要比较状态的时候，找出树状结构上不变和变化的部分，  
  然后只替换变化的节点和受影响的所有父节点。  
  这个思路体现在每次render后的元素树的比较上，同样体现在state树上。  
  react的state必须保持纯的，因为react会把当前state  
  和上一个状态state做一个浅比较，决定是否render。  
  而且state作为props传到组件的时候，还会再和上一个props进行浅比较决定组件是否刷新  
  如果只是改变属性的话，引用不变不会刷新

## react/no-is-mounted<a id='react/no-is-mounted'></a>

- 规则含义

  禁止使用isMounted

- 规则原因

  react已经弃用这个属性了。  
  很多人这么用isMounted:  
  if (this.isMounted()) {  
   this.setState({...})  
  }  
  来消除警告：组件已经umount但仍然调用setState。  
  这个警告通常表示组件没有卸载干净：卸载后仍然保持对组件的引用，有可能导致内存泄漏。  
  使用isMounted可能会消除警告，但警告的目的是让你发现为什么umount了还会调用setState，从而  
  发现代码潜在的问题。使用isMounted没有了警告，但你也发现不了问题  
  这个警告主要发生在异步回调的时候，你可以通过：在Umount中设置flag，在回调中判断flag来解决。  
  更好的方法是在umount的时候取消数据订阅，或者通过实现promise.cancel方法取消promise

## react/no-multi-comp<a id='react/no-multi-comp'></a>

- 规则含义

  一个文件中只允许出现一个react class组件（函数组件不计算）

- 规则原因

  单一职责原则，功能拆分，更好维护和修改

## react/no-string-refs<a id='react/no-string-refs'></a>

- 规则含义

  禁止使用字符串ref

- 规则原因

  react以前的ref形式，已经废弃  
  现在使用ref搭配一个函数来获取dom引用

- 正确例子

      <div ref={helloDom => { this.helloDom = helloDom; }}>Hello, world.</div>

## react/no-unknown-property<a id='react/no-unknown-property'></a>

- 规则含义

  禁止在原生dom组件中出现非标准（不符合react属性名）的属性

- 规则原因

  具体哪些属性可用见索引

## react/prefer-es6-class<a id='react/prefer-es6-class'></a>

- 规则含义

  禁止使用createReactClass创建组件，使用class

- 规则原因

  用jsx语法，可读性好

## react/prop-types<a id='react/prop-types'></a>

- 规则含义

  强制使用propTypes检查属性

- 规则原因

  使用propTypes校验输入属性可以提高组件可用性，  
  也相当于一个绝佳的文档，方便维护

## react/react-in-jsx-scope<a id='react/react-in-jsx-scope'></a>

- 规则含义

  使用jsx语法一定要引用react

- 规则原因

  jsx编译后就是React.createElement,作用域中必须引用React

## react/require-render-return<a id='react/require-render-return'></a>

- 规则含义

  render方法必须包含return语句

## react/self-closing-comp<a id='react/self-closing-comp'></a>

- 规则含义

  没有子元素的组件强制自闭合标签

- 规则原因

  简洁，统一

- 错误例子

      <Modal></Modal>

- 正确例子

      <Modal />

## react/sort-comp<a id='react/sort-comp'></a>

- 规则含义

  类组件的方法按照  
  1. 静态方法  
  2. 事件循环方法  
  3. 其他方法  
  4. render方法  
  的顺序排列

- 正确例子

      class Ex extends React.Component {  
           static propTypes = {};  
           static defaultProps = {};  
           componentDidmount() {};  
           myFunc() {};  
           render() {}  
      }

## react/jsx-no-target-blank<a id='react/jsx-no-target-blank'></a>

- 规则含义

  使用有target='_blank'属性的a标签时候，必须加上rel='noreferrer noopener'属性

- 规则原因

  安全隐患：钓鱼网站。当使用<a target='_blank'>打开新页面时候，新页面可以通过window.opener  
  获得原页面的window对象,然后黑客可以通过执行window.opener.location  
  改变你原来的网址重定向到一个相似的钓鱼网站窃取你的信息。添加如上的rel属性可以让window.opener为空

## react/jsx-filename-extension<a id='react/jsx-filename-extension'></a>

- 规则含义

  .jsx后缀的文件才可以包含jsx语法

- 规则原因

  可通过文件名快速了解内容

## react/jsx-no-comment-textnodes<a id='react/jsx-no-comment-textnodes'></a>

- 规则含义

  禁止在jsx文本节点中出现注释(行和块注释)

- 规则原因

  防止开发者以为注释了内容，实际没有导致输出错误信息的问题

## react/no-render-return-value<a id='react/no-render-return-value'></a>

- 规则含义

  禁止使用React.render/ReactDOM.render的返回值

- 规则原因

  这个返回值是对根元素的引用，但是以后有可能会使用异步渲染  
  为了防止以后升级版本可能出现的问题，不要用，如果要获取dom，使用ref

- 错误例子

      const inst = ReactDOM.render(<App />, document.body);  
      doSomethingWithInst(inst);

- 正确例子

      ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);

## react/no-find-dom-node<a id='react/no-find-dom-node'></a>

- 规则含义

  禁止使用findDOMNode方法

- 规则原因

  react以后会废弃掉findDOMNode方法

## react/no-danger-with-children<a id='react/no-danger-with-children'></a>

- 规则含义

  禁止使用dangerouslySetInnerHTML的同时还包含children

- 规则原因

  错误语法

## react/no-unused-prop-types<a id='react/no-unused-prop-types'></a>

- 规则含义

  不要定义使用不到的propTypes

- 规则原因

  代码越少越好,代码越多,问题越多

## react/style-prop-object<a id='react/style-prop-object'></a>

- 规则含义

  强制要求style属性的值必须是对象

- 规则原因

  错误语法

## react/no-unescaped-entities<a id='react/no-unescaped-entities'></a>

- 规则含义

  禁止在jsx文本节点中出现没有转义字符： > " ' }

- 规则原因

  这几个字符出现了也没事，react会自动转义。但是大概率这几种字符的出现是由于敲错了，比如：  
  <Component  
    a="b">  
    c="d">  
  >bodytext</Component>  
  因为多敲了一个>，输出错误。这个规则就是让你及早发现错误  
  如果你需要用到这几个字符，使用转义符号或者通过{}输出：  
  > -> &gt;  
  " -> &quot;  
  ' -> &apos;  
  } -> &#125;

- 错误例子

      <div> > </div>

- 正确例子

      <div> &gt; </div>  
      <div> {'>'} </div>

## react/no-children-prop<a id='react/no-children-prop'></a>

- 规则含义

  禁止使用props的children属性传递子元素

- 规则原因

  放到jsx语法里更好理解

- 错误例子

      <Father children={<Child/>} />

- 正确例子

      <Father><Child/></Father>

## react/no-array-index-key<a id='react/no-array-index-key'></a>

- 规则含义

  禁止使用索引作为属性key的值

- 规则原因

  key能告诉react，哪些元素是不变的，哪些元素是变了的从而从新渲染  
  如果使用索引作为key，不能唯一标识元素，有可能的后果就是，内容变了，但是没有重新刷新  
  使用元素内容唯一标识

- 错误例子

      {list.map((item, index) => <div key={index}>{item}</div>)}

- 正确例子

      {list.map((item, index) => <div key={item}>{item}</div>)}

## react/require-default-props<a id='react/require-default-props'></a>

- 规则含义

  强制要求每个非必需props都有一个对应的defaultProps

- 规则原因

  组件可以看成和js的函数一样的东西，输入就是props，输出就是elements  
  一个好的函数应该对每个输入值进行类型检查并设置默认值，运行时候保证  
  各种边界条件可以运行良好。  
  给所有props设置默认值，也能保证props缺失时组件能正常渲染。

## react/forbid-foreign-prop-types<a id='react/forbid-foreign-prop-types'></a>

- 规则含义

  禁止直接引用别的组件的proptypes（可以通过import解构重命名使用）

- 规则原因

  防止生产环境下使用babel插件babel-plugin-transform-react-remove-prop-types  
  去除propTypes时出现问题

- 错误例子

      import SomeComponent from './SomeComponent';  
      SomeComponent.propTypes;  
      var { propTypes } = SomeComponent;  
      SomeComponent['propTypes'];

- 正确例子

      import SomeComponent, {propTypes as someComponentPropTypes} from './SomeComponent';

## react/default-props-match-prop-types<a id='react/default-props-match-prop-types'></a>

- 规则含义

  必填(required)的props不允许出现在defaultProps中  
  没有在propTypes中定义的属性不允许出现在defaultProps中

- 规则原因

  减少冗余

## react/no-redundant-should-component-update<a id='react/no-redundant-should-component-update'></a>

- 规则含义

  PureComponent类型的组件禁止使用shouldComponentUpdate方法

- 规则原因

  PureComponent默认实现了一个shouldComponentUpdate方法(通过对state和props浅比较决定是否渲染)。  
  再定义shouldComponentUpdate仍然会按照你定义的方法来决定是否渲染  
  但这样使用PureComponent就没有意义了

## react/no-unused-state<a id='react/no-unused-state'></a>

- 规则含义

  禁止出现未被使用的state属性

- 规则原因

  减少冗余

## react/boolean-prop-naming<a id='react/boolean-prop-naming'></a>

- 规则含义

  强制布尔值变量命名以is或has开始

- 规则原因

  统一规范,帮助理解变量含义

## react/no-typos<a id='react/no-typos'></a>

- 规则含义

  保证react预留的静态和事件循环方法大小写拼写正确

- 规则原因

  js属性大小写敏感，写错就不执行了

## react/jsx-curly-brace-presence<a id='react/jsx-curly-brace-presence'></a>

- 规则含义

  不允许花括号给字符串属性或文本节点使用

- 规则原因

  减少冗余

- 错误例子

      <Test name={"zcs"}>{"zcs"}</Test>

- 正确例子

      <Test name="zcs">zcs</Test>

## react/destructuring-assignment<a id='react/destructuring-assignment'></a>

- 规则含义

  强制要求使用解构获取所有props属性，再通过变量在render中使用

- 规则原因

  1. 减少this.props字符串的书写  
  2. 减少对this.props的索引搜索

- 错误例子

      render() {  
       <Component name={this.props.name} gender={this.props.gender}/>  
      }

- 正确例子

      render() {  
       const {name, gender} = this.props;  
       <Component name={name} gender={gender}/>  
      }

## react/no-access-state-in-setstate<a id='react/no-access-state-in-setstate'></a>

- 规则含义

  setState方法中禁止使用this.state

- 规则原因

  setState中使用this.state都是为了获取上一次的状态，进行下一次的操作。  
  但setState有可能是异步的，批量的，因此使用this.state不能准确获取上一次的状态数据  
  你可以：  
  1. 要不使用回调函数获取修改后的state  
  2. 要不通过第一个函数参数获取上一次state

- 错误例子

      onClick() {  
         this.setState({  
             num: this.state.num + 1,  
         })  
      }

- 正确例子

      onClick() {  
         this.setState(prevState => {  
             return {  
               num: prevState.num + 1  
             }  
         })  
      }  
      onClick() {  
         this.setState(xx, () => {  
         })  
      }

## react/button-has-type<a id='react/button-has-type'></a>

- 规则含义

  button标签必须设置type属性

- 规则原因

  button的type属性默认值是submit，可能会导致意外现象

## react/no-this-in-sfc<a id='react/no-this-in-sfc'></a>

- 规则含义

  禁止在sfc中出现this指针

- 规则原因

  sfc==stateless function component===无状态组件===函数组件  
  这种组件的this和class组件的不同

## react/no-unsafe<a id='react/no-unsafe'></a>

- 规则含义

  禁止使用Unsafe方法(componentWillMount,componentWillUpdate,componentWillReceiveProps)

- 规则原因

  1. 这些方法将在react17正式不支持。  
  2. 这些方法本身就有潜在的问题。  
      * willMount和willUpdate都是render前要调用的方法，不能调用setState容易出错  
      * componentWillReceiveProps有以下问题：  
        1. 你不能直接把props的值一股脑的设置给state，因为这样会把用户原生操作的状态冲掉  
        2. 当接收新props时，你需要对内容进行判断，决定更新哪个状态。这是很复杂的，随着props的增多很难维护。而且难以把状态复原  
        3. state的来源包括mount时候constructor中的props和willRecive中的判断设置,来源不单一，你可能要写两种情况的代码  
      * 解决方法是：  
        1. 尽量不设置state，所有组件只是用props，state统一管理(redux的做法)  
        2. 使用key关联id，当一个组件的key换了，从新mount，避开willReceiveProps

## react/jsx-handler-names<a id='react/jsx-handler-names'></a>

- 规则含义

  强制要求jsx中onXXX的对应类的方法前缀必须是handleXXX

- 规则原因

  统一规范，增强可读性

## react/jsx-fragments<a id='react/jsx-fragments'></a>

- 规则含义

  强制fragment语法使用简写<></>

- 规则原因

  统一规范，减少冗余

