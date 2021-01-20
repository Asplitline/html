# Vue

## 引入

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的**渐进式框架**，vue 的核心库只关注**视图层（V）**

```html
<div id="app">
    {{msg}}
</div>
<script src="../vue.js"></script>
<!-- Vue 一旦引入，全局作用域声明一个构造函数Vue -->
<script>
    //新建vue实例
    var vm = new Vue({
        el: '#app',//设置操作元素
        data: {
            msg: 'hello world'
        }
    })
    //$ 公有属性
    //_ 私有属性
</script>
```

## 指令

本质就是自定义属性，以 v- 开头 

###  v-cloak

在数据渲染完成后，v-cloak属性会自动除去

```css
[v-cloak] {display: none;}
```

### v-text

用于将数据填充到标签，与插值表达式类似，不会解析标签，无闪动问题

> 属性中不加` {{}}`  直接写数据名

```html
<p v-text="msg"></p>
<p>{{msg}}</p>
```

### v-html

与v-text类似，可以解析标签，有安全问题

### v-pre

显示原始信息，**跳过这个元素和子元素的编译过程**，加在静态信息上，**加快渲染**

```html
<span v-pre>{{msg}}</span>   <!-- 原样输出 {{msg}} -->
```

### v-once

执行一次的插值，执行过后内容不再更新

### v-model

双向数据绑定：视图变化，数据变化。数据变化，试图变化。

> 限制在 `<input>、<select>、<textarea>、components`中使用

- 获取单选框中的值
- 获取复选框中的值
  - 单选值和复选框需设置不同的value值
- 获取下拉框和文本框中的值
  - 有value取value，无value取text

表单修饰符

```html
<!-- 自动将用户的输入值转为数值类型，
当开始输入非数字的字符串时，属性值将实时更新成相同的字符串。即使后面输入数字，也将被视作字符串-->
<input v-model.number="age" type="number">

<!--自动过滤用户输入的首尾空白字符   -->
<input v-model.trim="msg">

<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```



### v-on

绑定事件，`v-on:click` - 简写 `@click`

```html
<a v-on:click="doThis"></a> 
<a @:click="doThis"></a> <!-- 缩写 -->
```

#### 事件对象

```html
<!-- 直接绑定函数名称，默认会传递事件对象作为第一个参数 -->
<input type="button" value="click1" v-on:click="handle">
<!-- 事件绑定函数调用，事件对象必须作为最后一个参数-->
<input type="button" value="click2" v-on:click="handle(1,$event)">
```

#### 事件修饰符

>修饰符是由点开头的指令后缀来表示的

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联   即阻止冒泡也阻止默认事件 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
<!--
顺序很重要
v-on:click.prevent.self 会阻止所有的点击
v-on:click.self.prevent 只会阻止对元素自身的点击
-->
```

#### 按键修饰符

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">

<!-- -当点击enter 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<!--当点击enter或者space时  时调用 `vm.alertMe()`   -->
<input type="text" v-on:keyup.enter.space="alertMe" >
<!-- 
常用的按键修饰符
.enter =>  enter键
.tab => tab键
.delete (捕获“删除”和“退格”按键) =>  删除键
.esc => 取消键
.space =>  空格键
.up =>  上
.down =>  下
.left =>  左
.right =>  右
-->
```

#### 自定义按键修饰符别名

通过`config.keyCodes`自定义按键修饰符别名

```html
<input type="text" v-on:keydown.f5="prompt()">
<script>
Vue.config.keyCodes.f5 = 116;
</script>
```

### v-bind

绑定属性

```html
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">
<!-- 缩写 -->
<img :src="imageSrc">
```

#### class

>v-bind:class指令可以与普通的class特性共存

```html
<!-- class绑定对象 -->
<!-- textColor textSize 对应css类名-->
<div v-bind:class="{textColor:isColor, textSize:isSize}"></div>
<!-- color fontSize 对应css属性名-->
<!-- 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case)要用单引号括起来-->
<div v-bind:style="{color:activeColor,fontSize:activeSize}"></div>

<!-- class绑定数组 -->
<div v-bind:class="[classA, classB]"></div>
<div v-bind:style="[styleObject]"></div>
     
<!-- 两者区别 
- 绑定对象: 属性=>类名或css属性 , 属性=>data中数据 
- 绑定数组：数组中存的是data数据
-->
<script>
	var vm = new Vue({
        el:'',
        data:{
			isColor:true,
			isSize:true，
			activeColor:"red",
			activeSize:"25px",
			classA:'textColor',
			classB:'textSize',
             styleObject: {
              color: 'green',
              fontSize: '30px',
              background:'red'
        	 }，
        }
    })
</script>
```

#### style

```html
 <div v-bind:style="styleObject">绑定样式对象</div>'
 
<!-- CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来)    -->
 <div v-bind:style="{ color: activeColor, fontSize: fontSize,background:'red' }">内联样式</div>

<!--组语法可以将多个样式对象应用到同一个元素 -->
<div v-bind:style="[styleObj1, styleObj2]"></div>
```

### v-if 和 v-show

- v-show：标签display设置为none，控制隐藏
  - v-show只编译一次，后面就是控制css
- v-if：动态的向DOM树内添加或者删除DOM元素
  - v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件

>v-if不停销毁和创建，v-show性能更优

### v-for

```html
<ul id="example-1">
   <!-- 循环结构-遍历数组  
	item 是我们自己定义的一个名字  代表数组里面的每一项  
	items对应的是 data中的数组-->
  <li v-for="item in items">
    {{ item.message }}
  </li> 
</ul>
<!--  循环结构-遍历对象
v  value
k  key 
i  index	
---> 
<div v-if='v==13' v-for='(v,k,i) in obj'>{{v + '---' + k + '---' + i}}</div>
<!-- 不满足条件，但进入循环-->
```

**不推荐**同时使用 `v-if` 和 `v-for`,`v-for` 具有比 `v-if` 更高的优先级

### v-key

- key来给每个节点做一个唯一标识
- key作用：高效的更新虚拟DOM

```html
  <li v-for="item in items" :key="item.id">...</li>
```

## 自定义指令

```js
 - 全局指令 Vue.directive('focusA',function(){})
驼峰命名的方式定义 如  focusA ->> v-focus-a
使用自定义的指令，只需在对用的元素中，加上'v-'的前缀形成类似于内部指令'v-if'，'v-text'的形式

- 局部指令，需要定义在  directives 的选项   用法和全局用法一样 
- 局部指令只能在当前组件里面使用
- 当全局指令和局部指令同名时以局部指令为准
```

## 计算属性 - computed

- 模板中放入太多的逻辑会让模板过重且难以维护  使用计算属性可以让模板更加的简洁
- **计算属性是基于它们的响应式依赖进行缓存的**
- computed比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化

## 侦听器 - watch

- 使用watch来响应数据的变化
- 一般用于异步或者开销较大的操作
- watch 中的属性 一定是data 中 已经存在的数据 
- **当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听**

## 过滤器

- Vue.js允许自定义过滤器，可被用于一些常见的文本格式化。
- 过滤器可以用在两个地方：双花括号插值和v-bind表达式。
- 过滤器应该被添加在JavaScript表达式的尾部，由“管道”符号指示
- 支持级联操作
- 过滤器不改变真正的`data`，而只是改变渲染的结果，并返回过滤后的版本
- 全局注册时是filter，没有s的。而局部过滤器是filters，是有s的

## mvvm

MVC 是后端的分层开发概念；MVVM是前端视图层的概念，主要关注于视图层分离

MVVM把前端的视图层分为Model,，View ，ViewModel

- model：数据层，Vue中data
- view：视图 ，Vue中HTML页面  
- view-model：控制器，将数据和视图层建立联系 。Vue实例vm

## 生命周期

Vue实例从创建 到销毁的过程 ，这些过程中会伴随着一些函数的自调用。我们称这些函数为钩子函数

| beforeCreate  | 在实例初始化之后，数据观测和事件配置之前被调用 此时data 和 methods 以及页面的DOM结构都没有初始化   什么都做不了 |
| ------------- | ------------------------------------------------------------ |
| created       | 在实例创建完成后被立即调用此时**data 和 methods已经可以使用**  但是**页面还没有渲染**出来 |
| beforeMount   | 在挂载开始之前被调用   此时页面上还看不到真实数据 只是**一个模板页面**而已 |
| mounted       | el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。  **数据已经真实渲染到页面**上  在这个钩子函数里面我们可以使用一些第三方的插件 |
| beforeUpdate  | 数据**更新时**调用，发生在虚拟DOM打补丁之前。   **页面上数据还是旧的** |
| updated       | 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。 **页面上数据已经替换成最新的** |
| beforeDestroy | 实例**销毁之前**调用                                         |
| destroyed     | 实例**销毁后**调用                                           |

## 数组变异方法

- 在 Vue 中，**直接修改对象属性的值无法触发响应式**
- 变异数组方法即保持数组方法原有**功能不变的前提下对其进行功能拓展**

| `push()`    | 往数组最后面添加一个元素，成功返回当前数组的长度             |
| ----------- | ------------------------------------------------------------ |
| `pop()`     | 删除数组的最后一个元素，成功返回删除元素的值                 |
| `shift()`   | 删除数组的第一个元素，成功返回删除元素的值                   |
| `unshift()` | 往数组最前面添加一个元素，成功返回当前数组的长度             |
| `splice()`  | 有三个参数，第一个是想要删除的元素的下标（必选），第二个是想要删除的个数（必选），第三个是删除 后想要在原位置替换的值 |
| `sort()`    | sort()  使数组按照字符编码默认从小到大排序,成功返回排序后的数组 |
| `reverse()` | reverse()  将数组倒序，成功返回倒序后的数组                  |

- 不会改变原始数组，但总是返回一个新数组

| filter | filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。 |
| ------ | ------------------------------------------------------------ |
| concat | concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组 |
| slice  | slice() 方法可从已有的数组中返回选定的元素。该方法并不会修改数组，而是返回一个子数组 |

- Vue.set(a,b,c)    让 触发视图重新更新一遍，数据动态起来
- a是要更改的数据 、   b是数据的第几项、   c是更改后的数据

## 组件

组件可以扩展 HTML 元素，封装可重用的代码

- 组件参数的data值必须是**函数**，同时要求返回一个**对象** 
- 组件模板必须是**单个根元素**，内容可以是模板字符串
- 驼峰式命名
  - 在字符串模板中用驼峰式
  - 普通标签，短横线

### 组件注册

#### 全局注册

`Vue.component('组件名称', { })`    

- param1：标签名称
- param2：一个选项对象

#### 局部注册

- `components:{'组件名称',}`

```html
<div id="app">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>
    <my-component1></my-component1>
</div>
<script src="../vue.js"></script>
<script>
    Vue.component('my-component', {
        data: function () {return {};},
        template: '<div>123</div>'
    })
    var vm = new Vue({
        el: '#app',
        components: {'myComponent1': '<div>456</div>'}
    })
</script>
```

### 组件传值

#### 父组件向子组件传值

- 父组件：**以属性的形式**绑定值到子组件身上
- 子组件：以属性props接收

> 在props中使用驼峰形式，模板中需要使用短横线的形式，字符串形式的模板中没有这个限制

```html
<div id="app">
    <my-component msg='father msg' :title-w='word'></my-component>
</div>
<script src="../vue.js"></script>
<script>
    Vue.component('my-component', {
        data() {
            return {}
        },
        props: ['msg', 'titleW'],
        template: '<div>{{msg+"-----"+ titleW}}</div>'
    })
    var vm = new Vue({
        el: '#app',
        data: {word: 'father word',}
    })
</script>
```

#### 子组件向父组件传值

- 子组件：`$emit()`触发事件
  - param1 - 自定义的事件名称
  - param2 - 传递的数据
- 父组件：v-on 监听子组件的事件

```html
<div id="app">
    <span :style='{fontSize:size+"px"}'>测试</span>
    <my-component @enlarge-text="handle"></my-component>
</div>
<script src="../vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'hello world',
            size: 10,
        },
        methods: {
            handle(val) {this.size += val;}
        },
        components: {
            'myComponent': {
                data() {return {}},
                template: `<div><button @click="$emit('enlarge-text',5)">plus5</button>
                  <button @click="$emit('enlarge-text',10)">plus10</button></div>`,
            }
        }
    })
</script>
```

#### 兄弟之间的传递

- 兄弟之间传递数据需要借助于事件中心，通过事件中心传递数据   
  - 提供事件中心：var hub = new Vue()
- 传递数据：触发hub.$emit(方法名，传递的数据)
- 接收数据：mounted钩子触发hub.$on()方法名
- 销毁事件： hub.$off()方法名销毁

```html
<div id="app">
    <button @click="handle">all</button>
    <a-component></a-component>
    <b-component></b-component>
</div>
<script src="../vue.js"></script>
<script>
    let hub = new Vue();
    Vue.component('a-component', {
        template: `
            <div>
                <span>123</span>
                <button @click="handle">aaaa</button>
            </div>
        `,
        methods: {
            handle() {
                // 发送事件+数据
                hub.$emit('funA', 'aaa');
            }
        },
        mounted() {
            hub.$on('funB', val => {
                console.log(val);
            })
        }
    })
    // b-component和b类似
    var vm = new Vue({
        el: '#app',
        methods: {
            handle() { 
                // hub.$off('funA');
                // hub.$off('funB');
                hub.$off(['funA','funB']);
            }
        }
    })
</script>
```

### 组件插槽

父组件向子组件传递内容

组件的最大特性就是复用性，而插槽提高组件可复用能力

#### 匿名插槽

所有组件标签中嵌套的内容会替换掉slot，如果不传值则使用slot中的**默认值**

```html
<div id="app">
    <alert-box>format error</alert-box>
    <alert-box>runtime error</alert-box>
    <alert-box></alert-box>
</div>
<script src="../vue.js"></script>
<script>
    Vue.component('alert-box', {
        template: `
            <div>
                <strong>error:</strong>
                <slot>code error</slot>
            </div>`, })
    var vm = new Vue({
        el: '#app',
    })
</script>
```

#### 具名插槽

- 具有名字的插槽 
- 使用 <slot> 中的 "name" 属性绑定元素
- `<template>` 元素中的所有内容都将会被传入相应的插槽。
- 任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。
- template临时的包裹标签最终不会渲染到页面上
- 渲染顺序取决于模板，而不是父组件元素序列

```html
<div id="app">
    <!-- 旧版语法的两种写法 -->
    <base-layout>
        <!-- 1 -->
        <p slot='header'>标题信息</p>
        <p>主要内容1</p>
        <p>主要内容2</p>
        <!-- 2 -->
        <template slot='footer'>
            <p>底部信息信息</p>
        </template>
    </base-layout>
    <!-- 2.6新语法 -->
    <base-layout>
        <template v-slot:header>
            <h1>Here might be a page title</h1>
        </template>
        <!-- 默认为 v-slot:default -->
        <!-- <template v-slot:default> -->
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
        <!-- </template> -->
        <template v-slot:footer>
            <p>Here's some contact info</p>
        </template>
    </base-layout>
</div>
<script src="../vue.js"></script>
<script>
    Vue.component('base-layout', {
        template: `
            <div class="container">
                <header>
                    <slot name="header"></slot>
                </header> 
                <main>
                    <slot></slot>
                </main>   
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>`,
    })
    var vm = new Vue({
        el: '#app',
    })
</script>
```

#### 作用域插槽

- 父组件对子组件加工处理，复用子组件的slot，又可以使slot内容不一致
- 默认插槽的缩写语法**不能**和具名插槽混用，因为它会导致作用域不明确
- 只要出现多个插槽，请始终为***所有的*插槽使用完整的基于 `<template>` 的语法**

```html
<div id="app">
    <my-component :list="list">
        <template v-slot:default="slotProps">
            <!-- <template v-slot="slotProps"> -->
            {{slotProps.info.name}}
        </template>
    </my-component>
</div>
<script src="../vue.js"></script>
<script>
    Vue.component('my-component', {
        props: ['list'],
        template: `
            <ul>
              <li v-for="item in list">
                  <slot :info="item">无数据</slot>
              </li>  
            </ul>
        `,
    })
    var vm = new Vue({
        el: '#app',
        data: {
            list: [{ name: 'apple' }, { name: 'orange' }, { name: 'banana' }]
        }
    })
</script>
```



