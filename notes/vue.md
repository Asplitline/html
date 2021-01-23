

# Vue介绍

## 开发工程师发展历史

![Snipaste_2018-10-13_14-13-19](Vue_image/Snipaste_2018-10-13_14-13-19.png)

第二阶段的工程化演进中，有一个重要的工程设计理念诞生，MVC 设计模式，MVC 其实就是为了项目工程化的一种分工模式

![](Vue_image/Snipaste_2018-10-13_21-43-05.png)

MVC 中的**最大缺点就是单项输入输出，所有的 M 的变化及 V 层的变化，必须通过 C 层调用才能展示**；

随着前端技术及前端工程化体系的发展成熟，参考MVC的设计理念，前端出现了 **MVVM 的设计思想**，**在前端实现数据层与展示层的相互调用，降低业务层面的交互逻辑**

## [Vue](https://cn.vuejs.org/ )

Vue是一套用于构建用户界面的**渐进式框架**

> Vue **不支持** IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性

**两种引入**

```html
<script src="https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.cjs.js"></script>
<script src="vue.js"></script>
```

# [Vue实例对象](https://cn.vuejs.org/v2/guide/instance.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-Vue-%E5%AE%9E%E4%BE%8B)

通过`Vue`函数创建新的Vue实例

```html
<body>
    <div id="div">
        {{user_name}}
    </div>
</body>
<script src="./vue.js"></script>
<script>
    var app = new Vue({
        el:'#div',  // 设置要操作的元素
        data:{//替换的数据
            user_name:'我是一个div' 
        }
    })
    // 打印Vue实例对象
    console.log(app);
</script>
```

Vue实例对象

- `$`开头：公有属性
- `_`开头：私有属性

> 虽然data为私有属性，但data中数据需要在外部使用，所以Vue将data属性直接挂载在Vue实例中。通过`app.user_name`调用

# [模板语法-插值](https://cn.vuejs.org/v2/guide/syntax.html#%E6%8F%92%E5%80%BC)

用 `{{}}`  获取值得方式，叫做  **插值**  或  **插值表达式**

>“Mustache”语法 (双大括号) 

```html
<body>
    <div id='app'>
        <!-- html代码也会以文本显示 -->
        <s>{{us}}</s>
        <!-- 使用运算符 -->
        {{us>3?'big':'small'}}
        <!-- 函数调用 -->
        {{hh()}}
        <!-- 对象调用 -->
        {{obj.name}}
        <!-- 不能些逻辑代码 -->
    </div>
</body>
<script>
    var app = new Vue({
        el:'#app',
        data:{
            us:1,
            hh:function(){
                return 1+2;
            },
            obj:{
                name:'myqz'
            }
        }
    });

</script>
```

无论何时，绑定的数据对象上 `us` 属性发生了改变，插值处的内容都会更新

# [模板语法-指令](https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)

**指令 (Directives)** ：带有 **v- 前缀**的特殊特性 

**指令特性的值**：预期是**单个 JavaScript 表达式** (**v-for例外**)。

**指令职责**：表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

## v-if

```html
	<div id='app'>
        <p v-if='kk'>看不见</p>
        <p v-if='ss'>看得见</p>
        <input type="text" v-model='type'>
        <div v-if='type==="A"'>我是A</div>
        <div v-else-if='type==="B"'>我是B</div>
        <div v-else-if='type==="C"'>我是C</div>
        <div v-else>不存在</div>
    </div>
<script>
        var app = new Vue({
            el: '#app',
            data: {
                kk: 0,
                ss: 1,
                type: ''
            }
    })
</script>
```

## v-text,v-html

**v-html**、**v-text**、**插值表达式都是替换标签内容

- **v-html** 解析并展示
- **v-text**和**插值表达式**原样展示
- **v-text**和**v-html**全部替换
- **插值表达式**局部替换

```html
<body>
    <div id='app'>
        <p v-text='text'>xx</p>
        <p v-html='text'>xx</p>
        <p>xx{{interpolation}}</p>
    </div>
</body>
<script>
    var app = new Vue({
        el:'#app',
        data:{
            text:'<s>text</s>',
            html:'<s>html</s>',
            interpolation:'<s>interpolation</s>',
        }
    });
</script>
```

> HTML 属性不能用 `{{}}` 语法

## [v-bind](https://cn.vuejs.org/v2/api/#v-bind)

绑定标签上的任何属性

`v-bind:属性名`

> 简写 `:属性名`

```html
 <style>
    .g{background: red;}
    .ft{font-size: 30px;}
    .r{background: green;}
</style>

<body>
  <div id='app'>
    <!-- src -->
    <img v-bind:src='img_path' alt="" style="width: 100px;">
    <!-- href -->
    <a v-bind:href="'http://127.0.0.1:12/getone?id='+ids">click</a>
    <!-- 字符串需用引号,值不需要 -->
    <!-- class -->
    <!-- 1.object -->
    <div v-bind:class="{g:isg,ft:isg}">class object</div>
    <!-- 2.array -->
    <div v-bind:class="[color,fSize]">class array</div>
    <!-- style -->
    <!-- 1.object -->
    <div v-bind:style="{color:c,fontSize:size+'px'}">style object</div>
    <!-- 2.array -->
    <div v-bind:style="[c,f]">style array</div>

  </div>
</body>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      img_path: '../pic/F_2014_365.jpg',
      ids: 13,
      isg: true,
      color: 'r',
      fSize: 'ft',
      size:32,
      c:{
        color:'pink'
      },
      f:{//变量命名中不能含 - ,font-size 改为 fontSize
        fontSize:'50px'
      }
    }
  });
</script>
```

## 数据绑定

**单向数据绑定**：通过 vue 对象修改数据可以直接影响到 DOM 元素，但是，如果直接修改 DOM 元素，却不会影响到 vue 对象的数据

```html
<div id="div">
    <input type="text" :value="input_val">
</div>

<script>
    var app = new Vue({
        el: '#div',
        data: {
            input_val: 'hello world '
        }
    })
</script>
```

**浏览器渲染结果**： `<div id="div"><input type="text" value="hello world"></div>`

**通过浏览器 REPL 环境**修改： `app.input_val = 'Vue'`  

**浏览器渲染结果**： `<div id="div"><input type="text" value="Vue"></div>`



**双向数据绑定**：不管 DOM 元素还是 vue 对象，数据的改变都会影响到另一个

**v-model**

```html
<input v-model="searchText">
```

**等效写法 - 普通**

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value">
```

**等效写法 - 组件**

```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

**在组件中需要手动绑定input的值**

 ```html
v-on:input="$emit('input', $event.target.value)"
 ```



**双向数据绑定的应用范围**

```html
<body>
    <div id='app'>
        <p v-text='t'>123</p>
        {{s}}
        <!-- 1.单向数据绑定 -->
        <!-- 数据改变,页面也会改变 -->
        <input type="text" :value='oneWay'>
        <!-- 2.双向数据绑定 -->
        <!-- 数据改变,页面改变.页面改变,数据改变 -->
        <input type="text" v-model='twoWay'>
        <!--   v-model只能展示在用户可操作的元素上 -->
        <!-- <p v-model='p'>1231</p> -->
        <!-- 多行文本 -->
        <textarea v-model='texta'></textarea>
        <label>{{texta}}</label><br>
        <!-- 复选框 -->
        <!-- 单选 -->
        <input type="checkbox" v-model='checked'>
        <label>{{checked}}</label><br>
        <!-- 多选 -->
        <input type="checkbox" value='one' v-model='checkeds'>
        <label>one</label><br>
        <input type="checkbox" value='two' v-model='checkeds'>
        <label>two</label><br>
        <input type="checkbox" value='three' v-model='checkeds'>
        <label>three</label><br>
        <label>{{checkeds}}</label><br>
        <!-- 单选框 参考复选框 -->
        <!-- 选择框 -->
        <!-- 单选 -->
        <select v-model='selected'>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <label>{{selected}}</label><br>
        <!-- 多选 -->
        <select v-model='selecteds' multiple>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <label>{{selecteds}}</label><br>
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            t: '123',
            s: '456',
            oneWay: 'aaaa',
            twoWay: 'bbbb',
            texta: '',
            checked: '',
            checkeds: [],
            selected: '',
            selecteds: []
        }
    })
</script>

```

**[修饰符](https://cn.vuejs.org/v2/guide/forms.html#%E4%BF%AE%E9%A5%B0%E7%AC%A6)**

`.lazy`： 在每次 `input` 事件触发后将输入框的值与数据进行同步

`.number`：将用户的输入值转为数值类型

`.trim`：过滤用户输入的首尾空白字符

## [v-on](https://cn.vuejs.org/v2/api/#v-on)

https://cn.vuejs.org/v2/guide/events.html

```html
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            cli:function(){
                alert('123');
            }
        }
    });
</script>
```

代码没有问题，不建议这样做。

 **data**：专门提供数据的对象，事件触发需要执行的是一段代码（方法）

修改代码如下：

```html
<div id="app">
    <!-- 使用事件绑定的简写形式 -->
    <input type="button" value="按钮" @click="cli1">
    <input type="button" value="按钮" @click="cli2(1,3)">
    <input type="button" value="按钮" @click="cli3(1,3,$event)">
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {},
        // 将事件处理程序写入methods对象
        methods: {
            cli1: function () {
                alert('123');
            },
            //普通传参
            cli2: function (a,b) {
                alert(a+b);
           },
            //参数含事件对象
            cli3: function (a,b,ev) {
                alert(a+b);
        		console.log(ev);
           }
        }
    });
</script>
```

> 在处理器中需要使用事件对象，则无法获取，我们可以用特殊变量 `$event` 把它传入方法

### [事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- `.stop` - 调用 `event.stopPropagation()`，
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。

>内部元素触发的事件先在此处理，然后才交由内部元素进行处理

- `.self` - 当事件从侦听器绑定元素本身触发时才触发回调，即事件不是从内部元素触发

>`v-on:click.prevent.self` 会阻止**所有的点击**
>
>`v-on:click.self.prevent` 只会阻止对元素自身的点击。

- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调
- `.native` - 监听组件根元素的原生事件
- `.once` - 只触发一次回调，即事件只触发一次
- `.left` - (2.2.0) 只当点击鼠标左键时触发。
- `.right` - (2.2.0) 只当点击鼠标右键时触发。
- `.middle` - (2.2.0) 只当点击鼠标中键时触发。
- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器，会告诉浏览器你不想阻止事件的默认行为

### [按键修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### [系统修饰符](https://cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

- **2.1.0**

- `.ctrl`

>在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。

- `.alt`
- `.shift`
- `.meta`：Mac 系统，对应 command 键 (⌘)。Windows，对应 Windows 徽标键 (⊞)
- **2.5.0**
- `.exact`：修饰符允许你控制由精确的系统修饰符组合触发的事件

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

### [鼠标修饰符](https://cn.vuejs.org/v2/guide/events.html#%E9%BC%A0%E6%A0%87%E6%8C%89%E9%92%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- `.left`
- `.right`
- `.middle`

### [@：为什么在 HTML 中监听事件?](https://cn.vuejs.org/v2/guide/events.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9C%A8-HTML-%E4%B8%AD%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6%EF%BC%9F)

> 这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：
>
> 1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
> 2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
> 3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。



## [v-show](https://cn.vuejs.org/v2/api/#v-show)

根据表达式之真假值，切换元素的 `display` CSS 属性。

>v-show 不支持 **<template>** 元素，也不支持 **v-else**
>
>当 **v-if** 与 **v-for** 一起使用时，**v-for** 具有比 **v-if** 更高的优先级。[参考](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81)

### [**@：v-if 和 v-show**](https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

**v-if** ：确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。**有更高的切换开销**

**v-show** ：不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。**有更高的初始渲染开销**

## [v-for](https://cn.vuejs.org/v2/api/#v-for)

[key属性](http://www.uxys.com/html/Vue/20200414/27055.html)

```html
<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, name, index) in object"></div>
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

## [v-cloak](https://cn.vuejs.org/v2/api/#v-cloak) 

这个指令可以隐藏未编译的 **Mustache** 标签直到实例准备完毕。

> Mustache 为 {{}}
>
> 网络受阻时，或者页面加载完毕而没有初始化得到 vue 实例
>
> DOM中的 `{{}}` 则会展示出来

```html
[v-cloak] {
  display: none;
}
<div v-cloak>
  {{ message }}
</div>
```

## [v-once](https://cn.vuejs.org/v2/api/#v-once)

只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过

```html
<div id="app">
    <p v-once>{{msg}}</p>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg:'kkk'
        },
    })
</script>
```



# MVVM设计思想

**MVC 设计思想：**

M: model 数据模型层  提供数据

V: Views 视图层      渲染数据

C: controller 控制层 调用数据渲染视图

![](Vue_image/Snipaste_2018-10-20_12-59-04.png)



**MVVM 设计思想：**

M: model 数据模型层  提供数据

V: Views 视图层      渲染数据

VM：ViewsModel 视图模型层   调用数据渲染视图

​	由数据来驱动视图（不需要过多考虑dom操作，把重心放在VM）



![](Vue_image/Snipaste_2018-10-20_13-42-18.png)

# 其他知识点汇总

## 计算属性与侦听器

### 计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。

```html
<body>
    <div id='app'>
        <input type="text" name="" id="" v-model='x'><br>
        <input type="text" name="" id="" v-model='y'><br>
        <!-- 插值表达式尽量避免直接运算，性能低 -->
        {{x+y}}<br>
        {{add()}}
        {{addC}}
        <!-- 注意methods 和 computed 调用差异 -->
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            x: '',
            y: ''
        },
        methods: {
            // 每次调用都要重新计算
            add() {
                return this.x + this.y + Date.now();
            }
        },
        // 计算属性
        computed: {
            // 调用一次后，再次调用使用第一次调用的数据
            addC() {
                return this.x + this.y + Date.now();
            }
        }
    })
</script>
```

>模板不再是简单的声明式逻辑。
>
>对于任何复杂逻辑，你都应当使用**计算属性**。因为计算属性，会自动缓存数据

**计算属性是基于它们的依赖进行缓存的**。只在相关依赖发生改变时它们才会重新求值；多次调用，计算属性会立即返回之前的计算结果，而不必再次执行函数。

[**@：计算属性缓存 vs 方法**](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95)

- 可以将同一函数定义为一个方法而不是一个计算属性。两种方法结果完全相同
- 不同的是**计算属性是基于它们的响应式依赖进行缓存的**
- 在相关响应式依赖发生改变时它们才会重新求值

```js
//Date.now() 不是响应式依赖,计算属性将不再更新
computed: {
  now: function () {
    return Date.now()
  }
}
```

### 侦听器

```html
<div id="div">
    <input type="text" v-model="xing">
    <input type="text" v-model="ming">
    {{ fullname }}
</div>
<script>
    var app = new Vue({
        el: '#div',
        data: {
            xing: '',
            ming: '',
            fullname:''
        },
        // 设置侦听器
        watch: {
            // 侦听器中的方法名和要真挺的数据属性名必须一致
            // xing 发生变化，侦听器就会被执行，且将变化后的值和变化前的值传入
            xing:function(newVal,old_val){
                this.fullname = newVal+this.ming;
            },
            ming:function(newVal,oldVal){
                this.fullname = this.xing+newVal;
            }
        }
    })
</script>
```

[@：计算属性 vs 侦听属性](https://cn.vuejs.org/v2/guide/computed.html#计算属性-vs-侦听属性)

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。

这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。

当需要在数据变化时**执行异步或开销较大的操作**时，这个方式是最有用的。

```html
<body>
    <div id='app'>
        <input type="text" v-model='names'><br>
        {{datas}}
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            names: '',
            datas: 'test',
        },
        watch: {
            // 侦听器 侦听data中数据变化
            names(newval, oldval) {
                var that = this;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        // this - > xhr 
                        // vue中this 才能获取datas
                        if (xhr.responseText == 0) {
                            that.datas = oldval;
                        } else {
                            that.datas = newval;
                        }
                    }
                }
                xhr.open('get', 'http://127.0.0.1:8000/?name=' + newval);
                xhr.send();
            }
        }
    })
</script>

```

## 使用ref操作DOM

虽然vue中数据驱动dom，但有时不得不脱离数据操作dom，vue为我们提供了**ref属性**获取dom节点

 ref本身是**作为渲染结果被创建**，在**初始渲染的时候它们还不存在**

`$refs` 也**不是响应式**，不应该试图用它在模板中做数据绑定。

```html
<!-- `vm.$refs.p` will be the DOM node -->
<p ref="p">hello</p>

<!-- `vm.$refs.child` will be the child component instance -->
<child-component ref="child"></child-component>
```

> ​	`this.$refs` 获取所有含ref属性的节点对象
>
> （不推荐）从一定程度上说，ref 违背的mvvm设计原则

## 过滤器的使用

- **私有(局部)过滤器**：filters
- **全局过滤器**：Vue.filter(名称,处理器)

**过滤器使用**：**双花括号插值和 v-bind 表达式（2.1.0+）**

- `{{msg|f1|f2}}`

- `<div v-bind:id="rawId | formatId"></div>`

过滤器要被添加到操作值得后面，**使用管道符 |分割，vue会自动将操作值，以实参的形式传入过滤器的方法中**

```html
<body>
    <div id='app1'>
        <input type="text" v-model='msg'>
        {{msg|f1}}
    </div>
    <div id='app2'>
        <input type="text" v-model='msg'>
        {{msg|f1|f2}}
    </div>
</body>
<script>
    // 全局过滤器
    Vue.filter('f1', function (val) {
        return val.toUpperCase();
    })

    var app1 = new Vue({
        el: '#app1',
        data: {
            msg: ''
        }
    })
    var app2 = new Vue({
        el: '#app2',
        data: {
            msg: ''
        },
        //私有(局部)过滤器 -> filters
        filters: {
            f2(val){
                var reg = /\d/g;
                return val.replace(reg, '*');
            }
        }

    })
</script>
```

## 自定义指令

```html
<body>
    <div id='app1'>
        <p v-red>111</p>
        <div v-color = "pink">444</div>
    </div>
    <div id='app2'>
        <p v-red>222</p>
        <div v-blue>333</div>
    </div>
</body>
<script>
    // 全局自定义指令 -> directive
    // 钩子函数inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    Vue.directive('red',{
        inserted(el){
            el.style.background = 'red';
        }
    })
    var app1 = new Vue({
        el:'#app1',
        data:{
            pink:'',
        },
        // 带参局部自定义指令 
        directives:{
            color:{
                inserted(el,color){
                    el.style.color = color.expression;
                    // console.log(color.expression);
                }   
            }
        }
    })
    var app2 = new Vue({
        el:'#app2',
        data:{

        },
        // 局部自定义指令 -> directives
        directives:{
            blue:{
                inserted:function(el){
                    el.style.color='blue';
                }
            }
        }
    })
</script>
```



## [过渡及动画](https://cn.vuejs.org/v2/guide/transitions.html#%E6%A6%82%E8%BF%B0)

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的**开始状态**。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入**过渡生效时状态**。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`:  定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

> 对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。

![image-20201111231333431](Vue_image/image-20201111231333431.png)








# [组件](https://cn.vuejs.org/v2/guide/components.html) 

https://cn.vuejs.org/v2/guide/components-registration.html

## 基本使用

组件是**可复用**的 Vue 实例，且带有一个名字
- 可以进行任意次数的复用
- 驼峰法命名，使用组件时要将大写字母改为小写
- tamplate属性必须有一个唯一的根元素

```html
<body>
    <div id='app'>
        {{msg}}
        <g-component></g-component>
        <l-component></l-component>
        <addition></addition>
    </div>

</body>
<script>
    // 标签中有大写:  gComponent -> g-component
    // 全局组件 - > 第一参数是组件名字,第二参数是对象
    Vue.component('gComponent',{
        template:"<h1>全局组件</h1>"
    })
    var app = new Vue({
        el:'#app',
        data:{
            msg:"test",
        },
        // 局部组件 -> 属性的名字就是组件名字
        components:{
            lComponent:{
                template:'<h1>局部组件</h1>'
            },
            addition:{
                // template 有且只有一个根节点,不能多个根节点同级
                // template:'<p>111111</p><p>222222</p>', 
                template:'<div><p>111111</p><p>222222</p></div>', 
            }
        }
    })
</script>
```

组件中的数据及方法

因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项

例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。

**像 `el` 这样根实例特有的选项例外**。

**data 必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝

每用一次组件，就会有一个它的**新实例**被创建

### 组件的组织

**三段式布局**

```html
<body>
    <!-- 常规三段式布局 -->
    <div class="top"></div>
    <div class="left"></div>
    <div class="right"></div>
    <hr>
    <!-- Vue三段式布局 -->
    <div id='app'>
        <top></top>
        <left></left>
        <right></right>
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        components:{
            top:{
                template:'<div class="vtop"></div>'
            },
            left:{
                template:'<div class="vleft"></div>'
            },
            right:{
                template:'<div class="vright"></div>'
            },
        }

    })
</script>

```



### 组件中的数据及方法

组件是带有名字的可复用的 **Vue 实例** ，与 new Vue 实例对象接收相同参数选项 **data、computed、watch、methods** , 但 **el例外**

虽然组件和实例对象可以接收相同的参数选项，但在具体使用中，vue实例对象的 data 与组件中的 data 还是有差异的, 在我们自己写的组件中

**data 必须是一个函数**

**一个组件的 data 选项必须是一个函数**，因此每个实例可以维护一份被返回的对象；

```html
<div id="app">
    <my-temp></my-temp>
</div>
<script>
    var app = new Vue({
        el: '#app',
        components: {
            myTemp: {
                // 一个组件的 data 选项必须是一个函数
                data:function(){
                    // 将 数据 装入 对象 返回
                    return {msg:'我是data选项'}
                },
                // 其他选项的使用不受影响
                methods:{
                    cli(){
                        alert(123);
                    }
                },
                template: "<div @click='cli'>{{msg}}</div>",
            }
        }
    })
</script>
```

### 向子组件传递数据

```html
<div id="app">
    <mytemp></mytemp>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data:{msg:'数据'},
        components:{
            mytemp:{
                template:'<h2>data:{{msg}}</h2>'
            }
        }
    })
</script>
```

运行上面的代码，我们发现，组件 mytemp 并不能获取实例中 data 的数据，这是因为组件与组件之间都拥有各自独立的作用域；

vue 在组件中提供了**props** 选项，props 接受一个在组件中自定义属性的值；

借助 **v-bind** 指令将vue实例对象中的数据传入组件中

```html
<body>
    <div id='app'>
        <!-- props获取属性值 -->
        <ch cc="msg"></ch><br>
        <!-- 通过v-bind 获取data中数据，间接实现子级获取父级数据 -->
        <ch :cc="msg"></ch>
    </div>
</body>
<script>
    var app = new Vue({
        el:'#app',
        data:{
            msg:'星形线',
        },
        components:{
            ch:{
                // 组件中props,获取标签中自定义属性
                props:['cc'],
                template:"<s>{{cc}}</s>"
            }
        }
    })
```

### 监听子组件事件

实现字体变大缩小

**TODO**：增大缩小不能同时生效

**GUESS**：$emit冲突，目前看来，后定义的生效

```html
<body>
    <div id="blog-posts-events-demo">
        <div :style="{ fontSize: postFontSize + 'em' }">
            <blog-post v-for="post in posts" v-bind:post="post" v-on:enlarge-text="postFontSize += 0.1"></blog-post>
            <blog-post v-for="post in posts" v-bind:post="post" v-on:reduce-text="fun"></blog-post>
        </div>
    </div>
</body>
<script>
    Vue.component('blog-post', {
        props: ['post'],
        template: `
        <div class="blog-post">
        <h3>{{ post.title }}</h3>
        <button v-on:click="$emit('enlarge-text')">
            Enlarge text
        </button>
        <button @click="$emit('reduce-text',0.1)">
            Reduce text
        </button>
        <div v-html="post.content"></div>
        </div>
        `,
    });
    var app = new Vue({
        el: '#blog-posts-events-demo',
        data: {
            posts: [
                { id: 1, title: 'My journey with Vue' },
                { id: 2, title: 'Blogging with Vue' },
                { id: 3, title: 'Why Vue is so fun' }
            ],
            postFontSize: 1
        },
        methods: {
            fun(size) {
                this.postFontSize -=size;
                // alert(size);
            }
        }
    })
</script>
```

### 通过插槽分发内容

不适用插槽，`alert-box`中内容会被覆盖

```html
<body>
    <div id='app'>
        <alert-box>
            show
            show
        </alter-box>
    </div>
</body>
<script>
    Vue.component('alert-box',{
        template:`
        <div>
            <strong>Error!</strong>
            <slot></slot>
        </div>
        `
    })
    var app = new Vue({
        el:'#app',
    })
</script>
```

## 深入了解组件



# -插槽

# 实例方法

### vm.$emit

`vm.$emit( eventName, […args] )`
**触发当前实例上的事件，附加参数都会传给监听器回调**

```html
<body>
    <div id='app'>
        <welcome-button @welcome="sayHi"></welcome-button>
    </div>
</body>
<script>

    Vue.component('welcome-button', {
        data(){
              return {
                  test:'hello world'
              }
        },
        // TODO 暂时无法解决将data值传向标签中的函数
        // template:"<button @click=\"$emit('welcome')\">click</button>",
        // 通过模板函数加方法
        template:`
        <button @click="fun">click</button>
        `,
        methods:{
            fun(){
                this.$emit('welcome',this.test);
            }
        }
    })
    var app = new Vue({
        el: '#app',
        data: {
            test: "2313213"
        },
        methods: {
            sayHi: function (backdata = "hello") {
                alert(backdata);
            }

        }
    })
```



# Vue的生命周期

Vue实例在被创建时都要经过一系列的初始化过程

- 例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等
- 在这个过程中会运行叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

[生命周期钩子](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)的 `this` 上下文指向调用它的 Vue 实例

>不要在选项 property 或回调上使用箭头函数，箭头函数并没有 `this`



<img src="Vue_image/Snipaste_2018-10-18_18-33-56.png" alt="Snipaste_2018-10-18_18-33-56" style="zoom: 80%;" /><img src="Vue_image/Snipaste_2018-10-18_18-33-56.jpg" alt="Snipaste_2018-10-18_18-33-56" style="zoom: 80%;" />

# 单页应用

**单页应用**(single page web application，**SPA**)，是在一个页面完成所有的业务功能，浏览器一开始会加载必需的HTML、CSS和JavaScript，之后所有的操作都在这张页面完成，这一切都由JavaScript来控制。

- 优点
  - **操作体验流畅**
  - **完全的前端组件化**
- 缺点
  - **首次加载大量资源**(可以只加载所需部分)
  - **对搜索引擎不友好**
  - **学习难度相对较高**

## [vue-router](https://cn.vuejs.org/v2/guide/routing.html)

https://router.vuejs.org/zh/

```html
<body>
    <div id="app">
        <!-- 利用锚点实现路由 -->
        <!-- 1.常规写法 -->
        <ul>
            <li><a href="#/reg">注册</a></li>
        </ul>
        <ul>
            <li><a href="#/log">登录</a></li>
        </ul>
        <!-- 2.router-link写法 -->
        <ul>
            <!-- router-link 解析为a标签后,点击会自动添加class属性 -->
            <li><router-link to='/index'>主页</router-link></li>
        </ul>
        <!-- 路由中组件会替换router-view -->
        <router-view></router-view>
    </div>
</body>
<script>
    // 获取路由对象
    var rt = new VueRouter({
        //  notes -  routes
        // 定义路由规则
        routes: [
            // path - 匹配地址栏路由变化
            // component - 组件展示
            { path: '/reg', component: { template: "<s>register</s>" } },
            { path: '/log', component: { template: "<s>login</s>" } },
            { path: '/index', component: { template: "<s>hello</s>" } },
        ]
    })
    var app = new Vue({
        el: '#app',
        data: {},
        router: rt
    })
</script>
```

## 动态路由匹配

**路由传参**

1. 通过 <router-link> 传参，在路径上传入具体的值

   ```html
   <router-link to="/users/120">用户管理</router-link>
   ```

2. 路由规则中增加参数，在path最后增加 **:id**

   ```js
   { name: 'users', path: '/users/:id', component: Users },
   ```

3. 在组件内部可以使用，**this.$route** 获取当前路由对象

   ```js
   var Users = {
       template: '<div>这是用户管理内容 {{ $route.params.id }}</div>',
       mounted() {
           console.log(this.$route.params.id);
       }
   };
   ```

# 构建项目

Vue 提供了一个[官方的 CLI](https://github.com/vuejs/vue-cli)，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 [Vue CLI 的文档](https://cli.vuejs.org)。

## 初始化项目

```shell
npm install -g @vue/cli @vue/cli-init #安装cli命令工具
vue -V #查看版本号
vue init webpack myapp #构建一个名为myapp的项目
```

Vue 依然使用询问的方式，让我们对项目有一个初始化的信息

- Project name：项目名
- Project description: 项目描述
- Author: 作者
- Vue build：
  - 第一种：配合大部分的开发人员
  - 第二种：仅仅中有runtime
- Install vue-router? 是否安装vue-router
- Use ESLint to lint your code?是否使用ESLint来验证我们的语法。
- Pick an ESLint preser:使用哪种语法规范来检查我们的代码：
  - Standard: 标准规范
  - Airbnb: 爱彼迎规范
- Set up unit test: 设置单元测试
- Setup e2e tests： 设置端对端测试
- Should we run 'npm install':要不要帮忙你下载这个项目需要的第三方包
  - 使用npm来下载
  - 使用yarn来下载

```shell
To get started:

  cd myapps
  npm run dev   // 使用命令启动项目
  
  -----
  Your application is running here: http://localhost:8080  
  
  打开浏览器，访问 http://localhost:8080  
  看到浏览器的欢迎界面，表示项目运行成功
```

## 项目结构介绍

```Shell
├── build				  # webpack打包相关配置文件目录
├── config				  # webpack打包相关配置文件目录
├── node_modules		  # 第三方包
├── src					  # 项目源码(主战场)
│   ├── assets			  # 存储静态资源，例如 css、img、fonts
│   ├── components		  # 存储所有公共组件
│   ├── router			  # 路由
│   ├── App.vue			  # 单页面应用程序的根组件
│   └── main.js			  # 程序入口，负责把根组件替换到根节点
├── static				  # 可以放一些静态资源
│   └── .gitkeep		  # git提交的时候空文件夹不会提交，这个文件可以让空文件夹可以提交
├── .babelrc			  # 配置文件，es6转es5配置文件，给 babel 编译器用的
├── .editorconfig		  # 给编辑器看的
├── .eslintignore	      # 给eslint代码风格校验工具使用的，用来配置忽略代码风格校验的文件或是目录
├── .eslintrc.js		  # 给eslint代码风格校验工具使用的，用来配置代码风格校验规则
├── .gitignore			  # 给git使用的，用来配置忽略上传的文件
├── index.html			  # 单页面应用程序的单页
├── package.json		  # 项目说明，用来保存依赖项等信息
├── package-lock.json	  # 锁定第三方包的版本，以及保存包的下载地址
├── .postcssrc.js		  # 给postcss用的，postcss类似于 less、sass 预处理器
└── README.md			  # 项目说明文档
```



## 语法检查

选择了 `Use ESLint to lint your code`,写代码时必须严格遵守 [JavaScript Standard Style](https://standardjs.com/) 代码风格的语法规则：

- **使用两个空格** – 进行缩进
- **字符串使用单引号** – 需要转义的地方除外
- **不再有冗余的变量** – 这是导致 _大量_ bug 的源头
- **无分号** – [这](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)[没什么不好。](http://inimino.org/~inimino/blog/javascript_semicolons)[不骗你！](https://www.youtube.com/watch?v=gsfbh17Ax9I)
- 行首不要以 `(`, `[`, or ``` 开头
  - 这是省略分号时**唯一**会造成问题的地方 – _工具里已加了自动检测！_
  - [详情](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md#semicolons)
- **关键字后加空格** `if (condition) { ... }`
- **函数名后加空格** `function name (arg) { ... }`
- 坚持使用全等 `===` 摒弃 `==` 一但在需要检查 `null || undefined` 时可以使用 `obj == null`。
- 一定要处理 Node.js 中错误回调传递进来的 `err` 参数。
- 使用浏览器全局变量时加上 `window` 前缀 – `document` 和 `navigator` 除外
  - 避免无意中使用到了这些命名看上去很普通的全局变量， `open`, `length`, `event` 还有 `name`。

说了那么多，看看[这个遵循了 Standard 规范的示例文件](https://github.com/expressjs/body-parser/blob/master/index.js) 中的代码吧。或者，这里还有[一大波使用了此规范的项目](https://raw.githubusercontent.com/standard/standard-packages/master/all.json) 代码可供参考。

### 严格模式

http://javascript.ruanyifeng.com/advanced/strict.html

严格模式主要有以下限制。

- 变量必须声明后再使用

- 函数的参数不能有同名属性，否则报错

- 不能使用`with`语句

- 不能对只读属性赋值，否则报错

- 不能使用前缀 0 表示八进制数，否则报错

- 不能删除不可删除的属性，否则报错

- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`

- `eval`不会在它的外层作用域引入变量

- `eval`和`arguments`不能被重新赋值

- `arguments`不会自动反映函数参数的变化

- 不能使用`arguments.callee`

- 不能使用`arguments.caller`

- 禁止`this`指向全局对象

- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈

- 增加了保留字（比如`protected`、`static`和`interface`）


### ES6模块化

http://es6.ruanyifeng.com/#docs/module

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用；
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口；
- ES6 的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`；
- ES6 模块之中，顶层的`this`指向`undefined`；CommonJS 模块的顶层`this`指向当前模块；

## 项目文件分析

### main.js

```js
// 入口文件

// 以es6模块的方式引入 vue APP router 三个模块;
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  // 获取节点对象
  el: '#app',
  // 引入路由
  router,
  // 本实例的私有组件
  components: { App },
  // el 与 template 在同一个实例中出现，
  // 根据生命周期的执行顺序可知，template中的内容会替换el选中的内容
  template: '<App/>'
})

```

### roter/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// Vue 中插件引入语法 
// https://cn.vuejs.org/v2/guide/plugins.html
Vue.use(Router)

// ES6模块导出语法
export default new Router({
  routes: [
    // 定义一个路由规则
    {
      path: '/', // 请求路径
      name: 'HelloWorld', // 路由名称标识
      component: HelloWorld //请求此路由时，使用的组件
    }
  ]
})

```

### components/HelloWorld.vue

```js
export default {
  // 模块名字
  name: 'HelloWorld',
  // 组件中 data 数据必须是一个有返回值的方法
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
```

### 项目具体流程

```javascript
(main.js->template: '<App/>')替换 (index.html->div#app);

(index.html-><App/>) --> (components: { App })

( components: { App }) --> (import App from './App' -> src/App.vue)

(App.vue -> <router-view/> -> 路由组件) --> (main.js-> router)
========此项决定了页面展示那个组件内容 ========

({path: '/',name: 'HelloWorld', component: HelloWorld }) --> (import HelloWorld from '@/components/HelloWorld')

(src/components/HelloWorld.vue) --> <router-view/>
```

### 添加路由组件

修改 router/index.js ，添加自己的路由

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 引入(导入) 组件
import MyRouter from '@/components/MyRouter'

Vue.use(Router)

// ES6模块导出语法
export default new Router({
  routes: [
    {path: '/',name: 'HelloWorld', component: HelloWorld },
    // 添加自己的路由及组件
    {
      path:'/myrouter',
      name:'MyRouter',
      component:MyRouter
    }
  ]
})
```

在 components 文件夹中添加 MyRouter.vue 文件，写自己的组件代码：

```vue
<template>
  <div class="mypage">
    {{mydatas}}
  </div>
</template>

<script>
  // 模块化导出
  export default {
    data(){
      return {mydatas:'lksadjflks'}
    }
  }
</script>

<style>
  .mypage{
    width: 200px;
    height: 50px;
    background: pink
  }
</style>

```
