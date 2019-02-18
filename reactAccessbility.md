# React 可访问性规范

## 目录

1. [jsx-a11y/anchor-has-content](#jsx-a11y/anchor-has-content)
2. [jsx-a11y/aria-role](#jsx-a11y/aria-role)
3. [jsx-a11y/aria-props](#jsx-a11y/aria-props)
4. [jsx-a11y/aria-proptypes](#jsx-a11y/aria-proptypes)
5. [jsx-a11y/aria-unsupported-elements](#jsx-a11y/aria-unsupported-elements)
6. [jsx-a11y/alt-text](#jsx-a11y/alt-text)
7. [jsx-a11y/mouse-events-have-key-events](#jsx-a11y/mouse-events-have-key-events)
8. [jsx-a11y/no-access-key](#jsx-a11y/no-access-key)
9. [jsx-a11y/interactive-supports-focus](#jsx-a11y/interactive-supports-focus)
10. [jsx-a11y/role-has-required-aria-props](#jsx-a11y/role-has-required-aria-props)
11. [jsx-a11y/role-supports-aria-props](#jsx-a11y/role-supports-aria-props)
12. [jsx-a11y/tabindex-no-positive](#jsx-a11y/tabindex-no-positive)
13. [jsx-a11y/heading-has-content](#jsx-a11y/heading-has-content)
14. [jsx-a11y/html-has-lang](#jsx-a11y/html-has-lang)
15. [jsx-a11y/lang](#jsx-a11y/lang)
16. [jsx-a11y/no-distracting-elements](#jsx-a11y/no-distracting-elements)
17. [jsx-a11y/scope](#jsx-a11y/scope)
18. [jsx-a11y/click-events-have-key-events](#jsx-a11y/click-events-have-key-events)
19. [jsx-a11y/no-static-element-interactions](#jsx-a11y/no-static-element-interactions)
20. [jsx-a11y/no-noninteractive-element-interactions](#jsx-a11y/no-noninteractive-element-interactions)
21. [jsx-a11y/accessible-emoji](#jsx-a11y/accessible-emoji)
22. [jsx-a11y/aria-activedescendant-has-tabindex](#jsx-a11y/aria-activedescendant-has-tabindex)
23. [jsx-a11y/iframe-has-title](#jsx-a11y/iframe-has-title)
24. [jsx-a11y/no-autofocus](#jsx-a11y/no-autofocus)
25. [jsx-a11y/no-redundant-roles](#jsx-a11y/no-redundant-roles)
26. [jsx-a11y/media-has-caption](#jsx-a11y/media-has-caption)
27. [jsx-a11y/no-interactive-element-to-noninteractive-role](#jsx-a11y/no-interactive-element-to-noninteractive-role)
28. [jsx-a11y/no-noninteractive-element-to-interactive-role](#jsx-a11y/no-noninteractive-element-to-interactive-role)
29. [jsx-a11y/no-noninteractive-tabindex](#jsx-a11y/no-noninteractive-tabindex)

## jsx-a11y/anchor-has-content

- 规则含义

  a标签必须有子元素 <a>something</a>

- 规则原因

  没有内容的a标签会造成混淆

- 错误例子

      <a></a>

- 正确例子

      <a>Anchor Content!</a>

## jsx-a11y/aria-role

- 规则含义

  要求aria的rule属性必须是有效值

- 规则原因

  aria规范的目的是帮助障碍人士(盲人，聋哑人)更好浏览网页。  
  对于有些元素(比如checkbox),辅助工具（比如屏幕阅读器）默认并不会告诉用户这个元素是个复选框  
  但是通过添加role和aria-*属性，就可以告诉辅助工具这是个复选框来帮助障碍人士。  
  主要三个属性：  
  role属性:元素是什么，能做什么事  
  propery(aria-*等):给这个元素更多的属性让他具有更多的语义  
  state:用于表单元素的特殊状态(比如aria-disable=true)

- 错误例子

      <div role="datepicker"></div> <!-- Bad: "datepicker" is not an ARIA role -->  
      <div role="range"></div>      <!-- Bad: "range" is an _abstract_ ARIA role -->  
      <div role=""></div>           <!-- Bad: An empty ARIA role is not allowed -->  
      <Foo role={role}></Foo>       <!-- Bad: ignoreNonDOM is set to false or not set -->

- 正确例子

      <div role="button"></div>     <!-- Good: "button" is a valid ARIA role -->  
      <div role={role}></div>       <!-- Good: role is a variable & cannot be determined until runtime. -->  
      <div></div>                   <!-- Good: No ARIA role -->  
      <Foo role={role}></Foo>       <!-- Good: ignoreNonDOM is set to true -->

## jsx-a11y/aria-props

- 规则含义

  要求aria-*属性必须是有效值

- 规则原因

  理由同上个规则

## jsx-a11y/aria-proptypes

- 规则含义

  要求aria-*属性必须是有效值

- 规则原因

  理由同上个规则

## jsx-a11y/aria-unsupported-elements

- 规则含义

  不支持aria的标签(比如meta)不允许有相关属性

## jsx-a11y/alt-text

- 规则含义

  强制要求img,object,input[type='image'],area标签必须提供有意义的alt(object设置title属性

- 规则原因

  对于视障人士，只能依赖alt来知道图像是干嘛的。  
  对于正常人士，当图片挂了的时候，也可以通过alt来辅助了解图像含义。  
  对于文字icon

- 错误例子

      <img src="foo" />  
      <img {...props} />  
      <img {...props} alt /> // Has no value  
      <img {...props} alt={undefined} /> // Has no value  
      <img {...props} alt={`${undefined}`} /> // Has no value  
      <img src="foo" role="presentation" /> // Avoid ARIA if it can be achieved without  
      <img src="foo" role="none" /> // Avoid ARIA if it can be achieved without  
      <object {...props} />  
      <area {...props} />  
      <input type="image" {...props} />

- 正确例子

      <img src="foo" alt="Foo eating a sandwich." />  
      <img src="foo" alt={"Foo eating a sandwich."} />  
      <img src="foo" alt={altText} />  
      <img src="foo" alt={`${person} smiling`} />  
      <img src="foo" alt="" />  
      <object aria-label="foo" />  
      <object aria-labelledby="id1" />  
      <object>Meaningful description</object>  
      <object title="An object" />  
      <area aria-label="foo" />  
      <area aria-labelledby="id1" />  
      <area alt="This is descriptive!" />  
      <input type="image" alt="This is descriptive!" />  
      <input type="image" aria-label="foo" />  
      <img src="icon.png" alt="" /> 图标可以省略

## jsx-a11y/mouse-events-have-key-events

- 规则含义

  强制要求绑定了onmouseover/onmouseout事件的jsx，也要绑定onFocuse/onBlur

- 规则原因

  为了让视障不方便使用鼠标的人，只使用键盘的人也能触发功能

- 错误例子

      <div onMouseOver={ () => void 0 } />  
      <div onMouseOut={ () => void 0 } />  
      <div onMouseOver={ () => void 0 } {...otherProps} />  
      <div onMouseOut={ () => void 0 } {...otherProps} />

- 正确例子

      <div onMouseOver={ () => void 0 } onFocus={ () => void 0 } />  
      <div onMouseOut={ () => void 0 } onBlur={ () => void 0 } />  
      <div onMouseOver={ () => void 0 } onFocus={ () => void 0 } {...otherProps} />  
      <div onMouseOut={ () => void 0 } onBlur={ () => void 0 } {...otherProps} />

## jsx-a11y/no-access-key

- 规则含义

  禁止使用accessKey

- 规则原因

  accessKey允许为dom元素绑定键盘快捷键(alt + accessKey的值触发快捷键)  
  但是残障人士使用的辅助工具有自己的快捷键，为了防止冲突或增加复杂性禁止使用accessKey

- 错误例子

      <div accessKey="h" />

- 正确例子

      <div />

## jsx-a11y/interactive-supports-focus

- 规则含义

  可交互元素(role的值为可交互元素或者具有onXX事件函数)必须能够集中焦点(通过设置tabIndex)

- 规则原因

  所有可交互元素必须通过tab键能够访问以帮助使用键盘的视障人士

- 错误例子

      <!-- Bad: span with onClick attribute has no tabindex -->  
      <span onclick="submitForm();" role="button">Submit</span>  
      <!-- Bad: anchor element without href is not focusable -->  
      <a onclick="showNextPage();" role="button">Next page</a>

- 正确例子

      <!-- Good: div with onClick attribute is hidden from screen reader -->  
      <div aria-hidden onClick={() => void 0} />  
      <!-- Good: span with onClick attribute is in the tab order -->  
      <span onClick="doSomething();" tabIndex="0" role="button">Click me!</span>  
      <!-- Good: span with onClick attribute may be focused programmatically -->  
      <span onClick="doSomething();" tabIndex="-1" role="menuitem">Click me too!</span>  
      <!-- Good: anchor element with href is inherently focusable -->  
      <a href="javascript:void(0);" onClick="doSomething();">Click ALL the things!</a>  
      <!-- Good: buttons are inherently focusable -->  
      <button onClick="doSomething();">Click the button :)</button>

## jsx-a11y/role-has-required-aria-props

- 规则含义

  强制要求拥有aria role属性的元素，其role对应的aria元素也必须设置

- 错误例子

      <!-- Bad: the checkbox role requires the aria-checked state -->  
      <span role="checkbox" aria-labelledby="foo" tabindex="0"></span>

- 正确例子

      <!-- Good: the checkbox role requires the aria-checked state -->  
      <span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>

## jsx-a11y/role-supports-aria-props

- 规则含义

  强制要求设置role属性后，设置role支持的正确的aria-*属性

- 错误例子

      <!-- Bad: the radio role does not support the aria-required property -->  
      <ul role="radiogroup" aria-labelledby="foo">  
          <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>  
          <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>  
          <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>  
      </ul>

- 正确例子

      <!-- Good: the radiogroup role does support the aria-required property -->  
      <ul role="radiogroup" aria-required aria-labelledby="foo">  
          <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>  
          <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>  
          <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>  
      </ul>

## jsx-a11y/tabindex-no-positive

- 规则含义

  强制使用<=0的tabIndex值

- 规则原因

  保持使用键盘的tab跳转顺序和html定义顺序一致

## jsx-a11y/heading-has-content

- 规则含义

  强制要求<hX>的内容不为空

- 规则原因

  标题对正常和残障人士一样重要：精心编写和正确排序的<hX>标签可以  
  帮助用户更好了解文章内容，节省用户时间。  
  对于阅读器用户来说，看不到样式，只能通过<hX>标签来确定标题，因此<hX>标签很重要

- 错误例子

      <h1 />  
      <h1><TextWrapper aria-hidden />

- 正确例子

      <h1>Heading Content!</h1>  
      <h1><TextWrapper /><h1>  
      <h1 dangerouslySetInnerHTML={{ __html: 'foo' }} />

## jsx-a11y/html-has-lang

- 规则含义

  html标签必须拥有lang(语言)属性

- 规则原因

  配置屏幕阅读器时，用户选择默认语言。  
  如果未指定网页的语言，则屏幕阅读器将假定它是用户设置的默认语言。  
  对于使用多种语言并使用多种语言访问网站的用户而言，这将成为一个问题。

- 错误例子

      <html>

- 正确例子

      <html lang="en">  
      <html lang="en-US">  
      <html lang={language}>

## jsx-a11y/lang

- 规则含义

  html标签的lang属性必须设置有效的值

- 规则原因

  配置屏幕阅读器时，用户选择默认语言。  
  如果未指定网页的语言，则屏幕阅读器将假定它是用户设置的默认语言。  
  对于使用多种语言并使用多种语言访问网站的用户而言，这将成为一个问题。

- 错误例子

      <html>  
      <html lang="foo">

- 正确例子

      <html lang="en">  
      <html lang="en-US">

## jsx-a11y/no-distracting-elements

- 规则含义

  强制使用不会分散注意力的元素，比如<marquee> and <blink>

- 规则原因

  这些元素代表滚动和闪烁，标签已经启用，而且让人不能正确点击上面的内容

- 错误例子

      <marquee />  
      <blink />

- 正确例子

      <div />

## jsx-a11y/scope

- 规则含义

  只允许th标签拥有scope属性

- 规则原因

  scope标签用在th标签上，用来告诉这个表格头对用的表格数据是行还是列  
  th th th th  
  th td td td  
  th td td td  
  第一行th的scope应该设置col  
  第一列th的scope应该设置row

- 错误例子

      <div scope />

- 正确例子

      <th scope="col" />  
      <th scope={scope} />

## jsx-a11y/click-events-have-key-events

- 规则含义

  强制要求有onClick事件的元素，必须也有相同功能的一个键盘元素(onKeyUp/onKeyDown/onKeyPress)

- 规则原因

  方便看不见的视力障碍人士使用键盘阅读

- 错误例子

      <div onClick={() => {}} />

- 正确例子

      <div onClick={() => {}} onKeyDown={this.handleKeyDown} />  
      <div onClick={() => {}} onKeyUp={this.handleKeyUp} />  
      <div onClick={() => {}} onKeyPress={this.handleKeyPress} />

## jsx-a11y/no-static-element-interactions

- 规则含义

  强制要求有交互操作的静态标签设置role属性

- 规则原因

  在设置了交互操作(onClick,onKeyXX等)的情况下，  
  静态标签(也称为无语义标签,如div，span等)所表达的语义有变化，  
  因为它可以操作，但是残障人士通过屏幕阅读器并不能知道这个标签可以操作，  
  因此需要设置对应的role属性来帮助视障用户理解这个标签是什么、能做什么事  
  可以设置的role包含两种：  
  1. 包含交互含义(button,link,checkbox等)  
  2. 作为事件冒泡的接收者不作处理(presentation)

- 错误例子

      <div onClick={() => {}} />

- 正确例子

      <div  
       onClick={this.handleButtonClick}  
       role="presentation"  
      >  
           <button>Save</button>  
           <button>Cancel</button>  
      </div>  
      <button onClick={() => {}} className="foo" />  
      <div className="foo" onClick={() => {}} role="button" />  
      <input type="text" onClick={() => {}} />

## jsx-a11y/no-noninteractive-element-interactions

- 规则含义

  强制要求非交互语义标签(main,hX,ul,ol,liarea)不包含交互事件(onClick等)

- 规则原因

  保持标签语义和表现一致性。  
  非交互语义标签的目的是展示内容或者作为容器，如果加上onXX事件，标签就可操作了，但残障用户  
  并不了解，因此这种要不就使用语义标签button等，要不就在标签内再嵌套一层，区分展示和交互：  
  比如:<h1><button onClick={}>标题</button></h1>

- 错误例子

      <h1 onClick={() => {}}>标题</h1>

- 正确例子

      <h1>标题</h1>、  
      <h1><button onClick={() => {}}>标题</button></h1>、

## jsx-a11y/accessible-emoji

- 规则含义

  保证emoji符号可访问

- 规则原因

  通过给emoji包装标签，并设置包装标签正确的role和aria属性，让视障人士可以正确了解emoji的含义

- 错误例子

      <span>🐼</span>  
      <i role="img" aria-label="Panda">🐼</i>

- 正确例子

      <span role="img" aria-label="Snowman">&#9731;</span>  
      <span role="img" aria-label="Panda">🐼</span>  
      <span role="img" aria-labelledby="panda1">🐼</span>

## jsx-a11y/aria-activedescendant-has-tabindex

- 规则含义

  强制要求拥有aria-activedescendant属性的元素设置tabIndex值

- 规则原因

  aria-activedescendant的值是id，拥有aria-activedescendant属性的元素获得焦点后，  
  其子元素拥有对应id的元素会第二个获得焦点。相当于父元素获得焦点后，哪个子元素会第一个获得焦点

- 错误例子

      <div aria-activedescendant={someID} />  
      <div aria-activedescendant={someID} tabIndex={-1} />

- 正确例子

      <div aria-activedescendant={someID} tabIndex={0} />

## jsx-a11y/iframe-has-title

- 规则含义

  iframe标签必须拥有唯一的title属性

- 规则原因

  标题的作用是快速帮助用户理解元素内容。对于视障用户来说，给iframe设置title  
  可以让他们迅速理解含义

- 错误例子

      <iframe />  
      <iframe title=''/>

- 正确例子

      <iframe title="This is a unique title" />  
      <iframe title={uniqueTitle} />

## jsx-a11y/no-autofocus

- 规则含义

  禁止使用autoFocuse属性

- 规则原因

  autoFocus会降低所有用户的可用性和可访问性。  
  对于正常人，强制跳转到一个位置是不愉快的体验。对于视障用户，  
  autoFocus可能会改变辅助设备的默认行为

- 错误例子

      <div autoFocus />  
      <div autoFocus="true" />  
      <div autoFocus="false" />  
      <div autoFocus={undefined} />

- 正确例子

      <div />

## jsx-a11y/no-redundant-roles

- 规则含义

  禁止使用冗余role属性

- 规则原因

  一些html标签本身是语义化的，拥有默认的role和aria属性  
  如果设置的role和默认一致，就没必要了

- 错误例子

      <button role="button" />  
      <img role="img" src="foo.jpg" />

- 正确例子

      <div />  
      <button role="presentation" />  
      <MyComponent role="main" />

## jsx-a11y/media-has-caption

- 规则含义

  强制要求video和audio包含字幕(<track kind='captions' src='xxx'/>)

- 规则原因

  对于聋哑人士，字幕是必须的。  
  对于正常人，字幕可以在视频不能播放时候提供辅助功能(类似于图片不能播放时候的alt标签)

- 错误例子

      <audio/>  
      <video/>

- 正确例子

      <audio><track kind="captions" {...props} /></audio>  
      <video><track kind="captions" {...props} /></video>

## jsx-a11y/no-interactive-element-to-noninteractive-role

- 规则含义

  禁止给可交互元素(button,a,input,select..)设置非交互role(main,area,hX,img..)

- 规则原因

  可交互元素的语义就是可控制、可操作，非交互元素的语义就是容器、内容展示。  
  这样会导致语义的歧义，也会让视障人士混淆这个元素的本来含义

- 错误例子

      <button role='article></button>

- 正确例子

      <button></button>

## jsx-a11y/no-noninteractive-element-to-interactive-role

- 规则含义

  禁止给非交互元素(ul,ol,li,hX,artilce)设置可交互role属性(button,a)

- 规则原因

  语义一致，防止视障人士混淆

- 错误例子

      <article role='button'></article>

- 正确例子

      <article ></article>

## jsx-a11y/no-noninteractive-tabindex

- 规则含义

  禁止给非交互元素设置tabIndex属性

- 规则原因

  tab快捷键应该只针对页面上的可操作元素，应该尽量尝试减少tab的可导航数量

- 错误例子

      <h1 tabIndex={0}>标题</h1>

- 正确例子

      <h1>标题</h1>

