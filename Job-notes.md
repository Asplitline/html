

# HTML

## ● http和https

https的**SSL加密是在传输层**实现的

### http和https的基本概念

**http**: 超文本传输协议，是一个**客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议**，它可以使浏览器更加高效，使网络传输减少。

**https**: **以安全为目标的HTTP通道**，简单讲是HTTP的安全版，即HTTP下加入SSL层，**HTTPS的安全基础是SSL**，因此加密的详细内容就需要SSL。

https协议主要作用：**建立一个信息安全通道，来确保数据的传输，确保网站的真实性**。

### http和https的区别

**http传输的数据都是未加密的，也就是明文的**，网景公司**设置了SSL协议来对http协议传输的数据进行加密**处理

https协议是由**http和ssl协议构建的可进行加密传输和身份认证的网络协议**，比http协议的安全性更高。

| http                               | https                                                | 说明 |
| ---------------------------------- | ---------------------------------------------------- | ---- |
|                                    | **需要ca证书，费用较高**                             |      |
| 超文本传输协议，信息是**明文传输** | 具有**安全性的ssl加密传输协议**                      | 传输 |
| **80**                             | **443**                                              | 端口 |
| 无状态的的连接                     | SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议 |      |

### https协议的工作原理

客户端在使用HTTPS方式与Web服务器通信时有以下几个步骤，如图所示。

```sequence
客户端->服务器: 访问服务器，要求web服务器建立ssl连接
Note right of 服务器: 
服务器->客户端: 返回网站证书（包含了公钥）
Note over 客户端,服务器:  协商安全(加密)等级(SSL链接等级)
Note over 客户端,服务器:  建立会话密钥，通过网站公钥加密会话密钥，传给网站
Note right of 服务器: 通过自己的私钥解除会话密钥
服务器->客户端:通过会话密钥加密与客户端之间的通信
```

### https协议的优点

- 认证用户和服务器，**确保数据发送到正确的客户机和服务器**
- 由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，可**防止数据在传输过程中不被窃取、改变，确保数据的完整性**。

### https协议的缺点

- https**握手阶段比较费时**，会使页面加载时间延长50%，增加10%~20%的耗电。
- https**缓存不如http高效**，会增加数据开销。
- **SSL证书费用**，功能越强大的证书费用越高。
- SSL证书需要绑定IP，**不能再同一个ip上绑定多个域名**，ipv4资源支持不了这种消耗。

## ● http状态码

| 状态码  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| 1xx     | **信息**状态码，表示服务器接**收到请求正在处理**             |
| 2xx     | **成功**状态码，表示服务器**正确处理完请求**                 |
| 3xx     | **重定向**状态码，表示请求的**资源位值发生改变**，需要重新请求。 |
| 4xx     | **客户端**的错误                                             |
| 500-599 | **服务器**错误                                               |
|         |                                                              |
| 100     | 继续，一般在post请求，已发送http header后服务端将返回此信息，<br />表示确认，之后发送具体参数信息`Continue` |
| 201     | 请求成功并且服务器创建了新的资源 `Created`                   |
| 301     | 请求的网页已永久移动到新位置 `Moved Permanently`             |
| 302     | 临时重定向 `Found`                                           |
| 303     | 临时重定向，且总是使用 GET 请求新的 URI。 `See Other`        |
| 304     | 让浏览器使用缓存 `Not Modified`                              |
| 400     | 服务器无法理解请求的格式，<br />客户端不应当尝试再次使用相同的内容发起请求。`Bad Request` |
| 401     | 请求未授权 - `Unauthorized`                                  |
| 403     | 禁止访问 - `Forbidden`                                       |
| 404     | 找不到与URI 相匹配的资源 - `Not Found`                       |
| 503     | 服务器端暂时无法处理请求（可能是过载或维护） `Service Unavailable` |

## ● GET POST区别

GET：GET一般用来获取数据；使用url传参；发送信息数据量有限；不安全，参数会暴露在url中；

POST：POST一般用来更新数据；通过提交表单传参；发送的信息量没有限制；安全，参数对用户不可见；

POST使用场景：需要向服务器传送大量数据时；需要安全性高时；需要更新服务器上的文件或者数据时；





## ● *tcp三次握手*

客户端和服务端都需要直到**各自可收发，因此需要三次握手**

TCP协议通过三个报文段完成连接的建立，这个过程称为三次握手(three-way handshake)

- **第一次握手**：建立连接时，客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认

  （SYN：同步序列编号(Synchronize Sequence Numbers)）

- **第二次握手**：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态

  （ACK：确认字符(Acknowledge character））

- **第三次握手**：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手

- 一个完整的三次握手也就是： **请求---应答---再次确认**

## ● Cookie的弊端

cookie虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。

### 特点

**数量：每个特定的域名下最多生成20个cookie**

1. IE6或更低版本最多20个cookie
2. IE7和之后的版本最后可以有50个cookie。
3. Firefox最多50个cookie
4. chrome和Safari没有做硬性限制

**缓存：cookie的最大大约为4096字节，一般不超过4095字节**

- IE和Opera会清理近期最少使用的cookie
- Firefox会随机清理cookie。

> **userData**：IE提供了一种存储可以持久化用户数据。这个持久化数据放在缓存中，如果缓存没有清理，那么会一直存在
>
> 从IE5.0就开始支持。每个数据最多128K，每个域名下最多1M。
>
> UserData其实就是javascript本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持web storage。

### 优点

**极高的扩展性和可用性**

1. 通过良好的编程，控制保存在cookie中的session对象的大小。
2. 通过加密和安全传输技术（SSL），减少cookie被破解的可能性。
3. 只在cookie中存放不敏感数据，即使被盗也不会有重大损失。
4. 控制cookie的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的cookie。

### 缺点

1. `Cookie`数量和长度的限制
2. 安全性问题。如果cookie被人拦截了，可以取得所有的session信息。即使加密也与事无补，拦截者只需要原样转发cookie就可以达到目的
3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

## ● 浏览器本地存储

html5中的Web Storage包括了两种存储方式：**sessionStorage 和 localStorage**。

高版本浏览器

- JS：提供了sessionStorage和globalStorage

- HTML5：提供了localStorage来取代globalStorage。

**sessionStorage**：本地存储一个会话（session）中的数据，这些数据只有**在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁**。sessionStorage是**非持久化**的本地存储，仅仅是**会话级别**的存储。

**localStorage**：**持久化**的本地存储，**除非主动删除数据**，否则数据是永远不会过期。

localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等

## ● web storage和cookie

**Web Storage是为了更大容量存储设计**。Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。

**Cookie的大小是受限**，并且每次你**请求一个新页面**的时候**Cookie都会被发送**过去，无形中**浪费带宽**，cookie还需要**指定作用域，不可以跨域调用**。

**Cookie**：与**服务器**进行交互，作为HTTP规范的一部分，**Web Storage**：在**本地“存储”**数据而生（IE７及以下不支持）

## ● 语义化的理解

1. **去掉或者丢失样式**的时候也能够让**页面呈现出清晰结构**
2. 对**SEO友好**，有**利于爬虫**，爬虫依赖于标签来确定上下文和各个关键字的权重；
3. **方便其他设备**解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页
4. 便于团队开发和维护，语义化**使得网页更具可读性**，可以**减少差异化**

## ● Doctype，严格模式与混杂模式

1. \<!DOCTYPE> 声明位于**文档最前面**，告知浏览器**以何种模式来渲染文档**

2. 严格模式的排版和JS 运作模式：以该**浏览器支持的最高标准**运行

3. 混杂模式：页面以**宽松的向后兼容**的方式显示。模拟老式浏览器的行为以防止站点无法工作。

4. DOCTYPE不存在或格式不正确，文档以混杂模式呈现

## ● HTML与XHTML

1. XHTML必须被**正确嵌套**， HTML嵌套不正确不会报错

2. XHTML必须被**闭合**(`\</br>`)， HTML空标签可以写成`\<br>`

3. XHTML标签必须**小写**， HTML可以大写

4. XHTML必须有**根元素**， HTML非必须

## ● HTML常见兼容性

1. **png24**图片在**ie6**浏览器上出现背景

解决：做成PNG8，也可以引用一段脚本处理.

2. 浏览器**默认margin和padding不同**

解决：` *{margin:0;padding:0;} `

3. **IE6双边距**bug：在IE6下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。

```css
#box{ float:left; width:10px; margin:0 0 0 10px;} 
```

这种情况之下IE会产生20px的距离

解决：在float的标签样式控制中加入` _display:inline;` 将其转化为行内属性。( _ 这个符号只有ie6会识别)

4. **渐进识别**的方式，从总体中逐渐排除局部。 

首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。 

接着，再次使用 "+" 将IE8和IE7、IE6分离开来，这样IE8已经独立识别。

```css
.bb{
    background-color:#f1ee18; /*所有识别*/
    .background-color:#00deff\9; /*IE6、7、8识别*/
    +background-color:#a200ff; /*IE6、7识别*/
    _background-color:#1e0bd1; /*IE6识别*/ 
} 
```

5. **IE**下，可用获取**常规属性方法**来获取自定义属性，也可用 **getAttribute()** 获取自定义属性；**Firefox**，**只用getAttribute()**获取自定义属性

解决：统一通过getAttribute()获取自定义属性

6. **IE**下，event对象**有 x、y 属性**，但是**无 pageX、pageY**属性; **Firefox**下，event对象**有 pageX、pageY** 属性，但是**无 x、y** 属性

解决：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

7. **Chrome**中文界面下**默认小于12px** 的文本强制**按12px** 显示

解决：可通过加入 CSS 属性 ~~`-webkit-text-size-adjust: none;`~~解决，现使用`transform:scale()`

8. 超链接访问过后hover样式就不出现了，**被点击访问过**的超链接样式**不再具有 hover 和 active** 

解决：改变CSS属性的排列顺序 L-V-F-H-A

```
a:link {}
a:visited {}
a:focus {}
a:hover {}
a:active {}
```

9. **怪异模式**问题：**漏写 DTD** 声明，Firefox 仍然会按照标准模式来解析网页，但在 IE 中会触发怪异模式

解决：为避免怪异模式给我们带来不必要的麻烦，最好养成书写 DTD 声明的好习惯。现在可以使用html5推荐的写法：`<!DOCTYPE html>`

10. **上下margin重合**：ie和ff都存在，相邻的两个div的`margin-left和margin-right`不会重合，但是`margin-top和margin-bottom`却会发生重合。

解决：同时采用**`margin-top`或`margin-bottom`

## ● HTML5

### 新特性

1. **拖拽**释放`Drag and drop`)
2. **语义化更好**`header,nav,footer,aside,article,section`
3. **音频、视频**`audio,video`
4. **画布**`Canvas`
5. **地理**`Geolocation`
6. `localStorage`长期存储数据，浏览器关闭后数据不丢失。`sessionStorage`在浏览器关闭后删除
7. **表单控件**，calendar、date、time、email、url、search  
8.  webworker, websocket, Geolocation

### 移除的元素

1. 纯表现的元素：`basefont，big，center，font, s，strike，tt，u`
2. 可用性产生负影响：`frame，frameset，noframes`

### 新标签

IE8/IE7/IE6支持通过 document.createElement 方法产生的标签，

利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式

最好的方式是直接使用成熟的框架、使用最多的是`html5shiv`框架

```html
<!--[if lt IE 9]> 
<script> src="http://html5shiv.googlecode.com/svn/trunk/html5.js"</script> 
<![endif]--> 
```

## ● iframe的优缺点

**优点**

1. 解决加载缓慢的第**三方内容**如图标和广告等的**加载**问题

2. **Security** sandbox

3. **并行**加载脚本

**缺点**

1. iframe**会阻塞主页面**的Onload事件

2. 即时**内容为空，加载也需要时间**

3. 没有语义

## ● 性能优化

1. 减少http请求次数：CSS Sprites, JS、CSS 源码压缩、图片大小控制合适；网页启用Gzip压缩文件 ，data 缓存 ，图片服务器
2. CDN 托管，降低通信距离 
3. 添加Expire/Cache-Control头 
4. .图片预加载，将样式表放在顶部，将脚本放在底部，加上时间戳。
5. 避免在css中使用表达式，将css, js都放在外部文件中，减小文件体积，移除重复脚本
6. 减少DNS查询 
7. 避免重定向
8. 用 innerHTML 代替 DOM 操作，减少 DOM 操作次数，优化 javascript 性能
9. 使用AJAX缓存，让网站内容分批加载，局部更新

使用CDN（内容分发网络）来托管资源

基本思路：尽可能**避开**互联网上有可能**影响数据传输速度和稳定性的瓶颈和环节**

CDN系统：实时的根据**网络流量和各节点的连接、负载状况以及到用户的距离和响应时间**等综合信息将用户的请求重新导向离用户最近的服务节点上。

## ● 优化页面加载

1. 优化图片
2. 图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方） 
3. 优化CSS（压缩合并css，如 margin-top, margin-left...) 
4.  网址后加斜杠（如www.campr.com/目录，会判断这个目录是什么文件类型，或者是目录） 
5. 标明高度和宽度（如果浏览器没有找到这两个参数，需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影响浏览体验）
6. 减少http请求（合并文件，合并图片）

## ● document.write和 innerHTML

`document.write` **重绘整个页面**

`innerHTML` 可以**重绘**页面一部分

## ● 优雅降级和渐进增强

### 优雅降级

一开始就构建站点的完整功能，然后针对浏览器测试和修复。比如一开始使用 CSS3 的特性构建了一个应用，然后逐步针对各大浏览器进行hack使其可以在低版本浏览器上正常浏览

### 渐进增强

一开始就针对低版本浏览器进行构建页面，完成基本的功能，然后再针对高级浏览器进行效果、交互、追加功能达到更好的体验。

## ● 输入URL到页面加载

1. 在浏览器**输入url地址**
2. **查看**浏览器缓存-系统缓存-路由器**缓存**，如果缓存中**有**，直接在屏幕**显示**页面，如果没有直接第三步
3. **域名解析**，获得相应的IP地址
4. 浏览器向服务器**发送tcp连接**，建立tcp三次握手
5. 浏览器向服务器**发送http请求**
6. **服务器处理**收到的**请求**，向浏览器**发送数据**
7. 浏览器**收到http响应**
8. 读取页面内容，渲染页面，解析html源码
9. 生成**dom树**，解析**css样式**、**js代码**
10. 客户端与服务端交互
11. ajax查询

## ● AJAX

通过**异步模式**，**优化**了浏览器和服务器之间**传输**，**减少不必要的数据往返**，**减少带宽占用**

Ajax在**客户端运行**，承担部分本来由服务器承担的工作，**减少**服务器**负载**

**特点**

- 局部刷新
- readyState属性： 0 = 未初始化，1 = 启动， 2 = 发送，3 = 接收，4 = 完成

**缺点**

- **不支持**浏览器**back**按钮
- 安全问题，**暴露**与服务器交互细节
- 对搜索引擎支持(**SEO**)比较弱
- **破坏**程序**异常机制**
- 不易调试

## ● 跨域问题

1. **jsonp**（jsonp 的原理是动态插入 script 标签）
2. document.**domain** + **iframe**
3. 服务器上设置代理页面
4. **Hash**(hash改变，页面是不刷新的，？后是search，改变时会刷新页面) 
5. postMessage（新技术，h5的标准） 
6. **WebSocket**
7. **CORS**（支持跨域通信变种Ajax。当你在浏览器中发送一个ajax跨域请求时，浏览器会在http头中加入一个origin。）

## ● UA

浏览器标识（UA）可以使得服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本、浏览器渲染引擎、浏览器语言、浏览器插件等

# CSS

## ● display:none和visibility:hidden

**display:none** ：隐藏对应的元素，在文档布局中**不再分配空间**

**visibility:hidden**：隐藏对应的元素，但是在文档布局中仍**保留原来空间**。

## ●  link 和@import 

| link                         | @import              |
| ---------------------------- | -------------------- |
| HTML标签                     | CSS                  |
| 页面**加载同时**，link被加载 | 页面**加载完成**加载 |
| 无兼容问题                   | IE5以上才能识别      |

> `@import` 容易导致 FOUC（无样式内容闪烁）

## ● display 和 position

**display**

1. `block`：块元素，可设置宽高

2. `inline`：行内元素类型，不可设置宽高**（默认）**

3. `inline-block`：行内元素，可设置宽高

4. `list-item`：块元素，添加样式列表标记

**position**

1. `absolute`：绝对定位，相对于 static 定位以外的**第一个祖先元素**进行定位。

2. `fixed`：固定定位，**相对于浏览器窗**口进行定位（老IE不支持）

3. `relative`：相对定位，**相对自身**在普通流中的位置进行定位

4. `static`：没有定位，元素出现在正常的流**（默认）**

5. `inherit`：从父元素继承 position 属性的值。

### ● position:absolute与position:fixed

| 共同点                                            | 不同点                            |
| ------------------------------------------------- | --------------------------------- |
| 改变行内元素的呈现方式，display被置为inline-block | absolute的”根元素“是**可以设置**  |
| 元素脱离普通流，不占据空间                        | fixed的”根元素“**固定浏览器窗口** |
| 默认会覆盖到非定位元素上                          |                                   |

## ● css盒子模型

**盒模型**： 内容(content)、填充(padding)、边界(margin)、 边框(border)

- 标准 W3C 盒子模型
  - **box-sizing: content-box**
  - ` width=content+padding+border`
- IE盒子模型
  - **box-sizing：border-box**
  - `width=content`

## ● CSS 选择器

### 选择符

1. `id选择器 (#myid)`
2. `类选择器 (.myclassname)`
3. `标签选择器(div, h1, p)`
4. `相邻选择器(h1 + p)`
5. `子选择器 (ul > li)`
6. `后代选择器(li a)`
7. `通配符选择器( * )`
8. `属性选择器(a[rel = "external"])`
9. `伪类选择器(a: hover, li:nth-child)`

### 可继承样式

1. `font-size`
2. `font-family`
3. `color`
4. `text-indent`
5. `display`

### 不继承样式

1. `border`
2. `padding`
3. `margin`
4. `width`
5. `height`

### 优先级算法

1. 优先级**就近原则**，同权重情况下样式定义最近者为准
2. 载入样式以最后载入的定位为准
3. !important >  id > class > tag  
4. important 比 内联优先级高，但内联比 id 要高

### CSS3新增伪类

| 伪类                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| `p:first-of-type`    | 属于其父元素的首个元素的每个元素                 |
| `p:last-of-type`     | 选择属于其父元素的最后 <p> 元素的每个 <p> 元素。 |
| `p:only-of-type`     | 选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。 |
| `p:only-child`       | 选择属于其父元素的唯一子元素的每个 <p> 元素。    |
| `p:nth-child(2)`     | 选择属于其父元素的第二个子元素的每个 <p> 元素。  |
| `:enabled :disabled` | 控制表单控件的禁用状态。                         |
| `:checked`           | 单选框或复选框被选中。                           |

## ● CSS3新特性

1. 实现**圆角**（border-radius），**阴影**（box-shadow）（text-shadow）
2. **线性渐变**（gradient）
3. **旋转,缩放,定位,倾斜** 
   1. transform:rotate(9deg) 
   2. scale(0.85,0.90) 
   3. translate(0px,-30px)
   4.  skew(-9deg,0deg)
4. CSS选择器  多背景 **rgba**
5. 在CSS3中唯一引入的伪类是 **::selection**
6. **媒体查询**，**多栏布局**
7. **border-image**

## ● 初始化CSS样式

**浏览器的兼容问题**，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现**浏览器之间的页面显示差异**，初始化样式**会对SEO有一定影响**

`淘宝样式初始化`

```css
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; } 
```

## ● BFC

**块格式化上下文**（Block Formatting Context，BFC）是Web页面的可视化**CSS渲染的一部分**，是布局过程中**生成块级盒子的区域**，也是**浮动元素与其他元素的交互限定区域**。

### BFC特性

-  **BFC中**元素**布局不受外部**影响，**也不会影响其他环境元素**
-  浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以**两个浮动元素之间是互不影响的**
-  盒子**从顶端开始垂直排列**，盒子之间**垂直间距是由margin**决，两个**相邻块级盒子**的**垂直外边距会重叠**
-  BFC区域**不会与 float **发生**重叠**，能**识别并包含浮动元素**，当计算其区域的高度时，**浮动元素会参与计算**
- 每个元素的**左外边距**与**包含块的左边界**相接触（从左到右），即BFC中的子元素不会超出它的包含块，除`absolute`

### BFC创建

1. **根元素**或**包含根元素**的元素
2. **浮动元素** `float : left | right | inherit`**（≠ none）**
3. **绝对定位元素** `position : absolute | fixed`
4. `display : inline-block | flex | inline-flex | table-cell | table-caption`
5. `overflow : hidden | auto : scroll` **(≠ visible)**

> `display：table`也可生成BFC，主要原因在于Table会默认生成一个匿名的`table-cell`（生成了BFC）

### BFC作用

####  清除浮动（包含浮动元素）

1. 父元素的**高度无法被撑开**，影响与父元素同级的元素

2. 浮动元素同级的**非浮动元素会跟随其后**

3. 若非第一个元素浮动，则该**元素之前的元素也需要浮动**，否则会影响页面显示的结构

> `clear:both` 可解决2，3

- **高度塌陷**：**浮动元素**、**绝对定位**元素**会脱离文档流**，导致**无法计算准确高度**
- 解决前提：**能够识别并包含浮动元素**，也就是**清除浮动**，在容器中**创建BFC**

##### 1.给父元素设置高度

 (不推荐，高度一般可变)

##### 2.额外标签法(隔墙法)

在浮动元素末尾添加一个空的标签

缺点： 添加无意义标签，结构化差

```css
<div class='clear'></div>
.clear{clear: both;}
```

##### 3.父级添加overflow属性方法

-  `overflow:auto`:溢出产生滚动条
- `overflow:hidden`:溢出全部隐藏

内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素

##### 4.使用after伪元素清除浮动(推荐)

  - `\200B` - 零宽度空格，也可用 `.` ，可以不写
  - `block` - 以块级显示，占满剩余空间
  - `height` - 避免破坏原有布局
  - `clear:both` - 清除浮动
  - `visibility`  - 隐藏

```css
.clearfix:after { 
     content: "\200B"; 
     display: block; 
     height: 0; 
     clear: both;
     visibility: hidden; 
} 
 .clearfix {*zoom: 1;}   /* IE6、7 专有 */
```


  > *zoom - 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout

##### 5.使用双伪元素清除浮动(推荐)

table - 创建匿名单元格触发 bfc

```css
.clearfix:before,.clearfix:after { 
  content:"";
  display:table; 
}

.clearfix:after {
 clear:both;
}
.clearfix {
  *zoom:1;
}
```

##### 6.浮动外部元素

需要连续浮动

#### 导致外边距折叠

**相邻**的两个盒子（可能是兄弟关系也可能是祖先关系）的**垂直边距**形成一个外边距。外边距为**两方外边距最大者**

外边距折叠（Margin collapsing）**只会发生在属于同一BFC的块级元素之间**。

创建一个新的BFC解决，通常`overflow:hidden`

## ● CSS sprites

CSS Sprites 

1. 把网页中一些背景图片**整合到一张图片**文件中
2. 利用 CSS 的`background-image`，`background-repeat`，`background-position` 的组合进行背景定位。`background-position` 用数字能精确的定位出背景图片的位置
3. 可以**减少图片请求开销**，因为请求耗时比较长
4. 请求虽然**可以并发**，但是**有限制**，一般浏览器都是6个

# JS

## ● DOM操作

1. 创建新节点

```js
createDocumentFragment() // 创建一个DOM片段
createElement() // 创建一个具体的元素
createTextNode() // 创建一个文本节点
```

2. 添加、移除、替换、插入

```js
appendChild()
removeChild()
replaceChild()
insertBefore() // 在已有的子节点前插入一个新的子节点
```

3. 查找

```js
getElementsByTagName() // 通过标签名称
getElementsByName() // 通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById() // 通过元素Id，唯一性
```

## ● null和undefined

| null                      | undefiend                     |
| ------------------------- | ----------------------------- |
| "无"的对象，转为数值时为0 | "无"的原始值，转为数值时为NaN |
| 尚未存在的对象            | 已声明，未初始化的变量        |
| 该处不应该有值            | “缺少值”，应有值，还未定义    |

**undefined**

1. 变量被声明了，但**没有赋值**时，就等于 undefined
2. 调用函数时，**没有提供参数**，该参数等于 undefined
3. 对象**没有赋值属性**，该属性的值为 undefined
4. 函数**没有返回值**时，默认返回 undefined

**null**

1. 作为函数的参数，表示该函数的**参数不是对象**
2. 作为对象**原型链的终点**

## ● new操作符

1. **创建**一个空对象，并且 **this 变量引用**该对象，同时还**继承该函数的原型**
2. **属性和方法**被**加入**到 this**引用对象**
3. 新创建的对象由 this 所引用，并且最后隐式的**返回 this**

```js
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj); 
```

## ● 内存泄露

内存泄漏：任何对象在您**不再拥有或需要它之后仍然存在**

**回收机制**：垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的唯一引用是循环的，那么该对象的内存即可回收

1. **setTimeout** 的**第一参数使用字符串**而非函数的话，会引发内存泄漏。
2. **闭包**
3. **控制台**日志
4. 循环（在**两个对象彼此引用**且彼此保留时，就会产生一个循环）

## ● 对象创建方式

```js
// 1、字面量
     const obj = {a:1} 
// 2、构造函数 
     function Obj(val){ 
         this.a = val; 
     }
     const obj = new Obj(1); 
// 3、Object.create
     const obj = Object.create({a:1}); 
// 4、ES6 class 
    class obj{ 
       constructor(){ 
           this.a = 1; 
        }
    }
```

## ● 继承方式

https://www.cnblogs.com/ranyonsue/p/11201730.html

## ● AJAX过程

1. **创建XMLHttpRequest对象**,也就是创建一个异步调用对象
2. 创建一个**新的HTTP请求**,并指定该HTTP请求的方法、URL及验证信息
3. 设置**响应**HTTP请求状态变化的**函数**
4. **发送**HTTP请求
5.  **获取**异步调用返回的**数据**
6. 使用JavaScript和**DOM实现局部刷新**

## ● 异步加载和延迟加载

1. 异步加载的方案： 动态插入 **script 标签**
2. 通过 ajax 去获取 js 代码，然后通过 **eval 执行**
3. script 标签上添加 defer 或者 async 属性
4. 创建并插入 **iframe**，让它异步执行 js
5. **延迟加载**：有些 js 代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的

## ● 同源策略

**同源**：相同**域名**、**端口**、**协议**，三者相同视为同源

本域下JS脚本只能读写本域下的数据资源，无法访问其他域资源

**同源策略**：浏览器**保护**用户的**个人信息以及企业数据安全**的策略，不同源是不能在对方未允许的情况下访问或索取对方的数据信息，否则 Cookie 可以共享

## ● 严格模式

1. 消除Javascript语法的一些**不合理**、不严谨之处，减少一些怪异行为

2. 消除代码运行的一些**不安全**之处，保证代码运行的安全

3. 提高编译器**效率**，增加运行速度

4. 为未来新版本的Javascript做好**铺垫**

## ● JS 阻塞

**js阻塞**：所有浏览器下载js时都会阻止其他一切活动

**css阻塞**：当css后面跟着嵌入的js时，会产生css阻塞

**嵌入JS放置位置**

- 放在**底部**照样会阻塞所有呈现，但**不会阻塞资源下载**
- 嵌入JS放在**head**中，请把嵌入JS放在CSS头部
- 使用**defer** （只支持IE）
- 嵌入JS中调用运行时间较长函数，如果一定要用，可以用 setTimeout 来调用

**JS无阻塞加载**

1. **脚本放在底部**。\<link>放在head中，保证在js加载前，能加载出正常页面。\<script>标签放在\</body>前。

2. **阻塞脚本**：由于每个\<script>标签下载时阻塞页面解析过程，所以限制页面的**\<script>数量**也可以改善性能。适用于内联脚本和外部脚本。

3. **非阻塞脚本**：等页面**完成加载**后，再加载js代码。也就是，在 window.onload 事件发出后开始下载代码。

4. **defer**属性：支持IE4和fierfox3.5更高版本浏览器

5. **动态脚本元素**：文档对象模型（DOM）允许你使用js**动态创建**HTML的几乎全部文档内容

## ● eval

把字符串**解析为JS代码**并执行，**不安全**，**耗性能**（一次解析，一次执行）

## ● 原型、原型链

每个对象都有一个内部属性prototype（原型），称为**原型**，原型的值可以是一个对象，也可以是null，如果它的值是一个对象，那么这个对象也有prototype，这样就构成了一个线型的链，即原型链

**原型链**：由一些用来继承和共享属性的对象组成的对象链

# Node

## ● 如何判断脚本运行在浏览器还是node环境

 可以通过该全局变量是否定义来判断宿主环境

**node**中的全局变量是**global** ,**浏览器**的全局变量是**window**

## ● Node的优点和缺点

- `Single Thread`  单线程
  - 为了在低硬件服务器条件下高并发，所以就减少内存消耗，选择了单线程
- `Non-blocking`   I/O非阻塞
  - 单线程，当A去I/O处理B，B去I/O去处理C，依次循环，ABC都有回调函数
- `Event Driven`   事件驱动
  - 为了让A、B不乱套，每个人都进行合理调度，谁先来处理谁，不能让B一直等待，处理C、D、E，所以Node使用了一个机制叫事件环，采用事件驱动来调度事件

### 优点

1. 因为Node是**基于事件驱动**和**无阻塞**的，所以适合处理**并发请求**，因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多
2. **客户端和服务器端都用同一种语言编写**
3. 支持高并发、实时消息推送、聊天等场景。

### 缺点

1. node.js**更新很快** 会出现版本兼容问题 并且也**缺少足够多第三方库支持**
2. 单线程通病：**处理CPU密集型吃力**，可以将密集拆分，但效果有限

# 其他

## ● 前端安全

**XSS**（cross-site-scripting）： 跨站脚本攻击，指通过存在web安全漏洞的web网站注册的用户的浏览器内运行非法的html标签或者js而进行的攻击。用户通过在自己的浏览器上运行这些脚本就会被攻击。

**sql注入**：针对web应用使用的数据库，通过运行非法的SQL而产生的攻击。

**OS命令注入攻击**：通过web应用，执行非法的操作系统命令达到非法攻击的目的。

**HTTP首部注入攻击**：攻击者通过在相应首部字段内插入换行，然后添加任意响应首部过主体的攻击。 

**邮件首部注入攻击**：指攻击者通过向邮件首部to或subject内任意添加非法内容引起的攻击。

 **会话劫持**：指攻击者通过某种手段拿到了用户的会话id，并非法使用此会话id伪装成用户达到攻击的目的。 

**DoS DDoS**：一种让运行中的服务成停止状态的攻击。

 **CSRF**：跨站点请求伪造攻击，指的是攻击者通过设置好的陷阱，强制对已完成认证的用户进行非预期的个人信息或设定信息等某些状态更新，属于被动攻击。

完成CSRF需要两个步骤：

1. 登陆受信任的网站A，在本地生成 COOKIE
2. 在不登出A的情况下，或者本地 COOKIE 没有过期的情况下，访问危险网站B。

## ● 网站重构

不改变外部行为的前提下，简化结构、添加可读性，网站前端保持一致的行为。（**UI不变**）

1. **表格**  (table)  布局**改**为 **DIV + CSS** 
2. 使网站前端**兼容**于现代浏览器  (  针对于不合规范的  CSS  、如对   IE6   有效的  ) 
3. 对于**移动平台**的优化  
4.  针对于**SEO**进行优化  
5.  **减少**代码间的**耦合**  
6. 严格按**规范编写**代码  
7.  设计**可扩展  API** 
8. **压缩** JS 、 CSS  、image  等前端资源
9. 程序的**性能优化**(  如数据读写  ) 
10. 采用**CDN**  来加速资源加载  
11. 对于**JS DOM**  的优化  
12. HTTP服务器的**文件缓存**

# TODO

[javascript里面的继承怎么实现，如何避免原型链上面的对象共享](https://www.nowcoder.com/questionTerminal/b58a27e6bb22473bae2419367a00d52d)

[写一个通用的事件侦听器函数](https://www.nowcoder.com/ta/front-end-interview/review?page=64)

[WEB应用从服务器主动推送Data到客户端有那些方式？](https://www.nowcoder.com/questionTerminal/368d0dc20a4f479faa7b0892be854625)

[事件、IE与火狐的事件机制有什么区别？ 如何阻止冒泡？](https://www.nowcoder.com/questionTerminal/71214cb3c5004c2f8c9bd5ee75f54cfc)

[js对象的深度克隆代码实现](https://www.nowcoder.com/questionTerminal/eb16831ab32b4cfaaf9f4ee313469f9f)

[JS数组去重](https://github.com/myDancer/arrayDeduplication/blob/master/arrayDeduplication.js)

[cache-control](https://www.nowcoder.com/ta/front-end-interview/review?query=&asc=true&order=&page=76)

[JS获取cookie](https://www.nowcoder.com/ta/front-end-interview/review?query=&asc=true&order=&page=77)

# https://www.nowcoder.com/ta/front-end-interview/review?page=53

