## 精灵图

网页加载每一张图片都需要对服务器进行一次请求，所以对服务器的负荷会很大，可以将多个小图放到一张大图上，每个地方使用小图片都对大图进行背景定位即可，这样只需要加载一张大图片，对服务器只做一次请求，可以减少服务器的开销，提供网站的性能

**精灵图制作**

- 打开ps，新建图片，空白背景
- 堆叠图片，修改图层名字
- 隐藏背景，ctrl+s存储，选择png

[精灵图处理](http://www.spritecow.com/)

## CSS实现三角形

- 宽度高度为0
- 兼容低版本的浏览器，加上 `font-size: 0;  line-height: 0;`
- 4个边框都要写， 保留的边框，其余的不能省略 

```css
 div {
 	width: 0; 
    height: 0;
    line-height:0；
    font-size: 0; 
	border-top: 10px solid red;
	border-right: 10px solid green;
	border-bottom: 10px solid blue;
	border-left: 10px solid #000; 
 }
p {
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent red;
}
```

<img src="03-CSS实战_image/image-20201207170254225.png" alt="image-20201207170254225" style="zoom:300%;" />

> 顺时针：上-右-下-左
