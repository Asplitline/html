# jQuery

## jQuery简介

### JavaScript库

JavaScript开发的过程中，处理浏览器的兼容很复杂而且很耗时，于是出现封装了这些操作的库

常见的JavaScript 库 - jQuery、Prototype、MooTools

### **jQuery优点**

- 提供一种简便的操作，优化HTML文档操作、事件处理、动画设计和Ajax交互
- 具有独特的链式语法和短小清晰的多功能接口；具有高效灵活的css选择器，并且可对CSS选择器进行扩展；拥有便捷的插件扩展机制和丰富的插件
- jQuery兼容各种主流浏览器

### jQuery中顶级对象

**顶级对象**：`$ or jQuery`

- `$`：一个特殊构造函数
- `$(selector)`：得到一个对象
- `$.method`：调用静态方法
  - `$.each()` 等效 for循环

### jQuery页面加载事件

#### 三步走

1. 引入jQuery
2. 入口函数（定义页面加载事件）
3. 功能实现

#### 入口函数

```js
    $(document).ready(function(){
        alert(1);
    })
    $().ready(function(){
        alert(2);
    })
    $(function(){
        alert(3);
    })
```

#### js和jq入口函数区别

js要等页面**所有资源加载完成**才执行

jq等待**文档树加载完成**执行，不会等图片、文件加载

## 选择器

### jQuery基本选择器

| 名称       | 用法                  | 描述                                 |
| ---------- | --------------------- | :----------------------------------- |
| ID选择器   | **$('#id')**          | 获取指定ID的元素                     |
| 类选择器   | **$('.class')**       | 获取同一类class的元素                |
| 标签选择器 | **$('div')**          | 获取同一类标签的所有元素             |
| 并集选择器 | **$('div,p,li')**     | 使用逗号分隔，只要符合条件之一就可。 |
| 交集选择器 | **$('div.redClass')** | 获取class为redClass的div元素         |

### jQuery层级选择器

| 名称       | 用法           | 描述                                                 |
| ---------- | -------------- | :--------------------------------------------------- |
| 子代选择器 | **$('ul>li')** | 使用`>`号，获取儿子层级的元素（不包含孙子层级元素）  |
| 后代选择器 | **$('ul li')** | 使用`空格`，获取ul下的所有li元素（包括孙子层级元素） |

### jQuery过滤选择器

| 名称           | 用法                               | 描述                                      |
| -------------- | ---------------------------------- | :---------------------------------------- |
| **:eq(index)** | $('li:eq(2)').css('color', 'red'); | 获取li元素中索引号为2的元素(index从0开始) |
| **:odd**       | $('li:odd').css('color', 'red');   | 获取li元素中索引号为奇数的元素            |
| **:even**      | $('li:even').css('color', 'red');  | 获取li元素中索引号为偶数的元素            |

### jQuery筛选方法

| 名称                   | 用法                          | 描述                                                       |
| ---------------------- | ----------------------------- | :--------------------------------------------------------- |
| **后代**               |                               |                                                            |
| **children(selector)** | $('ul').children('li')        | 相当于$('ul>li')，**子类**选择器                           |
| **find(selector)**     | $('ul').find('li')            | 相当于$('ul li')，**后代**选择器                           |
| **contents(selector)** | $('ul').contents('li')        | 获得匹配元素集合中每个元素的子元素<br />包括文字和注释节点 |
| **同胞**               |                               |                                                            |
| **siblings(selector)** | $('#first').siblings('li')    | 查找兄弟节点，不包括自己本身<br />不填参数，选择所有兄弟   |
| **next()**             | $('li').next()                | 找下一个兄弟                                               |
| nextAll()              | $('li').nextAll()             | 找之后所有兄弟                                             |
| nextUntil(selector)    | $("h2").nextUntil("h5")       | 介于两个给定参数之间的所有兄弟<br />左开右开               |
| prev()                 | 同next                        |                                                            |
| prevAll()              | 同nextAll                     |                                                            |
| prevUntil(selector)    | 同nextUntil                   |                                                            |
| **祖先**               |                               |                                                            |
| **parent()**           | $('#first').parent();         | 查找父亲                                                   |
| parents()              | $("span").parents()           | 所有祖先，直到根节点                                       |
| parentsUntil()         | $("span").parentsUntil("div") | 同nextUntil                                                |
| **closest(selector)**  | $('li').closest('ul')         | 找最近一个祖先元素                                         |
| **过滤**               |                               |                                                            |
| **eq(index)**          | $('li').eq(2);                | 相当于$('li:eq(2)'),i**ndex从0开始**                       |
| **first()**            | $("div p").first()            | 首个元素                                                   |
| **last()**             | $("div p").last()             | 最后一个元素                                               |
| **filter(selector)**   | $("p").filter(".url")         | 带有指定索引号的元素                                       |
| **not(selector)**      | $("p").not(".url")            | 不匹配标准的所有元素                                       |

## jQuery对象和DOM对象

 **jQuery对象和DOM对象的区别**

**DOM对象**：用document.getElementById() 获得元素(DOM对象)

**jQuery对象**：用$()的方式获取的对象，又叫包装集（包装DOM对象的集合）

>jQuery对象不能使用DOM对象的成员，DOM对象不能使用jQuery对象的成员

**jQuery对象和DOM对象的相互转换**

**jQuery对象转DOM对象**：jQuery对象是包装集(集合)，从集合中取数据可以使用索引的方式                                                                                                                                                                                                                                                                                                              

- `jQuery对象.get(index)`
- `jQuery对象[index]`

**DOM对象转jQuery对象**：`$(DOM对象)`

## jQuery操作属性

### attr操作

**单个属性**：`$obj.attr(name, value)`

```js
$('img').attr('title','哎哟，不错哦');
```

**多个属性**：`$obj.attr(obj)`

```js
$('img').attr({
    title:'哎哟，不错哦',
    alt:'哎哟，不错哦',
    style:'opacity:.5'
});
```

**获取属性**：` $obj.attr(name)`

```js
var oTitle = $('img').attr('title');
```

**移除属性**：`$obj.removeAttr(name)`

```js
$('img').removeAttr('title');
```

> 支持链式操作 `$('img').attr('id', 'lz123').removeAttr('data')`

### prop操作

在jQuery1.6之后支持

对于**checked、selected、disabled这类boolean类型**的属性

不能用attr方法，只能用prop方法

```js
// 设置属性
$(':checked').prop('checked',true);
// 获取属性
$(':checked').prop('checked');// 返回true或者false
```

### 值操作

`$obj.val()`：获取或者设置表单元素的value属性的值
`$obj.html()`：对应innerHTML
`$obj.text()`：对应innerText

> 传参设置，不传参取值

**隐式迭代**

- 设置操作，如果多个元素，给所有的元素设置相同的值
- 获取操作，如果多个元素，只会返回第一个元素的值

## jQuery操作样式

### CSS操作

**操作单个样式**：`$obj.css(name, value)`

```js
$('#one').css('background','gray');
```

**设置多个样式**：`$obj.css(obj);`

```js
$('#one').css({
    'background':'gray',
    'width':'400px',
    'height':'200px'
});
```

**获取样式**：`$obj.css(name)`

```js
$('div').css('background-color');
```

> 返回第一个元素对应的值

### class操作

**添加样式类**：`$obj.addClass(name)`

```js
$('div').addClass('one');
```

**移除样式类**：`$obj.removeClass('name')`

```js
$('div').removeClass('one');
```

**判断是否存在样式类**：`$obj.hasClass(name)`

```js
$('div').hasClass('one');
```

**切换样式类**：`$obj.toggleClass(name)`

```js
$('div').toggleClass('one');
```

## jQuery尺寸和位置操作

### height/width

```javascript
width()/height() //返回元素的宽/高（不包括内边距、边框和外边距）
innerWidth()/innerHeight()	//返回元素的宽/高（包括内边距）
outerWidth()/outerHeight()  //返回元素的宽/高（包括内边距和边框）
outerWidth(true)/outerHeight(true)  //返回元素的宽度/高度（包括内边距、边框和外边距）
```

> height/width 传参设置，不传参获取

### scrollTop/scrollLeft

- 设置或者获取垂直滚动条的位置

```javascript
// 获取页面被卷曲的高度
$(window).scrollTop();
// 获取页面被卷曲的宽度
$(window).scrollLeft();
```

### offset/position

- **offset方法**：获取元素距离**document**的位置
- **position方法**：获取元素距离有定位的**父元素**(offsetParent)的位置。

```javascript
// 获取元素距离document的位置,返回值为对象：{left:100, top:100}
$(selector).offset();
// 获取相对于其最近的有定位的父元素的位置。
$(selector).position();
```

## each方法遍历

隐式迭代会对所有DOM对象设置相同值，但需要给每个对象设置不同的值，需要自己迭代。

each方法：遍历jQuery对象集合，为每个匹配的元素执行一个函数

`$(selector).each(function(index,element){});`

```js
//直接遍历jq对象  $('选择器').each(function(i,v){})
$('img').each(function(i, v){
	//i就是下标 v是遍历的一个值，是一个dom对象
	console.log(i, v);
	//获取每一个标签的title属性
	console.log( $(v).attr('title') );
});

//遍历数组或对象 $.each(数组或对象, function(i,v){})
//遍历普通数组
var arr = [3,4,5,6,7];
$.each(arr, function(i, v){
	console.log(i, v);
});

//遍历jq对象
$.each($('img'), function(i,v){
	//i就是下标 v是遍历的一个值，是一个dom对象
	console.log(i, v);
	//获取每一个标签的title属性
	console.log( $(v).attr('title') );
})
```




## jQuery事件机制

jQuery对JavaScript事件进行了封装，增加并扩展了事件处理机制

### 注册事件

#### **简单事件注册**

```js
click(handler)			//单击事件
mouseenter(handler)		//鼠标进入事件
mouseleave(handler)		//鼠标离开事件
```

#### bind方式注册事件

```js
// 不推荐
// 第一个参数：事件类型
// 第二个参数：事件处理程序
$('p').bind('click mouseenter', function(){
    // 事件响应方法
});
```

#### delegate注册委托事件

```js
// 不推荐
// 第一个参数：selector，要绑定事件的元素
// 第二个参数：事件类型
// 第三个参数：事件处理函数
$('.parentBox').delegate('p', 'click', function(){
    // 为 .parentBox下面的所有的p标签绑定事件
});
```

#### **on注册事件**

**推荐使用**

**语法**：`$(selector).on(events[,selector][,data],handler)`

- **events**：绑定事件名称，多个事件用空格分隔
- **selector**：执行事件的后代元素。没有后代，事件自己执行
- **data**：传递给处理函数数据event.data（很少使用）
- **handler**：事件处理函数

> jQuery1.7之后，jQuery用on统一了所有事件的处理方法
>
> []内选填

**on注册简单事件**

**不支持动态绑定**

```js
//$(selector)绑定事件，并且由自己触发
$(selector).on( 'click', function() {});
```

**on注册事件委托**

**支持动态绑定**

```js
// $(selector)绑定代理事件，必须是内部元素span才能触发
$(selector).on( 'click','span', function() {});
```

### 事件解绑

**unbind方式（不用）**

```javascript
$(selector).unbind(); // 解绑所有的事件
$(selector).unbind('click'); // 解绑指定的事件
```

**undelegate方式（不用）**

```javascript
$( selector ).undelegate(); // 解绑所有的delegate事件
$( selector).undelegate( 'click' ); // 解绑所有的click事件
```

**off方式（推荐）**

```javascript
$(selector).off();// 解绑匹配元素的所有事件
$(selector).off('click');// 解绑匹配元素的所有click事件
```

> 可链式操作 -  `$(selector).off('click').on('click')`

### 触发事件

```js
$(selector).click(); 
$(selector).trigger('click');// 触发 click事件
```

### jQuery事件对象

jQuery事件对象其实就是js事件对象的一个封装

- **screenX和screenY**：对应屏幕最左上角的值
- **clientX和clientY**：距离页面左上角的位置（忽视滚动条）
- **pageX和pageY**：距离页面最顶部的左上角的位置（会计算滚动条的距离）
- **event.keyCode**：按下的键盘代码
- **event.data**：存储绑定事件时传递的附加数据
- **event.stopPropagation()**：阻止事件冒泡行为
- **event.preventDefault()**：阻止浏览器默认行为
- **return false**：既能阻止事件冒泡，又能阻止浏览器默认行为

## jQuery动画效果

### 三组基本动画

- 显示(show)、隐藏(hide)、切换(toggle)
- 滑入(slideUp)、滑出(slideDown)、切换(slideToggle)
- 淡入(fadeIn)、淡出(fadeOut)、切换(fadeToggle)、固定透明度(fadeTo)

`$obj.show([speed], [callback])`

- **speed(可选)**：动画的执行时间
  - 无参无效果。如果是slide和fade系列，会默认为normal
  - 单位毫秒值
  - 固定数值字符串，slow(200)、normal(400)、fast(600)，传其他字符串，默认为normal
- **callback(可选)**：执行完动画后执行的回调函数

### 自定义动画

`$(selector).animate({params},[speed],[easing],[callback])`

- **{params}**：要执行动画的CSS属性，带数字（必选）
- **speed**：执行动画时长（可选）
- **easing**：执行效果，默认为swing（缓动）  可以是linear（匀速）
- **callback**：动画执行完后立即执行的回调函数（可选）

### 动画队列与停止动画

`stop(clearQueue, jumpToEnd)`

- **clearQueue**：是否清除队列
- **jumpToEnd**：是否跳转到最终效果

## jQuery节点操作

### 创建节点

`$(htmlStr)`

```js
$('<h1>这是标题</h1>')
```

### 添加节点

- **append/appendTo**：被选元素**结尾**插入内容
  - 父.append(子) 
  - 子.appendTo(父)
- **prepend/prependTo**：被选元素**开头**插入内容
  - 父.prepend(子)
  - 子.prependTo(父)
- **before/insertBefore**：被选元素之**前**插入内容
  - 后.before(前) 
  - 前.insertBefore(后)
- **after/insertAfter**：被选元素之**后**插入内容
  - 前.after(后)
  - 后.insertAfter(前)

>     append/prepend 元素内部嵌入
>
>     after/before 元素外面追加

### 清空节点/删除节点

- **empty**：清空指定节点的所有元素，**自身保留**

```javascript
$('div').empty(); // 清空div的所有内容（推荐使用，会清除子元素上绑定的事件）
$('div').html('');// 使用html方法来清空元素，不推荐使用，绑定的事件不会被清除。
```

- **remove**：相比于empty，**自身也删除**

>可接受一个参数，允许您对被删元素进行过滤

```javascript
$('div').remove();
$("div").remove(".it")
```

### 克隆节点

复制匹配元素

`$(selector).clone()`

- **false**：克隆元素本身及后代（**默认**）
- **true**：克隆元素本身及后代以及绑定的事件

## jQuery工具方法

### 数组对象操作

`$.inArray(value, array, [fromIndex])  `

判断值再数组中首次出现的位置（从0开始），没找到返回-1

- **value**：待查找的值
- **array**：待处理数组
- **fromIndex**：搜索数组队列（默认为0）

`$('选择器').toArray()`：把jQuery集合中所有DOM元素恢复成一个数组

`$.merge(first, second)`：合并数组

`$.parseJSON(str)`：解析json字符串对象。等价JSON.parse(str)

### 字符串操作

`$.trim(str)`：去除字符串两边空格， 等价str.trim()  

### 类型操作

`$.type(obj)`：判断数据类型，等价typeof

`$.isArray(obj)`：判断是否数组

`$.isFunction(obj)`：判断是否函数

`$.isEmptyObject(obj)`：判断是否空对象（没有成员）

`$.isPlainObject(obj)`：判断是否纯对象（字面量语法{}或实例化new 构造函数 定义的对象）

`$.isNumeric(obj)`：判断是否数字（数字型或字符串型数字）

## 插件

给jQuery增加方法的两种方式

```javascript
$.method = fn		//静态方法
$.extend({ 			//批量添加静态方法
	method: function () {}
})
$.fn.method = fn	//实例方法
$.fn.extend({  		//批量添加实例方法
	method: function () {}
})
```

### 常用插件

- 弹出层插件 layer
  
  - [layer插件](https://github.com/sentsin/layer)
- 放大镜插件
  
  - [jQuery.zoom](http://www.jacklmoore.com/zoom/)
- 轮播图插件
  - [http://sorgalla.com/jcarousel/](http://sorgalla.com/jcarousel/)
  - [https://github.com/OwlCarousel2/OwlCarousel2](https://github.com/OwlCarousel2/OwlCarousel2)
- 图片懒加载插件
  
  - [jQuery.lazyload](https://github.com/tuupola/jquery_lazyload)
- jQueryUI
  
- 常用的2-3个功能演示
  
- [图片放大](https://github.com/fat/zoom.js)

- [github上搜索](http://www.github.com)