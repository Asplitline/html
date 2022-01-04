

# chrome

**Chromium**：是谷歌的开源项目，由开源社区维护。

**Chrome**：基于 Chromium，但是它是闭源的。

实验性功能 ：chrome://flags/

# devtool

`esc`：显示 第二面板

## element

### DOM树

使用 Chrome DevTools 的 Elements 面板检查和实时编辑页面的 HTML 与 CSS

- **`h`键**：快速隐藏/显示元素当前元素及其后代元素(原理： `visibility:hidden`)
- **按 `alt` 键** 点击 dom 元素前箭头，折叠/展开 后代元素

### styles

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat3M2LB0sr1XvPBAI22THzu9x62srolM1lcAUw66om1XaXfK2tnicnF3wsPhmpTBpHDZIAvQQJ2qWPQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

按住 shift 点击色块，快速切换颜色格式 rgb/hsl/hex

color pickers

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat3M2LB0sr1XvPBAI22THzu9n6AoibPTdftjxibQJ9btw00rCvC25WGYBsqbQicVAfzIIkJZDOnDHEickQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- page colors：color picker 中会列出页面所有的颜色
- material colors：color picker 中会列出 google 设计推荐色系

## Console

Console 面板是浏览器的控制台

message

**设置->Show Console drawer**或者**Esc 快捷键**让 Console 在每个面板都能显示

-  ctrl+shift+p 输入 time 命令或者设置中找到**timestamps**命令，给消息加上时间戳
- `LogXMLHttpRequest`：输出 XMLHttp 请求(可以监控页面所有 ajax 请求 定位其代码调用栈)

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat3DWxn6ORjPykSicxl4BYcvXQIG1IsFTic8HF6QaIa8n2dU5uATYUceaXiawAqZ2hrpDxDj4t8qyuETA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

`$`符号

- `$0`：获取在 Elements 面板**所选中的元素节点**
-  `$` ：替代 `document.querySlector` 方法使用
- `$$`：`document.querySelectorAll`替代，**并能直接返回数组**(Array)。

> `document.querySelectorAll` 返回的是 nodeList(NodeList)

- `$_`：引用上一次执行的结果
- `$i`：使用 npm 的包，可以安装 Console Importer 插件

## Sources

### Debug 

在源代码面板中可以设置**断点**来调试 JavaScript 

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwnvibNZHaxlXr8onzghy3O8icElkrpbxoVaF4G4wX8UfEgCp9G4QoXJibQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 异常断点

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwrt1onxJcPic84WBUrUBgcSxgSDl9Z2HPlcEpewXyYqNZcSAPdIO2LaQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 函数断点

`debug()`：调试的函数名作为参数，调用可以在每次执行该函数前暂停执行代码

#### 单步调试

- step over next function
- step into next function
- step out current function
- step 

step和step over/into 区别

- step 会优先尝试 step into，当没有可步入的代码时，就会执行 step over

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwxqw2mKuUtpDXfnYJZicl3CWFDTNreFEBAPcTl6tsGaMibvuKcmyj4FRQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> **Continue to here**：继续执行至此行 

#### 行内断点

行断点内多个箭头

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwLqkibaMH6dyoNRVib7XdFzEVdGCrF3QoOVCoTpEKST4tvqrBx1gibj18w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### BlackBox

在调试中忽略某些脚本，在 Call Stack 堆栈中会将该脚本隐藏，单步调试时也不会步入脚本中的任何函数

```JS
function animate() {
    prepare();
    lib.doFancyStuff(); // A
    render();
}
```

 A 行，调用的是第三方库的 doFancyStuff 函数。

如果确 三方库没有bug，`BlackBox` 整个第三方库的 js 脚本，在调试中跳过这些代码的执行

#### 三种方式

方式1：在源代码窗格右键，选择"BlackBox Script"

![](https://mmbiz.qpic.cn/mmbiz_gif/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwib2PiacyiabphRkCW3oINS6pO1KRbLP0JTrHThw2NnmGvYtkEickZ0sTcA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

方式2： Call Stack 中右键某一帧，选择"BlackBox Script"

![](https://mmbiz.qpic.cn/mmbiz_gif/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwgpWfaPvXR5fgJGYqDkic29qu7ckGkT79SQqCiafOlNsF6j022c7V8lhA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

方式3： Blackboxing 面板添加**正则表达式**匹配**文件名**

![](https://mmbiz.qpic.cn/mmbiz_gif/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqww0w214hJ0BewxyZHWenZDNFLzzr0oYeiaNaGveaiaqFLts7YyIzwAdEg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

### Devtools Nodejs debug

node 执行 js 文件，文件名前加--inspect 标志，启用浏览器 nodejs 调试

![](https://mmbiz.qpic.cn/mmbiz_png/emhicHiajiaiat2FBMNwlmh6wlFcqB4TAhqwJuGe2jgU3ic2Wn8jDlcBqnAFx6lcWw2EuSMRN29HLmbwtVVrMic0wSjA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### Source Map

组合/压缩 css,js 文件是常见的性能优化方案

开启`source map`：settings -> preference -> sources 

- `Enable Javascript source maps`和`Enable CSS source maps`

source map 映射信息存在 json 对象中，保存在 .map 文件中

- 可由编译程序添加注释`//# sourceMappingURL=/path/to/script.js.map`至生产文件末尾，
- 可由服务端在响应头中添加`X-SourceMap: /path/to/script.js.map`，将 map 文件与生产文件对应

### Local Overrides

用于覆盖网络请求

### Content scripts

浏览器插件的脚本，在特定网页的上下文中运行

### Snippets

snippets 中，选中代码并`ctrl enter`，或点击右下角的执行按钮，即可执行代码片段

## 快速查看页面结构

```js
$$('*').forEach(i=>{
    i.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
```

