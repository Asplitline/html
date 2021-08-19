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
| `id`     | String       | 组件的唯一标示  | 一般用于获取组件上下文对象         |
| `ref`    | String       | vue组件唯一标示 | 用来给子组件注册引用信息           |
| `class`  | String       | 组件的样式类    | 在对应的 css 中定义的样式类        |
| `style`  | String       | 组件的内联样式  | 可以动态设置的内联样式             |
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
| `src`    | String      | 图标路径。支持本地路径、网络路径。不支持 base64 格式。 |
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

| 属性名        | 类型    | 默认值 | 说明         | 平台差异说明        |
| :------------ | :------ | :----- | :----------- | :------------------ |
| `selectable`  | Boolean | false  | 文本是否可选 | App、H5             |
| `user-select` | Boolean | false  | 文本是否可选 | 微信小程序          |
| `space`       | String  |        | 显示连续空格 | App、H5、微信小程序 |
| `decode`      | Boolean | false  | 是否解码     | App、H5、微信小程序 |

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

| 属性名            | 类型          | 默认值    | 说明                     |
| :---------------- | :------------ | :-------- | :----------------------- |
| `percent`         | Float         | 无        | 百分比0~100              |
| `show-info`       | Boolean       | false     | 右侧显示*百分比*         |
| `border-radius`   | number/string | 0         | 圆角大小                 |
| `font-size`       | number/string | 16        | 右侧百分比字体大小       |
| `stroke-width`    | Number        | 6         | *进度条线宽*`px`         |
| `activeColor`     | Color         | #09BB07   | *已选择*进度条的颜色     |
| `backgroundColor` | Color         | #EBEB*EB* | *未选择*进度条的颜色     |
| `active`          | Boolean       | false     | 进度条从*左往右动画*     |
| `active-mode`     | String        | backwards | 动画模式                 |
| `duration`        | number        | 30        | 进度增加`1%`*所需毫秒数* |
| `@activeend`      | EventHandle   |           | 动画*完成*事件           |

> `backwards`: 从头播；`forwards`：从上次结束点接着播

## 表单组件

### button

按钮

| 属性名             | 类型    | 默认值       | 说明                                                         |
| :----------------- | :------ | :----------- | :----------------------------------------------------------- |
| `size`             | String  | default      | 大小                                                         |
| `type`             | String  | default      | 样式类型                                                     |
| `plain`            | Boolean | false        | 是否镂空，背景色透明                                         |
| `disabled`         | Boolean | false        | 是否禁用                                                     |
| `loading`          | Boolean | false        | 是否带 loading 图标                                          |
| `form-type`        | String  |              | 用于 `<form>` 组件，点击会触发 `<form>` 组件的 `submit`/`reset` |
| `open-type`        | String  |              | *开放能力*                                                   |
| `hover-class`      | String  | button-hover | 指定按钮*按下去*样式类。值为`none`时，没点击效果（App-nvue 平台暂不支持） |
| `hover-start-time` | Number  | 20           | 按住后*多久出现点击态*（ms）                                 |
| `hover-stay-time`  | Number  | 70           | 松开后*点击态保留时间*（ms） |

> [微信小程序相关](https://uniapp.dcloud.io/component/button)

### checkbox

#### checkbox-group

多项选择器，多个 checkbox 组成

| 属性名    | 类型        | 说明                                                         |
| :-------- | :---------- | :----------------------------------------------------------- |
| `@change` | EventHandle | 选中项发生改变是触发 change 事件，`detail = {value:[选中的checkbox的value的数组]}` |

#### checkbox

多选项目

**属性说明**

| 属性名     | 类型    | 说明                                                         |
| :--------- | :------ | :----------------------------------------------------------- |
| `value`    | String  | 选中时触发 `<checkbox-group>` 的 change 事件，并携带 `<checkbox>` 的 value。 |
| `disabled` | Boolean | *是否禁用*                                                   |
| `checked`  | Boolean | *是否选中*                                                   |
| `color`    | Color   | `checkbox`的颜色                                             |

