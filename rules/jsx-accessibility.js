// 基于react-a11y插件,致力于提高系统可访问性
// 帮助失明及聋哑人士
module.exports = {
  plugins: ['jsx-a11y', 'react'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    /**
     * @meaning
     * a标签必须有子元素 <a>something</a>
     * @why
     * 没有内容的a标签会造成混淆
     * @wrong
     * <a></a>
     * @right
     * <a>Anchor Content!</a>
     */
    'jsx-a11y/anchor-has-content': ['error', { components: [] }],

    /**
     * @meaning
     * 要求aria的rule属性必须是有效值
     * @why
     * aria规范的目的是帮助障碍人士(盲人,聋哑人)更好浏览网页.
     * 对于有些元素(比如checkbox),辅助工具(比如屏幕阅读器)默认并不会告诉用户这个元素是个复选框
     * 但是通过添加role和aria-*属性,就可以告诉辅助工具这是个复选框来帮助障碍人士.
     * 主要三个属性：
     * role属性:元素是什么,能做什么事
     * propery(aria-*等):给这个元素更多的属性让他具有更多的语义
     * state:用于表单元素的特殊状态(比如aria-disable=true)
     * @wrong
     * <div role="datepicker"></div> <!-- Bad: "datepicker" is not an ARIA role -->
     * <div role="range"></div>      <!-- Bad: "range" is an _abstract_ ARIA role -->
     * <div role=""></div>           <!-- Bad: An empty ARIA role is not allowed -->
     * <Foo role={role}></Foo>       <!-- Bad: ignoreNonDOM is set to false or not set -->
     * @right
     * <div role="button"></div>     <!-- Good: "button" is a valid ARIA role -->
     * <div role={role}></div>       <!-- Good: role is a variable & cannot be determined until runtime. -->
     * <div></div>                   <!-- Good: No ARIA role -->
     * <Foo role={role}></Foo>       <!-- Good: ignoreNonDOM is set to true -->
     */
    'jsx-a11y/aria-role': ['error', { ignoreNonDom: false }],

    /**
     * @meaning
     * 要求aria-*属性必须是有效值
     * @why
     * 理由同上个规则
     * @wrong
     * @right
     */
    'jsx-a11y/aria-props': 'error',

    /**
     * @meaning
     * 要求aria-*属性必须是有效值
     * @why
     * 理由同上个规则
     * @wrong
     * @right
     */
    'jsx-a11y/aria-proptypes': 'error',

    /**
     * @meaning
     * 不支持aria的标签(比如meta)不允许有相关属性
     * @why
     * @wrong
     * @right
     */
    'jsx-a11y/aria-unsupported-elements': 'error',

    /**
     * @meaning
     * 强制要求img,object,input[type='image'],area标签必须提供有意义的alt(object设置title属性
     * @why
     * 对于视障人士,只能依赖alt来知道图像是干嘛的.
     * 对于正常人士,当图片挂了的时候,也可以通过alt来辅助了解图像含义.
     * 对于文字icon
     * @wrong
     * <img src="foo" />
     * <img {...props} />
     * <img {...props} alt /> // Has no value
     * <img {...props} alt={undefined} /> // Has no value
     * <img {...props} alt={`${undefined}`} /> // Has no value
     * <img src="foo" role="presentation" /> // Avoid ARIA if it can be achieved without
     * <img src="foo" role="none" /> // Avoid ARIA if it can be achieved without
     *
     * <object {...props} />
     *
     * <area {...props} />
     *
     * <input type="image" {...props} />
     * @right
     * <img src="foo" alt="Foo eating a sandwich." />
     * <img src="foo" alt={"Foo eating a sandwich."} />
     * <img src="foo" alt={altText} />
     * <img src="foo" alt={`${person} smiling`} />
     * <img src="foo" alt="" />
     *
     * <object aria-label="foo" />
     * <object aria-labelledby="id1" />
     * <object>Meaningful description</object>
     * <object title="An object" />
     *
     * <area aria-label="foo" />
     * <area aria-labelledby="id1" />
     * <area alt="This is descriptive!" />
     *
     * <input type="image" alt="This is descriptive!" />
     * <input type="image" aria-label="foo" />
     * <img src="icon.png" alt="" /> 图标可以省略
     */
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: [],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],

    /**
     * @meaning
     * img alt属性中禁止出现冗余的描述字符串,比如imgae photo picture
     * @why
     * 不要添加冗余的上下文名称：如果标签,类,对象已经描述了是什么东西,不要再重复它,
     * 比如
     * class Car {
     *  carColor = 'red'
     * }
     * <img src='womenImage' />
     * 通过类名和img标签,已经知道是车,图片了,不要再在变量命名中额外添加Car和img等描述
     * @wrong
     * <img src="foo" alt="Photo of foo being weird." />
     * <img src="bar" alt="Image of me at a bar!" />
     * <img src="baz" alt="Picture of baz fixing a bug." />
     * @right
     *<img src="foo" alt="Foo eating a sandwich." />
     *<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" /> // Will pass because it is hidden.
     *<img src="baz" alt={`Baz taking a ${photo}`} /> // This is valid since photo is a variable name.
     */
    'jsx-a11y/img-redundant-alt': 'error',

    /**
     * @meaning
     * 强制要求label标签有文本表示,并且绑定点击跳转机制
     * @why
     * html语义化,label标签就是用来对特定元素进行关联的,如果用label,就要绑定跳转关系,
     * 否则不要用.
     * 有两种方式实现label的跳转：
     * 1. label标签内直接嵌入需要绑定的tag,自动实现点击文本跳转
     *   `<label>姓名：<input type='text' /></label>`
     * 2. 使用jsx的htmlFor绑定id
     *   `<label htmlFor={domId}>Surname</label>`
     *   `<input type="text" id={domId} />`
     * 如何生成for的id？
     * 对于单页应用,页面上的id必须是唯一的：防止错误的label导向,并使组件可以复用
     * 通过js生成元素的id要注意的是：
     *     - 最好不要在浏览器端产生id,这样server 渲染和client渲染时候会出现不一致的id
     *     - 如果一定要浏览器生成id,保证生成唯一uuid,而不是渲染时候的不重复id.
     * 如果你的id生成器是数字自增这种形式,而且id保存在cookie中.那么有可能生成的id会和下次
     * 刷新页面产生的id重复产生错误.
     * @wrong
     * @right
     */
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        // 检查使用label嵌套还是使用htmlFor方式绑定label跳转
        assert: 'both',
        // 需要进行检查的jsx嵌套层级
        depth: 25,
      },
    ],

    /**
     * @meaning
     * 强制要求绑定了onmouseover/onmouseout事件的jsx,也要绑定onFocuse/onBlur
     * @why
     * 为了让视障不方便使用鼠标的人,只使用键盘的人也能触发功能
     * @wrong
     * <div onMouseOver={ () => void 0 } />
     * <div onMouseOut={ () => void 0 } />
     * <div onMouseOver={ () => void 0 } {...otherProps} />
     * <div onMouseOut={ () => void 0 } {...otherProps} />
     * @right
     * <div onMouseOver={ () => void 0 } onFocus={ () => void 0 } />
     * <div onMouseOut={ () => void 0 } onBlur={ () => void 0 } />
     * <div onMouseOver={ () => void 0 } onFocus={ () => void 0 } {...otherProps} />
     * <div onMouseOut={ () => void 0 } onBlur={ () => void 0 } {...otherProps} />
     */
    'jsx-a11y/mouse-events-have-key-events': 'error',

    /**
     * @meaning
     * 禁止使用accessKey
     * @why
     * accessKey允许为dom元素绑定键盘快捷键(alt + accessKey的值触发快捷键)
     * 但是残障人士使用的辅助工具有自己的快捷键,为了防止冲突或增加复杂性禁止使用accessKey
     * @wrong
     * <div accessKey="h" />
     * @right
     * <div />
     */
    'jsx-a11y/no-access-key': 'error',

    /**
     * @meaning
     * 可交互元素(role的值为可交互元素或者具有onXX事件函数)必须能够集中焦点(通过设置tabIndex)
     * @why
     * 所有可交互元素必须通过tab键能够访问以帮助使用键盘的视障人士
     * @wrong
     * <!-- Bad: span with onClick attribute has no tabindex -->
     * <span onclick="submitForm();" role="button">Submit</span>
     * <!-- Bad: anchor element without href is not focusable -->
     * <a onclick="showNextPage();" role="button">Next page</a>
     * @right
     * <!-- Good: div with onClick attribute is hidden from screen reader -->
     * <div aria-hidden onClick={() => void 0} />
     * <!-- Good: span with onClick attribute is in the tab order -->
     * <span onClick="doSomething();" tabIndex="0" role="button">Click me!</span>
     * <!-- Good: span with onClick attribute may be focused programmatically -->
     * <span onClick="doSomething();" tabIndex="-1" role="menuitem">Click me too!</span>
     * <!-- Good: anchor element with href is inherently focusable -->
     * <a href="javascript:void(0);" onClick="doSomething();">Click ALL the things!</a>
     * <!-- Good: buttons are inherently focusable -->
     * <button onClick="doSomething();">Click the button :)</button>
     */
    'jsx-a11y/interactive-supports-focus': 'error',

    /**
     * @meaning
     * 强制要求拥有aria role属性的元素,其role对应的aria元素也必须设置
     * @why
     * @wrong
     * <!-- Bad: the checkbox role requires the aria-checked state -->
     * <span role="checkbox" aria-labelledby="foo" tabindex="0"></span>
     * @right
     * <!-- Good: the checkbox role requires the aria-checked state -->
     * <span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>
     */
    'jsx-a11y/role-has-required-aria-props': 'error',

    /**
     * @meaning
     * 强制要求设置role属性后,设置role支持的正确的aria-*属性
     * @why
     * @wrong
     * <!-- Bad: the radio role does not support the aria-required property -->
     * <ul role="radiogroup" aria-labelledby="foo">
     *     <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
     *     <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
     *     <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
     * </ul>
     * @right
     * <!-- Good: the radiogroup role does support the aria-required property -->
     * <ul role="radiogroup" aria-required aria-labelledby="foo">
     *     <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
     *     <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
     *     <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
     * </ul>
     */
    'jsx-a11y/role-supports-aria-props': 'error',

    /**
     * @meaning
     * 强制使用<=0的tabIndex值
     * @why
     * 保持使用键盘的tab跳转顺序和html定义顺序一致
     * @wrong
     * @right
     */
    'jsx-a11y/tabindex-no-positive': 'error',

    /**
     * @meaning
     * 强制要求<hX>的内容不为空
     * @why
     * 标题对正常和残障人士一样重要：精心编写和正确排序的<hX>标签可以
     * 帮助用户更好了解文章内容,节省用户时间.
     * 对于阅读器用户来说,看不到样式,只能通过<hX>标签来确定标题,因此<hX>标签很重要
     * @wrong
     * <h1 />
     * <h1><TextWrapper aria-hidden />
     * @right
     * <h1>Heading Content!</h1>
     * <h1><TextWrapper /><h1>
     * <h1 dangerouslySetInnerHTML={{ __html: 'foo' }} />
     */
    'jsx-a11y/heading-has-content': ['error', { components: [''] }],

    /**
     * @meaning
     * html标签必须拥有lang(语言)属性
     * @why
     * 配置屏幕阅读器时,用户选择默认语言.
     * 如果未指定网页的语言,则屏幕阅读器将假定它是用户设置的默认语言.
     * 对于使用多种语言并使用多种语言访问网站的用户而言,这将成为一个问题.
     * @wrong
     * <html>
     * @right
     * <html lang="en">
     * <html lang="en-US">
     * <html lang={language}>
     */
    'jsx-a11y/html-has-lang': 'error',

    /**
     * @meaning
     * html标签的lang属性必须设置有效的值
     * @why
     * 配置屏幕阅读器时,用户选择默认语言.
     * 如果未指定网页的语言,则屏幕阅读器将假定它是用户设置的默认语言.
     * 对于使用多种语言并使用多种语言访问网站的用户而言,这将成为一个问题.
     * @wrong
     * <html>
     * <html lang="foo">
     * @right
     * <html lang="en">
     * <html lang="en-US">
     */
    'jsx-a11y/lang': 'error',

    /**
     * @meaning
     * 强制使用不会分散注意力的元素,比如<marquee> and <blink>
     * @why
     * 这些元素代表滚动和闪烁,标签已经启用,而且让人不能正确点击上面的内容
     * @wrong
     * <marquee />
     * <blink />
     * @right
     * <div />
     */
    'jsx-a11y/no-distracting-elements': [
      'error',
      {
        elements: ['marquee', 'blink'],
      },
    ],

    /**
     * @meaning
     * 只允许th标签拥有scope属性
     * @why
     * scope标签用在th标签上,用来告诉这个表格头对用的表格数据是行还是列
     * th th th th
     * th td td td
     * th td td td
     * 第一行th的scope应该设置col
     * 第一列th的scope应该设置row
     * @wrong
     * <div scope />
     * @right
     * <th scope="col" />
     * <th scope={scope} />
     */
    'jsx-a11y/scope': 'error',

    /**
     * @meaning
     * 强制要求有onClick事件的元素,必须也有相同功能的一个键盘元素(onKeyUp/onKeyDown/onKeyPress)
     * @why
     * 方便看不见的视力障碍人士使用键盘阅读
     * @wrong
     * <div onClick={() => {}} />
     * @right
     * <div onClick={() => {}} onKeyDown={this.handleKeyDown} />
     * <div onClick={() => {}} onKeyUp={this.handleKeyUp} />
     * <div onClick={() => {}} onKeyPress={this.handleKeyPress} />
     */
    'jsx-a11y/click-events-have-key-events': 'error',

    /**
     * @meaning
     * 强制要求有交互操作的静态标签设置role属性
     * @why
     * 在设置了交互操作(onClick,onKeyXX等)的情况下,
     * 静态标签(也称为无语义标签,如div,span等)所表达的语义有变化,
     * 因为它可以操作,但是残障人士通过屏幕阅读器并不能知道这个标签可以操作,
     * 因此需要设置对应的role属性来帮助视障用户理解这个标签是什么、能做什么事
     * 可以设置的role包含两种：
     * 1. 包含交互含义(button,link,checkbox等)
     * 2. 作为事件冒泡的接收者不作处理(presentation)
     * @wrong
     * <div onClick={() => {}} />
     * @right
     * <div
     *  onClick={this.handleButtonClick}
     *  role="presentation"
     * >
     *      <button>Save</button>
     *      <button>Cancel</button>
     * </div>
     * <button onClick={() => {}} className="foo" />
     * <div className="foo" onClick={() => {}} role="button" />
     * <input type="text" onClick={() => {}} />
     */
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],

    /**
     * @meaning
     * 强制要求非交互语义标签(main,hX,ul,ol,liarea)不包含交互事件(onClick等)
     * @why
     * 保持标签语义和表现一致性.
     * 非交互语义标签的目的是展示内容或者作为容器,如果加上onXX事件,标签就可操作了,但残障用户
     * 并不了解,因此这种要不就使用语义标签button等,要不就在标签内再嵌套一层,区分展示和交互：
     * 比如:<h1><button onClick={}>标题</button></h1>
     * @wrong
     * <h1 onClick={() => {}}>标题</h1>
     * @right
     * <h1>标题</h1>、
     * <h1><button onClick={() => {}}>标题</button></h1>、
     */
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],

    /**
     * @meaning
     * 强制要求拥有aria-activedescendant属性的元素设置tabIndex值
     * @why
     * aria-activedescendant的值是id,拥有aria-activedescendant属性的元素获得焦点后,
     * 其子元素拥有对应id的元素会第二个获得焦点.相当于父元素获得焦点后,哪个子元素会第一个获得焦点
     * @wrong
     * <div aria-activedescendant={someID} />
     * <div aria-activedescendant={someID} tabIndex={-1} />
     * @right
     * <div aria-activedescendant={someID} tabIndex={0} />
     */
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

    /**
     * @meaning
     * iframe标签必须拥有唯一的title属性
     * @why
     * 标题的作用是快速帮助用户理解元素内容.对于视障用户来说,给iframe设置title
     * 可以让他们迅速理解含义
     * @wrong
     * <iframe />
     * <iframe title=''/>
     * @right
     * <iframe title="This is a unique title" />
     * <iframe title={uniqueTitle} />
     */
    'jsx-a11y/iframe-has-title': 'error',

    /**
     * @meaning
     * 禁止使用autoFocuse属性
     * @why
     * autoFocus会降低所有用户的可用性和可访问性.
     * 对于正常人,强制跳转到一个位置是不愉快的体验.对于视障用户,
     * autoFocus可能会改变辅助设备的默认行为
     * @wrong
     * <div autoFocus />
     * <div autoFocus="true" />
     * <div autoFocus="false" />
     * <div autoFocus={undefined} />
     * @right
     * <div />
     */
    'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],

    /**
     * @meaning
     * 禁止使用冗余role属性
     * @why
     * 一些html标签本身是语义化的,拥有默认的role和aria属性
     * 如果设置的role和默认一致,就没必要了
     * @wrong
     * <button role="button" />
     * <img role="img" src="foo.jpg" />
     * @right
     * <div />
     * <button role="presentation" />
     * <MyComponent role="main" />
     */
    'jsx-a11y/no-redundant-roles': 'error',

    /**
     * @meaning
     * 强制要求video和audio包含字幕(<track kind='captions' src='xxx'/>)
     * @why
     * 对于聋哑人士,字幕是必须的.
     * 对于正常人,字幕可以在视频不能播放时候提供辅助功能(类似于图片不能播放时候的alt标签)
     * @wrong
     * <audio/>
     * <video/>
     * @right
     * <audio><track kind="captions" {...props} /></audio>
     * <video><track kind="captions" {...props} /></video>
     */
    'jsx-a11y/media-has-caption': [
      'error',
      {
        audio: [],
        video: [],
        track: [],
      },
    ],

    /**
     * @meaning
     * 禁止给可交互元素(button,a,input,select..)设置非交互role(main,area,hX,img..)
     * @why
     * 可交互元素的语义就是可控制、可操作,非交互元素的语义就是容器、内容展示.
     * 这样会导致语义的歧义,也会让视障人士混淆这个元素的本来含义
     * @wrong
     * <button role='article></button>
     * @right
     * <button></button>
     */
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
      },
    ],

    /**
     * @meaning
     * 禁止给非交互元素(ul,ol,li,hX,artilce)设置可交互role属性(button,a)
     * @why
     * 语义一致,防止视障人士混淆
     * @wrong
     * <article role='button'></article>
     * @right
     * <article ></article>
     */
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: [
          'listbox',
          'menu',
          'menubar',
          'radiogroup',
          'tablist',
          'tree',
          'treegrid',
        ],
        ol: [
          'listbox',
          'menu',
          'menubar',
          'radiogroup',
          'tablist',
          'tree',
          'treegrid',
        ],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
      },
    ],

    /**
     * @meaning
     * 禁止给非交互元素设置tabIndex属性
     * @why
     * tab快捷键应该只针对页面上的可操作元素,应该尽量尝试减少tab的可导航数量
     * @wrong
     * <h1 tabIndex={0}>标题</h1>
     * @right
     * <h1>标题</h1>
     */
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: [],
        roles: ['tabpanel'],
      },
    ],

    /**
     * @meaning
     * 设置正确的a标签：a必须带着正确的href,用来作为导航功能
     * @why
     * 对于绝大多数人和视障辅助设备来说,a标签就只有导航的含义.
     * 因此不要用a标签作为其他的功能.
     * 和button的区别
     * 1. button可以通过space和enter触发
     * 2. a只能通过enter触发
     * 如何用a标签
     * 1. a标签必须带href,只用来导航,无交互操作
     * 2. 如果有交互,使用button或其他标签
     * 3. 如果要滚动条到顶部,使用<a href='#top'>top是浏览器都知道的默认锚点,自动定位到顶部
     * 保证语义一致.
     * @wrong
     * 下面的应该换成button
     * <a onClick={foo} />
     * <a href="#" onClick={foo} />
     * <a href={"#"} onClick={foo} />
     * <a href={`#`} onClick={foo} />
     * <a href="javascript:void(0)" onClick={foo} />
     * <a href={"javascript:void(0)"} onClick={foo} />
     * <a href={`javascript:void(0)`} onClick={foo} />
     * 缺少href属性
     * <a />
     * <a href={undefined} />
     * <a href={null} />
     * 无效href属性
     * <a href="#" />
     * <a href={"#"} />
     * <a href={`#`} />
     * <a href="javascript:void(0)" />
     * <a href={"javascript:void(0)"} />
     * <a href={`javascript:void(0)`} />
     * @right
     * <a href="https://github.com" />
     * <a href="#section" />
     * <a href="foo" />
     * <a href="/foo/bar" />
     * <a href={someValidPath} />
     * <a href="https://github.com" onClick={foo} />
     * <a href="#section" onClick={foo} />
     * <a href="foo" onClick={foo} />
     * <a href="/foo/bar" onClick={foo} />
     * <a href={someValidPath} onClick={foo} />
     *
     */
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/autocomplete-valid': [
      'warn',
      {
        inputComponents: ['Input', 'FormField'],
      },
    ],
  },
};
