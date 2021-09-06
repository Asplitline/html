# 组件概述

所有组件与属性名都是小写，单词之间以连字符`-`连接。

```vue
<component-name property1="value" property2="value">
    content
</component-name>
```

> 每个`vue`文件的根节点必须为 `<template>`，且这个 `<template>` 下只能且必须有一个根 `<view>` 组件

## 组件属性类型

| 类型           | 注解                                                         |
| :------------- | :----------------------------------------------------------- |
| `Boolean`      | 组件写该属性，其值都为 `true`，只有组件上没有写该属性时，属性值才为 `false`。如果属性值为变量，变量的值会被转换为 `Boolean` 类型。 |
| `Number`       | 1, 2.5                                                       |
| `String`       | "string"                                                     |
| `Array`        | [ 1, "string" ]                                              |
| `Object`       | { key: value }                                               |
| `EventHandler` | `handlerName` 是 methods 中定义的事件处理函数名              |
| `Any`          |                                                              |

## 公共属性列表

| 属性名   | 类型         | 描述            | 注解                               |
| :------- | :----------- | :-------------- | :--------------------------------- |
| id       | String       | 组件的唯一标示  | 一般用于获取组件上下文对象         |
| `ref`    | String       | vue组件唯一标示 | 用来给子组件注册引用信息           |
| class    | String       | 组件的样式类    | 在对应的 css 中定义的样式类        |
| style    | String       | 组件的内联样式  | 可以动态设置的内联样式             |
| `hidden` | Boolean      | 组件是否隐藏    | 所有组件默认是显示的               |
| `data-*` | Any          | 自定义属性      | 组件触发事件，会发送给事件处理函数 |
| `@*`     | EventHandler | 组件的事件      | 详见各组件详细文档，事件绑定参考   |

# 基础组件

无需将内置组件的文件导入项目，也无需注册内置组件，可以直接使用。

## 视图容器

| 组件名                                                       | 说明                                       |
| :----------------------------------------------------------- | :----------------------------------------- |
| view                                                         | 类似div                                    |
| [scroll-view](https://uniapp.dcloud.io/component/scroll-view) | 可**滚动**视图容器                         |
| [swiper](https://uniapp.dcloud.io/component/swiper)          | **滑块**视图容器，比如用于**轮播`banner`** |
| [match-media](https://uniapp.dcloud.io/component/match-media) | 屏幕**动态适配**组件（*媒体查询*）         |
| [movable-area](https://uniapp.dcloud.io/component/movable-view?id=movable-area) | **可拖动区域**                             |
| [movable-view](https://uniapp.dcloud.io/component/movable-view?id=movable-view) | **可移动视图容器**                         |
| [cover-view](https://uniapp.dcloud.io/component/cover-view?id=cover-view) | **可覆盖在原生组件**的上的**文本**组件     |
| [cover-image](https://uniapp.dcloud.io/component/cover-view?id=cover-image) | **可覆盖在原生组件**的上的**图片**组件     |

### view

| 属性名                   | 类型    | 默认值 | 说明                                                         |
| :----------------------- | :------ | :----- | :----------------------------------------------------------- |
| `hover-class`            | String  | none   | 指定**按下去样式类**。当 hover-class="none" 时，没有点击态效果 |
| `hover-stop-propagation` | Boolean | false  | 指定是否阻止本节点祖先节点出现点击态（**阻止冒泡**）         |
| `hover-start-time`       | Number  | 50     | 按住后**多久出现点击态**（`ms`）                             |
| `hover-stay-time`        | Number  | 400    | 手指松开后**点击态保留时间**（`ms`）                         |

> 使用 `<div>` ，编译时会被转换为 `<view>`

### scroll-view

用于区域**滚动**

- 竖向滚动，需要给 `<scroll-view>` 一个固定高度，通过 `css` 设置 height。

> 在`webview`渲染的页面中，**区域滚动**的性能不及**页面滚动**

- `scroll-view` 不适合放长列表，有性能问题。
  - 长列表滚动和下拉刷新，应使用*原生导航栏搭配页面级滚动和下拉刷新实现*。
  - 在`app-nvue`页面，长列表应该使用`list`而不是`scroll-view`
- `scroll-into-view` 的优先级高于 `scroll-top`
- `scroll-view`是区域滚动，不会触发页面滚动，无法触发`pages.json`配置的下拉刷新、页面触底`onReachBottomDistance`、`titleNView`的`transparent`透明渐变
- 使用下拉刷新，建议使用页面的滚动，而不是 scroll-view 。推荐使用基于`wxs`的下拉刷新，性能会比基于`js`监听方式更高。
- `scroll-view`的滚动条设置，可通过css的`-webkit-scrollbar`自定义。（app-nvue无此css）

### swiper

滑块视图容器。左右**滑动**或上下**滑动**，比如`banner`轮播图

- 其中只可放置 `<swiper-item>` 组件

#### swiper-item

仅可放置在 `<swiper>` 组件中，宽高自动设置为*100%*（相对其父组件）。

### moveable-area

**可拖动区域**

app和小程序的架构是**逻辑层与视图层**分离，使用`js`监听拖动时会引发逻辑层和视图层的频繁通讯，影响性能，特封装了`movable-area`组件。

`movable-area`指代**可拖动的范围**，在其中内嵌`movable-view`组件用于**指示可拖动的区域**

### moveable-view

**可移动视图**，在页面中可以**拖拽滑动**或**双指缩放**。

`movable-view`必须在`movable-area`组件中，并且必须是**直接子节点**，**否则不能移动**

*Tips*

- `movable-view` 必须设置`width`和`height`属性，不设置默认为*10px*
- `movable-view` 默认为**绝对定位**，`top`和`left`为0px
- `movable-view`小于`movable-area`，movable-view的移动范围是在movable-area内
- `movable-view`大于`movable-area`，movable-view的移动范围必须包含movable-area（x轴方向和y轴方向分开考虑）

### cover-view

覆盖在原生组件上的文本视图。

*事件*：`click`

*属性*：`scroll-top`：设置**顶部滚动偏移量**，仅在设置了 `overflow-y: scroll` 成为滚动元素后生效

> 为了优化体验，部分组件如map、video、textarea、canvas通过原生控件实现，**原生组件层级高于前端组件**

*Tips*

- `app-nvue`：所有组件**均为原生渲染**，不存在前端组件无法覆盖原生组件的问题。但为了保持多端兼容，nvue里也实现了`cover-view`，作用于普通`view`一样。
- 微信小程序：部分原生组件实现了同层渲染[详见](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)

  

### cover-image

覆盖在原生组件上的**图片**视图。可覆盖的原生组件同`cover-view`，支持嵌套在`cover-view`里。

> `app-vue`上可覆盖的原生组件：`<video>`、`<map>`

*事件*：`click`

*属性*

| 属性名   | 类型        | 说明                                                   |
| :------- | :---------- | :----------------------------------------------------- |
| src      | String      | 图标路径。支持本地路径、网络路径。不支持 base64 格式。 |
| `@load`  | eventhandle | 图片加载*成功*时触发                                   |
| `@error` | eventhandle | 图片加载*失败*时触发                                   |

*Tips*

- App端`vue`页面 `cover-view`、`cover-image` 中不支持嵌套其它组件，包括再次嵌套`cover-view`，仅可覆盖`video`、`map`。App端nvue页面自2.1.5起没有这些限制。
- App端 `cover-image` 使用本地图像的话，打包前需要设置资源为**释放模式**，在manifest文件内app-plus新增runmode节点，设置值为liberate。
-  video 组件中使用，在全屏模式下使用`cover-view`（仅微信小程序、App端nvue）

## 基础内容

### icon

图标

- `type`
- `size`
- `color`

### text

文本组件

| 属性名        | 默认值 | 说明         |
| :------------ | :----- | :----------- |
| `selectable`  | false  | 文本是否可选 |
| `user-select` | false  | 文本是否可选 |
| `space`       |        | 显示连续空格 |
| `decode`      | false  | 是否解码     |

*space* 值

| 值     | 说明                   |
| :----- | :--------------------- |
| `ensp` | 中文字符空格一半大小   |
| `emsp` | 中文字符空格大小       |
| `nbsp` | 根据字体设置的空格大小 |

*Tips*

- `<text>` 组件内只支持嵌套 `<text>`
- 在`app-nvue`下，只有`<text>`才能包裹文本内容。无法在`<view>`组件包裹文本。
- decode 可以解析的有 

```text
 &nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;
```

- 除文本节点外，其他节点*无法长按选中*
- 支持 `\n` 方式换行。
-  `<span>` 会被转换为 `<text>`

### rich-text

富文本

| 属性名       | 类型           | 默认值 | 说明                   |
| :----------- | :------------- | :----- | :--------------------- |
| `nodes`      | Array / String | []     | 节点列表 / HTML String |
| `space`      | string         |        | 显示连续空格           |
| `selectable` | Boolean        | false  | 富文本是否可以长按选中 |

*app-nvue* 和 *支付宝小程序* ： `nodes` 属性只支持 `Array` 类型

>要支持 HTML String，需将 HTML String转化为 nodes 数组，可使用 [html-parser](https://github.com/dcloudio/hello-uniapp/blob/master/common/html-parser.js) 转换。性能损耗

*事件*：`click、touchstart、touchmove、touchcancel、touchend、longpress`

*nodes*

两种节点，元素节点、文本节点。默认元素节点，在富文本区域里显示的 HTML 节点。

*type = node*

| 属性       | 说明       | 类型   | 必填 | 备注                                     |
| :--------- | :--------- | :----- | :--- | :--------------------------------------- |
| `name`     | 标签名     | String | 是   | 支持部分受信任的 HTML 节点               |
| `attrs`    | 属性       | Object | 否   | 支持部分受信任的属性，遵循 Pascal 命名法 |
| `children` | 子节点列表 | Array  | 否   | 结构和 nodes 一致                        |

*type = text*

| 属性 | 说明 | 类型   | 必填 | 备注          |
| :--- | :--- | :----- | :--- | :------------ |
| text | 文本 | String | 是   | 支持 entities |

> 全局支持class和style属性，**不支持id属性**。

*Tips*

- `nodes` 不推荐使用 `String` 类型，性能下降
- rich-text 组件内**屏蔽所有节点的事件**。内容中有链接、图片需要点击，则不能使用rich-text
- `name` 属性*大小写不敏感*。
- 使用*不受信任*的HTML节点，*该节点及其所有子节点将会被移除*
- `img` 标签仅支持*网络图片*
- 在自定义组件中使用 rich-text 组件，自定义组件的 css 样式对 rich-text 中的 class 生效

### progress

进度条。

| 属性名          | 默认值    | 说明                     |
| :-------------- | :-------- | :----------------------- |
| `percent`       | 无        | 百分比0~100              |
| `show-info`     | false     | 右侧显示*百分比*         |
| border-radius   | 0         | 圆角大小                 |
| font-size       | 16        | 右侧百分比字体大小       |
| `stroke-width`  | 6         | *进度条线宽*`px`         |
| activeColor     | #09BB07   | *已选择*进度条的颜色     |
| backgroundColor | #EBEB*EB* | *未选择*进度条的颜色     |
| `active`        | false     | 进度条从*左往右动画*     |
| `active-mode`   | backwards | 动画模式                 |
| `duration`      | 30        | 进度增加`1%`*所需毫秒数* |
| `@activeend`    |           | 动画*完成*事件           |

> `backwards`: 从头播；`forwards`：从上次结束点接着播

## 表单组件

### button

按钮

| 属性名             | 类型    | 默认值       | 说明                                                         |
| :----------------- | :------ | :----------- | :----------------------------------------------------------- |
| `size`             | String  | default      | 大小                                                         |
| type               | String  | default      | 样式类型                                                     |
| plain              | Boolean | false        | 是否镂空，背景色透明                                         |
| disabled           | Boolean | false        | 是否禁用                                                     |
| `loading`          | Boolean | false        | 是否带 loading 图标                                          |
| `form-type`        | String  |              | 用于 `<form>` 组件，点击会触发 `<form>` 组件的 `submit`/`reset` |
| `open-type`        | String  |              | *开放能力*                                                   |
| `hover-class`      | String  | button-hover | 指定按钮*按下去*样式类。值为`none`时，没点击效果（App-nvue 平台暂不支持） |
| `hover-start-time` | Number  | 20           | 按住后*多久出现点击态*（ms）                                 |
| `hover-stay-time`  | Number  | 70           | 松开后*点击态保留时间*（ms）                                 |

### checkbox

#### checkbox-group

多项选择器，多个 checkbox 组成

| 属性名    | 类型        | 说明                                                         |
| :-------- | :---------- | :----------------------------------------------------------- |
| `@change` | EventHandle | 选中项发生改变是触发 change 事件，`detail = {value:[选中的checkbox的value的数组]}` |

#### checkbox

多选项目

**属性说明**

| 属性名   | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| value    | 选中时触发 `<checkbox-group>` 的 change 事件，并携带 `<checkbox>` 的 value。 |
| disabled | *是否禁用*                                                   |
| checked  | *是否选中*                                                   |
| color    | `checkbox`的颜色                                             |

> 调节checkbox大小，可通过css的scale方法调节，``style="transform:scale(0.7)"`

### editor

富文本编辑器，可以对图片、文字格式进行编辑和混排。

| 属性               | 默认值 | 说明                                                         |
| ------------------ | ------ | ------------------------------------------------------------ |
| read-only          | false  | 设置编辑器为只读                                             |
| placeholder        |        | 提示信息                                                     |
| show-img-size      | false  | 点击图片时*显示图片大小*控件                                 |
| `show-img-toolbar` | false  | 点击图片时*显示工具栏*控件                                   |
| `show-img-resize`  | false  | 点击图片时显示修改尺寸控件                                   |
| @ready             |        | 编辑器*初始化完成*时触发                                     |
| @focus             |        | 编辑器*聚焦*时触发，event.detail = {html, text, delta}       |
| @blur              |        | 编辑器*失去焦点*时触发，detail = {html, text, delta}         |
| @input             |        | 编辑器*内容改变*时触发，detail = {html, text, delta}         |
| @statuschange      |        | 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 |

> [支持标签](https://uniapp.dcloud.io/component/editor?id=%e6%94%af%e6%8c%81%e7%9a%84%e6%a0%87%e7%ad%be)、[支持内联样式](https://uniapp.dcloud.io/component/editor?id=%e6%94%af%e6%8c%81%e7%9a%84%e5%86%85%e8%81%94%e6%a0%b7%e5%bc%8f)

*Tips*

- 插入的 html 中**事件绑定会被移除**
- 编辑器**聚焦时页面会被上推**
- **不能直接插入视频**，编辑时可以采用视频封面占位，并在图片属性中保存视频信息，预览时再还原为视频。

### form

点击 `<form>` 表单中 `formType` 为 `submit` 的 `<button>` 组件

会将表单组件中的 value 值进行提交，需要在表单组件中加上 `name` 来作为 `key`

| 属性名  | 说明                                                         |
| :------ | :----------------------------------------------------------- |
| @submit | 携带 form 中的数据触发 submit 事件，`event.detail = {value : {'name': 'value'} , formId: ''}`，`report-submit` 为 `true` 时才会返回 `formId` |
| @reset  | 表单重置时会触发 `reset` 事件                                |

内置 `behaviors`

小程序端在`form`内的自定义组件内有`input`表单控件时，无法在`form`的`submit`事件内获取组件内表单控件值。

可以通过为自定义组件 添加 `name` 和 `key`，让 `form` 组件识别自定义组件，并在 `submit` 事件中返回组件的字段名及其对应字段值。

```html
 <form @submit="onSubmit">  
      <comp-input name="test" v-model="testValue"></comp-input>  
      <button form-type="submit">Submit</button>  
 </form>  
```

### input

输入框。

**属性说明**

| 属性名                | 默认值              | 说明                                                         |
| :-------------------- | :------------------ | :----------------------------------------------------------- |
| value                 |                     | 输入框的初始内容                                             |
| type                  | text                | input 的类型                                                 |
| text-content-type     |                     | 文本区域的语义，根据类型自动填充                             |
| password              | false               | 是否是密码类型                                               |
| placeholder           |                     | 输入框为空时占位符                                           |
| placeholder-style     |                     | 指定 placeholder 的*样式*                                    |
| placeholder-class     | "input-placeholder" | 指定 placeholder 的*样式类*，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ |
| disabled              | false               | 是否禁用                                                     |
| maxlength             | 140                 | 最大输入长度，设置为 -1 的时候不限制最大长度                 |
| `cursor-spacing`      | 0                   | **指定光标与键盘的距离**，单位 `px` 。取 *input 距离底部的距离*和 *cursor-spacing 指定的距离*中的最小值 |
| `focus`               | false               | 获取*焦点*                                                   |
| confirm-type          | done                | 设置键盘右下角按钮的文字（仅 type="text" 生效）              |
| confirm-hold          | false               | 点击键盘右下角按钮时*是否保持键盘不收起*                     |
| cursor                |                     | 指定focus时的光标位置                                        |
| selection-start       | -1                  | 光标*起始*位置，自动聚集时有效                               |
| selection-end         | -1                  | 光标*结束*位置，自动聚集时有效                               |
| `adjust-position`     | true                | 键盘弹起时，是否*自动上推页面*                               |
| `hold-keyboard`       | false               | focus时，*点击页面不收起键盘*                                |
| `auto-blur`           | false               | 键盘收起时，*是否自动失去焦点*                               |
| @input                |                     | 当键盘输入时，触发input事件                                  |
| @focus                |                     | 输入框*聚焦*时触发，`event.detail = { value, height }`，height 为键盘高度 |
| @blur                 |                     | 输入框*失去焦点*时触发                                       |
| @confirm              |                     | 点击*完成*按钮时触发                                         |
| @keyboardheightchange |                     | *键盘高度变化*的时候触发此事件，`event.detail = {height: height, duration: duration}` |

*Tips*

- `input` 组件上有默认的 `min-height` 样式， `min-height` 大于 `height` ， `height` 样式无效

`type` 有效值

| 值       | 说明               |
| :------- | :----------------- |
| text     | 文本输入键盘       |
| number   | 数字输入键盘       |
| `idcard` | 身份证输入键盘     |
| `digit`  | 带小数点的数字键盘 |
| `tel`    | 电话输入键盘       |

*Tips*

- 小程序平台，`number` 类型只支持整型。需输入浮点型，使用 `digit` 类型。
- 小程序端input在置焦时，会表现为原生控件，此时会层级变高。如需前端组件遮盖input，需让input失焦，或使用cover-view等覆盖原生控件的方案
- input组件若*不想弹出软键盘*，可设置为`disabled`

`text-content-type` 有效值

| 值            | 说明         |
| :------------ | :----------- |
| `oneTimeCode` | 一次性验证码 |

`confirm-type` 有效值

| 值     | 说明               |
| :----- | :----------------- |
| send   | 右下角按钮为“发送” |
| search | “搜索”             |
| next   | “下一个”           |
| go     | “前往”             |
| done   | “完成”             |

### label

用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件。

>内部有多个控件的时候默认触发*第一个*控件

### picker

从底部弹起的滚动选择器。支持五种选择器，通过mode来区分。

#### 普通选择器

`mode = selector`

| 属性名          | 类型                    | 默认值 | 说明                                                         |
| :-------------- | :---------------------- | :----- | :----------------------------------------------------------- |
| `range`         | Array / Array＜Object＞ | []     | mode为 selector 或 multiSelector 时，range 有效              |
| `range-key`     | String                  |        | range 是 Array＜Object＞ ，通过 `range-key` 来指定 Object 中 `key` 的值作为选择器显示内容 |
| value           | Number                  | 0      | 选择了 range 中的第几个（从 0 开始）                         |
| `selector-type` | String                  | auto   | 大屏时UI类型，支持 picker、select、auto，默认在 iPad 以 picker 样式展示而在 PC 以 select 样式展示 |
| @change         | EventHandle             |        | *value 改变时*触发                                           |
| disabled        | Boolean                 | false  | 是否禁用                                                     |
| @cancel         | EventHandle             |        | 取消选择或点遮罩层收起 picker 时触发                         |

#### 多列选择器

`mode = multiSelector`

| 属性名          | 类型                              | 默认值 | 说明                                                         |
| :-------------- | :-------------------------------- | :----- | :----------------------------------------------------------- |
| `range`         | 二维 Array / 二维 Array＜Object＞ | []     | mode为 selector 或 multiSelector 时，range 有效。长度表示列，数组每项表示每列数据，如`[["a","b"], ["c","d"]]`* |
| `range-key`     | String                            |        | 同 `selector`                                                |
| value           | Array                             | []     | 同 `selector`                                                |
| @change         | EventHandle                       |        | 同 `selector`                                                |
| `@columnchange` | EventHandle                       |        | *某一列值改变时*触发，`event.detail = {column: column, value: value}`<br />`column` ：改变了第几列（从0开始）<br />`value`：变更值的下标 |
| @cancel         | EventHandle                       |        | 同 `selector`                                                |
| disabled        | Boolean                           | false  | 同 `selector`                                                |

#### 时间选择器

`mode = time`

| 属性名   | 说明                      |
| :------- | :------------------------ |
| value    | 选中时间，格式为`"hh:mm"` |
| `start`  | 有效时间范围的*开始*      |
| `end`    | 有效时间范围的*结束*      |
| @change  | *value 改变时*触发        |
| @cancel  | 取消选择时触发            |
| disabled | 是否禁用                  |

#### 日期选择器

`mode = date`

| 属性名   | 说明                                                    |
| :------- | :------------------------------------------------------ |
| value    | 选中的日期，格式为"YYYY-MM-DD"                          |
| `start`  | 有效日期范围的*开始*                                    |
| `end`    | 有效日期范围的*结束*                                    |
| `fields` | 有效值 `year、month、day`，表示选择器的粒度，默认为 day |
| @change  | *value 改变*时触发                                      |
| @cancel  | 取消选择时触发                                          |
| disabled | 是否禁用                                                |

#### 省市区选择器

`mode = region`

| 属性名        | 类型        | 默认值 | 说明                                       |
| :------------ | :---------- | :----- | :----------------------------------------- |
| value         | Array       | []     | 表示选中的省市区，默认选中每一列的第一个值 |
| `custom-item` | String      |        | 为每一列的顶部*添加一个自定义的项*         |
| @change       | EventHandle |        | *value 改变*时触发                         |
| @cancel       | EventHandle |        | 取消选择时触发                             |
| disabled      | Boolean     | false  | 是否禁用                                   |

>picker内容还在滚动时或滚动回弹动画还未结束时，点确定关闭弹出的picker，数据无法及时更新。需等待一下，或手动触停滚动再点确定

### picker-view

**嵌入**页面的滚动选择器

| 属性名            | 类型            | 默认值                                                       |
| :---------------- | :-------------- | :----------------------------------------------------------- |
| value             | Array＜Number＞ | 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），*数字大于可选项长度时，选择最后一项。* |
| `indicator-style` | String          | 选择器中间*选中框的样式*                                     |
| `indicator-class` | String          | 选择器中间*选中框的类名*                                     |
| `mask-style`      | String          | *蒙层的样式*                                                 |
| `mask-class`      | String          | *蒙层的类名*                                                 |
| @change           | EventHandle     | 当*滚动选择value改变*时触发，value为数组                     |
| `@pickstart`      | eventhandle     | 当*滚动选择开始*时触发事件                                   |
| `@pickend`        | eventhandle     | 当*滚动选择结束*时触发事件                                   |

#### picker-view-column

`<picker-view />` 的子组件，仅可放置于 `<picker-view />` 中，其子节点的*高度会自动设置成与 picker-view 的选中框的高度一致*。

### radio

#### radio-group

单项选择器，内部由多个 `<radio>` 组成。

| 属性名  | 类型        | 默认值 | 说明                                                         |
| :------ | :---------- | :----- | :----------------------------------------------------------- |
| @change | EventHandle |        | *选中项变化*时触发 ，`event.detail = {value: 选中项radio的value}` |

#### radio

单选项目

| 属性名   | 类型    | 默认值 | 说明                                                         |
| :------- | :------ | :----- | :----------------------------------------------------------- |
| value    | String  |        | `<radio>` 标识。当该 `<radio>` 选中时，`<radio-group>` 的 change 事件会携带 `<radio>` 的 value |
| checked  | Boolean | false  | 当前是否选中                                                 |
| disabled | Boolean | false  | 是否禁用                                                     |
| color    | Color   |        | radio的颜色，同css的color                                    |

*Tips*

调节radio大小，可通过css的scale方法调节，如缩小到70%`style="transform:scale(0.7)"`

### slider

滑动选择器。

| 属性名            | 类型        | 默认值  | 说明                                          |
| :---------------- | :---------- | :------ | :-------------------------------------------- |
| `min`             | Number      | 0       | 最小值                                        |
| `max`             | Number      | 100     | 最大值                                        |
| `step`            | Number      | 1       | 步长，取值必须大于 0，并且可被(max - min)整除 |
| disabled          | Boolean     | false   | 是否禁用                                      |
| value             | Number      | 0       | 当前取值                                      |
| `activeColor`     | Color       |         | 左侧*已选择部分的线条颜色*                    |
| `backgroundColor` | Color       | #e9e9e9 | *右侧背景条的颜色*                            |
| `block-size`      | Number      | 28      | 滑块大小，取值 12 - 28                        |
| `block-color`     | Color       | #ffffff | 滑块的颜色                                    |
| `show-value`      | Boolean     | false   | 是否显示当前 value                            |
| @change           | EventHandle |         | 完成一次*拖动后*触发的事件                    |
| @changing         | EventHandle |         | *拖动过程中*触发的事件                        |

### switch

开关选择器

**属性说明**

| 属性名   | 类型        | 默认值 | 说明                                                         |
| :------- | :---------- | :----- | :----------------------------------------------------------- |
| checked  | Boolean     | false  | 是否选中                                                     |
| disabled | Boolean     | false  | 是否禁用                                                     |
| `type`   | String      | switch | 样式，有效值：switch, checkbox                               |
| @change  | EventHandle |        | checked *改变时*触发 change 事件event.detail={ value:checked} |
| `color`  | Color       |        | switch 的颜色，同 css 的 color                               |

### textarea

多行输入框

| 属性名                    | 默认值               | 说明                                                         |
| :------------------------ | :------------------- | :----------------------------------------------------------- |
| value                     |                      | 输入框的内容                                                 |
| placeholder               |                      | 输入框为空时占位符                                           |
| placeholder-style         |                      | 指定 placeholder 的样式                                      |
| placeholder-class         | textarea-placeholder | 指定 placeholder 的样式类                                    |
| disabled                  | false                | 是否禁用                                                     |
| maxlength                 | 140                  | *最大输入长度*，设置为 -1 的时候不限制最大长度               |
| focus                     | false                | 获取*焦点*                                                   |
| `auto-height`             | false                | 是否*自动增高*，设置auto-height时，style.height不生效        |
| `fixed`                   | false                | *`textarea` 在一个 `position:fixed` 的区域，需指定属性 `fixed` 为 `true`* |
| `cursor-spacing`          | 0                    | 指定*光标与键盘的距离*，单位 `px` 。取 *`textarea` 距离底部距离*和 *`cursor-spacing` 指定的距离*最小值 |
| cursor                    |                      | 指定focus时的*光标位置*                                      |
| confirm-type              | done                 | 设置键盘右下角按钮的文字                                     |
| show-confirm-bar          | true                 | 是否显示键盘上方带有”完成“按钮那一栏                         |
| selection-start           | -1                   | 光标起始位置，自动聚焦时有效                                 |
| selection-end             | -1                   | 光标结束位置，自动聚焦时有效                                 |
| adjust-position           | true                 | 键盘弹起时，是否自动上推页面                                 |
| `disable-default-padding` | false                | 是否*去掉 `iOS` 下的默认内边距*                              |
| hold-keyboard             | false                | focus时，点击页面的时候不收起键盘                            |
| auto-blur                 | false                | 键盘收起时，是否自动失去焦点                                 |
| @focus                    |                      | 输入框*聚焦*时触发，`event.detail = { value, height }`，height 为键盘高度 |
| @blur                     |                      | 输入框*失去焦点*时触发，`event.detail = {value, cursor}`     |
| `@linechange`             |                      | *输入框行数变*化时调用`event.detail = {height: 0, heightRpx: 0, lineCount: 0}` |
| @input                    |                      | *键盘输入*时触发。`event.detail = {value, cursor}`， @input 处理函数的*返回值并不会反映到 `textarea` 上* |
| @confirm                  |                      | 点击*完成时* 触发                                            |
| `@keyboardheightchange`   |                      | *键盘高度变化*的时候触发此事件，`event.detail = {height: height, duration: duration}` |

*Tips*

- *`textarea` 的 `blur` 事件晚于页面`tap` 事件*，需要在 button 的*点击事件*获取 `textarea`，使用 `form` 的 `@submit`。
- js中给`textarea`组件赋值为字符串，在字符串中加`\n`可实现换行。

## 路由跳转

#### [navigator](https://uniapp.dcloud.io/component/navigator?id=navigator)

页面跳转。

该组件类似HTML中的`<a>`组件，但只能跳转本地页面。目标页面必须在pages.json中注册。

该组件的功能有API方式，另见：https://uniapp.dcloud.io/api/router?id=navigateto

**属性说明**

| 属性名                   | 类型    | 默认值          | 说明                                                         |
| :----------------------- | :------ | :-------------- | :----------------------------------------------------------- |
| `url`                    | String  |                 | 应用内跳转链接（*相对*路径或*绝对*路径）                     |
| `open-type`              | String  | navigate        | 跳转方式                                                     |
| `delta`                  | Number  |                 | open-type 为 '`navigateBack`' 时有效，表示*回退的层数*       |
| animation-type           | String  | pop-in/out      | open-type 为 `navigate`、`navigateBack` 有效，窗口的显示/关闭*动画效果* |
| animation-duration       | Number  | 300             | open-type 为 `navigate`、`navigateBack` 有效，窗口显示/关闭*动画持续时间* |
| hover-class              | String  | navigator-hover | *点击时的样式类*，当hover-class="none"时，没有点击态效果     |
| `hover-stop-propagation` | Boolean | false           | 是否*阻止本节点的祖先节点出现点击态*                         |
| `hover-start-time`       | Number  | 50              | 按住后*多久出现点击态*（`ms`）                               |
| `hover-stay-time`        | Number  | 600             | 手指松开后*点击态保留时间*（`ms`）                           |
| target                   | String  | self            | 在*哪个小程序目标上发生跳转*，默认当前小程序，值域self/miniProgram |

`open-type` 有效值

| 值             | 说明                                     |
| :------------- | :--------------------------------------- |
| `navigate`     | uni.navigateTo                           |
| `redirect`     | uni.redirectTo                           |
| `switchTab`    | uni.switchTab                            |
| `reLaunch`     | uni.reLaunch                             |
| `navigateBack` | uni.navigateBack                         |
| `exit*`*       | *退出小程序*，target="miniProgram"时生效 |

*Tips*

- 跳转`tabbar`页面，必须设置`open-type="switchTab"`
- navigator-hover 默认为 `{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;},` <navigator> 子节点背景色应为透明色。
- navigator-`open-type`属性 如果使用对应的值，则对应值的功能会高于对应跳转路径
- app退出应用，`Android`平台可以使用[`plus.runtime.quit`](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.quit)。iOS没有退出应用概念

## 媒体组件

### audio

音频。

> 推荐API方式播放音频。API见 [uni.createInnerAudioContext](https://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext) 替代

| 属性名        | 说明                                                         |
| :------------ | :----------------------------------------------------------- |
| id            | audio 组件的唯一标识符                                       |
| `src`         | 要播放音频的资源地址                                         |
| `loop`        | 是否循环播放                                                 |
| `controls`    | 是否显示默认控件                                             |
| `poster`      | 控件上音频*封面*的图片资源地址， controls 为 false ，则 poster 无效 |
| name          | 控件上*音频名字*，controls 为 false ，则 name无效            |
| author        | 控件上作者名字*，controls 为 false ，则 author无效           |
| `@error`      | 当发生*错误*时触发 error 事件，`detail = {errMsg: MediaError.code}` |
| `@play`       | *开始/继续播放*时触发                                        |
| `@pause`      | *暂停*播放时触发                                             |
| `@timeupdate` | 播放*进度改变时*触发，`detail = {currentTime, duration}`     |
| `@ended`      | *播放到末尾时*触发                                           |

`MediaError.code`

| 返回错误码 | 描述                 |
| :--------- | :------------------- |
| 1          | 获取*资源被用户禁止* |
| 2          | *网络*错误           |
| 3          | *解码*错误           |
| 4          | *不合适资源*         |

### camera

页面*内嵌的区域相机组件*。不是点击后全屏打开的相机。

| 属性名            | 类型        | 默认值 | 说明                                                  |
| :---------------- | :---------- | :----- | :---------------------------------------------------- |
| `mode`            | String      | normal | 有效值为 `normal`, `scanCode`                         |
| `resolution`      | string      | medium | *分辨率*，不支持动态修改                              |
| `device-position` | String      | back   | *前置或后置*摄像头，值为front, back                   |
| `flash`           | String      | auto   | *闪光灯*，值为auto, on, off                           |
| `frame-size`      | string      | medium | 指定期望的*相机帧数据尺寸*                            |
| `@stop`           | EventHandle |        | 摄像头在*非正常终止*时触发，如退出后台等情况          |
| `@error`          | EventHandle |        | 用户*不允许使用摄像头*时触发                          |
| `@initdone`       | eventhandle |        | *相机初始化完成*时触发，`e.detail = {maxZoom}`        |
| `@scancode`       | EventHandle |        | 在*扫码识别成功时*触发，仅在 `mode="scanCode"` 时生效 |

*Tips*

- 在 App 和 H5 端，可以使用*API方式来调用全屏摄像头*：[`uni.chooseImage`](https://uniapp.dcloud.io/api/media/image?id=chooseimage) 和 [`uni.chooseVideo`](https://uniapp.dcloud.io/api/media/video?id=choosevideo) 

### image

图片。

| 属性名                 | 默认值        | 说明                                                         |
| :--------------------- | :------------ | :----------------------------------------------------------- |
| src                    |               | 图片资源地址                                                 |
| `mode`                 | 'scaleToFill' | 图片裁剪、缩放的模式                                         |
| `lazy-load`            | false         | 图片*懒加载*。只针对`page`与`scroll-view`下的image有效       |
| `fade-show`            | true          | 图片显示*动画效果*                                           |
| `webp`                 | false         | *默认不解析 `webP` 格式*，只支持网络资源                     |
| show-menu-by-longpress | false         | 开启长按图片显示识别小程序码菜单                             |
| `draggable`            | true          | 长按*是否能拖动*图片                                         |
| `@error`               |               | *错误发生*时，发布到 AppService 的事件名，事件对象`event.detail = {errMsg: 'something wrong'}` |
| `@load`                |               | 当*图片载入完毕*时，发布到 AppService 的事件名，事件对象`event.detail = {height:'图片高度px', width:'图片宽度px'}` |

**Tips**

- `src` *仅支持相对路径、绝对路径*，支持 base64 码；
- `css`样式太多的情况， `image` 可能导致样式生效较慢，出现 “闪一下” ，设置 `image{will-change: transform}` 
- *自定义组件*里面使用 `<image>`时，若 `src` 使用*相对路径可能会路径查找失败的情况，建议用绝对路径。*

**mode 有效值：**

mode 有 14 种模式，其中 5 种是缩放模式，9 种是裁剪模式。

| 值             | 说明                                       |
| :------------- | :----------------------------------------- |
| 缩放           |                                            |
| `scaleToFill`  | *不保持纵横比*，使图片宽高完全拉伸至填满*  |
| `aspectFit`    | *保持纵横比*，使图片*长边完全显示*。       |
| `aspectFill`   | *保持纵横比*，图片*短边完全显示*           |
| `widthFix`     | 宽度不变，*高度*自动变化，*保持原图宽高比* |
| `heightFix`    | 高度不变，*宽度*自动变化，*保持原图宽高比* |
| 裁剪           |                                            |
| `top`          | 不缩放图片，只显示图片*顶部*区域           |
| `bottom`       | 不缩放图片，只显示图片*底部*区域           |
| `center`       | 不缩放图片，只显示图片*中间*区域           |
| `left`         | 不缩放图片，只显示图片*左边*区域           |
| `right`        | 不缩放图片，只显示图片*右边*区域           |
| `top left`     | 不缩放图片，只显示图片*左上*区域           |
| `top right`    | 不缩放图片，只显示图片*右上*区域           |
| `bottom left`  | 不缩放图片，只显示图片*左下*区域           |
| `bottom right` | 不缩放图片，只显示图片右下*区域            |

#### video

视频播放组件。

**属性说明**

| 属性名                       | 默认值   | 说明                                                         |
| :--------------------------- | :------- | :----------------------------------------------------------- |
| src                          |          | 要播放视频的资源地址                                         |
| `autoplay`                   | false    | 是否*自动*播放                                               |
| `loop`                       | false    | 是否*循环*播放                                               |
| `muted`                      | false    | 是否*静音*播放                                               |
| initial-time                 |          | 指定视频*初始播放位置*（`s`）。                              |
| duration                     |          | 指定视频*时长*（`s`）。                                      |
| `controls`                   | true     | 是否显示*默认播放控件*                                       |
| `danmu-list`                 |          | *弹幕列表*                                                   |
| `danmu-btn`                  | false    | 是否*显示弹幕按钮*，只在初始化时有效，*不能动态变更*         |
| `enable-danmu`               | false    | 是否*展示弹幕*，只在初始化时有效，*不能动态变更*             |
| page-gesture                 | false    | 在非全屏模式下，是否开启*亮度与音量调节手势*                 |
| `direction`                  |          | 设置全屏时*视频的方向*，不指定则根据宽高比自动判断。         |
| show-progress                | true     | 若不设置，宽度大于240时才会显示                              |
| show-fullscreen-btn          | true     | 是否显示*全屏按钮*                                           |
| show-play-btn                | true     | 是否显示*视频底部播放*按钮                                   |
| show-center-play-btn         | true     | 是否显示*视频中间播放*按钮                                   |
| show-loading                 | true     | 是否显示*loading控件*                                        |
| enable-progress-gesture      | true     | 是否开启*控制进度的手势*                                     |
| `object-fit`                 | contain  | `contain`：包含，`fill`：填充，`cover`：覆盖                 |
| poster                       |          | 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效 |
| show-mute-btn                | false    | 是否显示静音按钮                                             |
| title                        |          | *视频的标题*，全屏时在顶部展示                               |
| play-btn-position            | bottom   | *播放按钮位置*                                               |
| enable-play-gesture          | false    | 是否*开启播放手势*，即双击切换播放/暂停                      |
| auto-pause-if-navigate       | true     | 当跳转到*其它小程序页面*时，*是否自动暂停*本页面的视频       |
| auto-pause-if-open-native    | true     | 当跳转到*其它微信原生页面*时，是否自动暂停本页面的视频       |
| vslide-gesture               | false    | *非全屏模式*，是否开启*亮度与音量调节*手势                   |
| vslide-gesture-in-fullscreen | true     | *全屏模式*，是否开启*亮度与音量调节*手势                     |
| ad-unit-id                   |          | 视频前贴广告单元ID                                           |
| poster-for-crawler           |          | 用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址 |
| `codec`                      | hardware | *解码器*选择，<br />`hardware`：硬解码（硬解码可以增加解码算力，提高视频清晰度）<br />`software`：ffmpeg 软解码； |
| `http-cache`                 | true     | 是否对 *http、https 视频源开启本地缓存*。<br />*缓存策略*:在视频播放时会在本地保存缓存文件，超过100M，会清空之前的缓存（不适用于m3u8等流媒体协议） |
| `play-strategy`              | 0        | 播放策略，<br />0：*普通模式*，适合绝大部分视频播放场景；<br />1：*平滑播放模式（降级）*，增加缓冲区大小，采用open sl解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等。 适用于高码率视频的极端场景；<br />3： *M3U8优化模式*，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度。 适用于M3U8在线播放的场景 |
| header                       |          | HTTP 请求 Header                                             |
| @play                        |          | *开始/继续播放时*触发                                        |
| @pause                       |          | *暂停播放时*触发                                             |
| @ended                       |          | *播放到末尾时*触发                                           |
| `@timeupdate`                |          | 播放*进度变化时*触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次 |
| `@fullscreenchange`          |          | 视频*进入和退出全屏*时触发，`event.detail = {fullScreen, direction}`，direction取为 vertical 或 horizontal |
| `@waiting`                   |          | 视频*出现缓冲*时触发                                         |
| `@error`                     |          | 视频*播放出错*时触发                                         |
| `@progress`                  |          | 加载*进度变化*时触发，只支持一段加载。`event.detail = {buffered}`，百分比 |
| `@loadedmetadata`            |          | 视频元数据*加载完成*时触发。event.detail = {width, height, duration} |
| @fullscreenclick             |          | 视频播放*全屏播放时点击*事件。event.detail = {<br /> `screenX`:"Number类型，点击点*相对于屏幕左侧边缘的 X 轴坐标*",<br /> `screenY`:"Number类型，点击点*相对于屏幕顶部边缘的 Y 轴坐标*",<br /> `screenWidth`:"Number类型，*屏幕总宽度*",<br />`screenHeight`:"Number类型，*屏幕总高度*"} |
| @controlstoggle              |          | 切换 controls 显示隐藏时触发。event.detail = {show}          |

`direction` 的合法值

| 值   | 说明           |
| :--- | :------------- |
| 0    | 正常竖向       |
| 90   | 屏幕逆时针90度 |
| -90  | 屏幕顺时针90度 |

`object-fit` 的合法值

| 值        | 说明 |
| :-------- | :--- |
| `contain` | 包含 |
| `fill`    | 填充 |
| `cover`   | 覆盖 |

`play-btn-position` 的合法值

| 值       |      说明      |
| :------- | :------------: |
| `bottom` | controls bar上 |
| `center` |    视频中间    |

>api：[uni.createVideoContext](https://uniapp.dcloud.io/api/media/video-context?id=createvideocontext)

*Tips*

- `<video/> `组件在非H5端是原生组件，层级高于普通前端组件，覆盖其需要使用[cover-view](https://uniapp.dcloud.io/component/cover-view?id=cover-view)组件或`plus.nativeObj.view`、`subNVue`。
- 使用 `<video/>` 组件，*打包 App* 时必须勾选 manifest.json->App 模块权限配置->`VideoPlayer` 模块。
- App平台：**视频路径为本地路径，需要配置资源为释放模式*：在 manifest.json 文件内 app-plus 节点下新增 `runmode` 配置，值为`liberate`。

### [live-player](https://uniapp.dcloud.io/component/live-player?id=live-player)

实时音视频播放，也称直播拉流。

### [live-pusher](https://uniapp.dcloud.io/component/live-pusher?id=live-pusher)

实时音视频录制，也称直播推流。

## 地图

### [map](https://uniapp.dcloud.io/component/map?id=map)

地图组件。

地图组件用于展示地图，而定位API只是获取坐标，请勿混淆两者

## 画布

### [canvas](https://uniapp.dcloud.io/component/canvas?id=canvas)

画布。

## 页面属性配置

### [page-meta](https://uniapp.dcloud.io/component/page-meta?id=page-meta)

页面属性配置节点，用于*指定页面的一些属性、监听页面事件*。可*部分替代`pages.json`*的功能。

### [navigation-bar](https://uniapp.dcloud.io/component/navigation-bar?id=navigation-bar)

页面导航条配置节点，用于*指定导航栏的一些属性*。只能是 [page-meta](https://uniapp.dcloud.io/component/page-meta) 组件内的第一个节点，需要配合它一同使用。

### [custom-tab-bar](https://uniapp.dcloud.io/component/custom-tab-bar?id=custom-tab-bar)

*自定义tabBar*组件。

H5端尤其是PC宽屏，对tabBar的位置和样式有更灵活的需求

# 实战

## App平台iOS端软键盘上方横条去除方案

 `pages.json`

```json
"app-plus": {
    "softinputNavBar": "none"
}
```

`js`：动态设置`softinputNavBar`

```javascript
this.$scope.$getAppWebview().setStyle({
  softinputNavBar: 'none'
})
//this.$scope.$getAppWebview()相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
```

## 关于软键盘弹出的逻辑说明

App平台软键盘弹出有 `adjustResize|adjustPan` 两种模式，默认为 ad~justPan 模式，小程序平台只支持 `adjustPan` 模式，H5平台因不同浏览器而异

- `adjustResize`：软键盘弹出时，webview窗体**高度挤压**。*屏幕高度= `webview`窗体高度+软键盘高度*
- `adjustPan`：软键盘弹出时，webview窗体高度不变，**窗体上推**

 `pages.json` 

```json
"app-plus": {
    "softinputMode": "adjustResize"
}
```

*Tips*

- `adjustResize`模式在`Android App`上，因为要重设webview窗体高度，可能会在个别安卓机型闪现灰屏或漏出下层页面内容。
- 小程序端在 input 聚焦期间，*避免使用 `css` 动画*。
- *禁止点击其他位置收起键盘*，可以监听`touch`事件并使用`prevent`修饰符（仅支持App-v3、H5，其他平台可以通过设置`focus`来使输入框重新获取焦点），例如在确认按钮上使用：`@touchend.prevent="onTap"`

## 关于软键盘收起的逻辑说明

- `Android`：软键盘弹出，*点击back或点击非置焦区域*可收起软键盘
- `iOS`：软键盘上方有*带有“完成”的横条*，则需要*点完成*才能收起键盘；如果*无横条*，则点击非*`input/textarea`区域*可收起软键盘

> 隐藏软键盘api：`uni.hideKeyboard()`



