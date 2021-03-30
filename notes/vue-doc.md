# Vue

## Vue实例

### [数据与方法](https://cn.vuejs.org/v2/guide/instance.html#数据与方法)

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

当这些数据改变时，视图会进行重渲染。值得注意的是**只有当实例被创建时就已经存在于 `data` 中的 property 才是响应式的**。

以后需要一个 property，但是一开始它为空或不存在，那么你仅**需要设置一些初始值**

例外是使用 `Object.freeze()`，这会**阻止修改现有 property**，也意味着响应系统**无法再追踪**变化。

 **实例 property 与方法**：它们都有前缀 `$`，以便与用户定义的 property 区分开来

### [实例生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期钩子)

`created`钩子可以用来在一个实例**被创建之后**执行代码

生命周期钩子的 `this` 上下文指向调用它的 Vue 实例

## 模板语法

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

偏爱 JavaScript 的原始力量，你也可以不用模板，直接写**渲染 (render) 函数**

### 插值

 `v-html`作为 HTML—会**忽略**解析 property 值中的**数据绑定**。

动态渲染的任意 HTML 可能会非常危险，因为它很**容易导致 XSS 攻击**。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

`:disabled="isButtonDisabled"`

`isButtonDisabled` 的值是 `null、undefined 或 false`都不会被渲染

模板表达式都被放在沙盒中，只能访问**[全局变量的一个白名单](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9)**

### 指令

#### 参数

一些指令能够接收一个“参数”，在指令名称之后**以冒号表示**

```html
<a v-bind:href="url">...</a>****
```

#### 动态参数

可以用**方括号**括起来的 JavaScript 表达式作为一个指令的参数

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

##### 对值的约束

- 动态参数预期会求出一个**字符串**，异常情况下值为 `null`。
- 特殊的 `null` 值可以被**显性地用于移除绑定**。任何其它**非字符串类型**的值都将会触发一个**警告**。

##### 表达式约束

某些字符，如**空格和引号**，放在 HTML attribute 名里是**无效的**

- 不使用引号或空格
- 用计算属性代替

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

大小写不敏感，`:[someAttr]` -  `:[someattr]`

#### 修饰符

以半角句号 `.` 指明的特殊后缀

## 计算属性和侦听器

### 计算属性 

**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。

> `Date.now()` 失效，应为其不是响应式依赖

计算属性默认只有 **getter**，不过在需要时你也可以提供一个 **setter**

```js
computed: {
  fullName: {
    get: function () {    // getter
     return ...
    },
    set: function (newValue) {    // setter
      ...
    }
  }
}
```

### 侦听器

在数据变化时执行**异步或开销较大**的操作时，侦听器最有效

## Class 与 Style 绑定

### 绑定 HTML Class

`v-bind:class`

#### 对象语法

```html
<!-- isActive:true -->
<div v-bind:class="{ active: isActive }"></div>

<!-- classObject:{isActive: true} -->
<div v-bind:class="classObject"></div>
```

#### 数组语法

```html
<!-- {
  activeClass: 'active',
  errorClass: 'text-danger'
} -->
<div v-bind:class="[activeClass, errorClass]"></div>
```

#### 组合写法

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```



> **Truthy 真值** ： 转换后的值为真值
>
> 除 `false、0、""、null、undefined`以外都是**真值**

#### 组件

在**自定义组件**上使用，会自动绑定到**组件根元素**上。

### 绑定内联样式

`v-bind:style`

> 会自动添加[DOC-浏览器前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)

#### 对象语法

**css property**名可以用驼峰式(`camelCase`) 或者 短横线(`kebab-case`，要用引号括起来)

```html
<!-- styleObject: {
  activeColor: 'red',
  fontSize: 30
}-->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div v-bind:style="styleObject"></div>
```

#### 数组语法

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

#### 多重值  2.3+

 `style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值

只会渲染数组中**最后一个被浏览器支持的值**

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 条件渲染

### v-if

条件性渲染**一块**内容。指令表达式返回`truthy`

将`template` 当作不可见包裹元素进行**条件渲染**分组

```html
<template v-if="">
    <p v-if="">1</p>
    <p v-else-if="">2</p>
    <p v-else>3</p>
</template>
```

vue尽可能高效渲染元素，会尽量复用元素

`key`表示**元素独立**，不要复用

### v-show

元素始终被渲染在DOM中，只是单纯切换`display`，不支持**template**和**v-else**

### v-if vs v-show

`v-if`

- 切换过程中**事件**和子组件**适当**的**销毁重建**
- **惰性**，直到第一次条件为真，才会渲染
- 更高的**切换开销**

`v-show`

- 不管条件，**总会渲染**
- 更高的**初始渲染开销**

## 列表渲染

### v-for

`(item , index|name ) in items`

- 第一参数
  - `item` - 被迭代元素别名
- 第二参数
  - `index` - 当前项索引（数组）
  - `name` - 键名（对象）
- 第三参数（对象）
  - `index` - 当前项索引

> `of` 可以替换 `in`
>
> 遍历顺序 按 `Object.keys()`

### 维护状态

`v-for`**默认渲染**时，数据项**顺序改变**，**不会移动DOM匹配数据项**，就地更新元素，确保每个索引都正确显示，只**适用于不依赖子组件状态或临时DOM状态**的列表渲染输出

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute

### 数组更新检测

#### 变更方法

Vue封装的响应式数组方法

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 替换数组

均返回新数组

- `filter()`
- `concat()`
- `slice()` -  (start,end)

> Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的**启发式方法**，所以用一个含有**相同元素的数组**去替换**原来的数组**是非常高效的操作。

#### 注意事项

Vue **不能检测**数组和对象的变化

### 显示处理后结果

**计算属性**不适用 - **传参**，使用**method**代替

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

### v-for 杂项

1. 可以在`v-for`中使用整数

```html
 <span v-for="n in 10">{{ n }} </span>
```

2. 可以用`template` + `v-for` 包裹来渲染循环的元素

3. [v-for + v-if](#避免 v-if 和 v-for)

4. 在**组件**上使用`v-for`，组件存在特殊作用域，任何数据都**不能自动**传到组件，通过`props`

   > 自动传入会使`组件`和`v-for`**耦合**，明确组件来源可以**复用**代码
   >
   > 使用DOM 模板时，在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容，通过`is`设置

```html
<ul>
    <my-component></my-component>
</ul>
-----
<ul>
    <li is="my-component"></li>
</ul>
```



## 事件处理

### 事件方法

`v-on` 指令监听 DOM 事件，在触发时运行JavaScript 代码

```html
<div id="example-2">
  <button v-on:click="greet">Greet</button>
</div>
```

```js
var vm = new Vue({
  ...
  methods: {
    greet: function (event) {
      // this -> vue实例
      ...
    }
  }
})
vm.greet() // 通过实例调用
```

可以通过`$event`手动传入事件

### 事件修饰符

- `.stop` - 阻止事件继续传播
- `.prevent` - 阻止默认行为
- `.capture` - 捕获模式，内部元素触发的事件**先在此处理**，然后**才交由内部**元素进行处理
- `.self` - 在 `event.target` 是当前元素自身时触发处理函数
- `.once` - 2.1.4+ ,可以应用到组件上
- `.passive` - 2.3.0+ 直接触发默认行为，，优化移动端的，如 `onScroll`

注意：

- 修饰符可以**串联** `v-on:click.stop.prevent="doThat"`
- **只含**修饰符 `v-on:submit.prevent`
- [顺序会影响结果](https://blog.csdn.net/catascdd/article/details/108264406)
	- 阻止所有点击 `v-on:click.prevent.self`
	- 阻止自身点击 `v-on:click.self.prevent`
- 不要让 `passive` 和 `prevent` 一起使用，`prevent`会被忽略，`passive`为不阻止默认行为

### 按键修饰符

~~`keyCode`~~废弃

`keyup` 现在 

```html
<input v-on:keyup.13="submit">
```

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

通过全局 `config.keyCodes` 对象**自定义按键修饰符别名**

```js
Vue.config.keyCodes = {
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}
```

### 系统修饰键

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` - windows | command
- `.exact` - 控制由精确的系统**修饰符组合**触发的事件，严格按照修饰符执行。
  - `v-on:click.ctrl` - Ctrl组合其他键也能触发
  - `v-on:click.ctrl.exact` - 仅有Ctrl被按下才能触发
  - `v-on:click.exact` - 单纯的点击

> 系统修饰符和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。
>
> 例：按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`

限制处理函数仅响应特定的鼠标按钮

- `.left`
- `.right`
- `.middle`

### html中监听事件

- 轻松**定位**JavaScript中对应方法
- **JavaScript无需绑定事件**，与DOM解耦，纯粹的逻辑
- 事件随ViewModel销毁**自动销毁**

## 表单绑定

### 基础用法

`v-model` 忽略表单的 `value`、`checked`、`selected` attribute 的初始值，总是将 Vue 实例数据作为数据来源，应该在**data中初始化**

- `text textarea` 元素 `value + input`
- `checkbox radio` 元素 `checked + change`
- `select` 元素 `value + change`

注意：

`<textarea>{{text}}</textarea>`) 并不会生效，应使用`v-model`

 `v-model` 未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。

在 iOS 中，这会使用户无法选择第一个选项。因为这样不会触发 change 事件。

推荐 `<option disabled value="">请选择</option>`

### 值绑定

#### 复选

```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```

```js
vm.toggle === 'yes'// 选中
vm.toggle === 'no'// 没有选中
```

#### 单选

```html
<input type="radio" v-model="pick" v-bind:value="a">
```

```js
vm.pick === vm.a // 选中
```

#### 选择框

```html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

```js
typeof vm.selected // => 'object' 选中时
vm.selected.number // => 123
```

### 修饰符

- `.lazy` - v-model 默认为`input`事件，使用后转为 `change`事件
- `.number` - 输入值转为**数值**类型，值无法被`parseFloat()` 解析，则会返回原始的值。
- `.trim` - 自动过滤**首尾空白**

> `type="number"` 时，HTML值也总会返回字符串。

## 组件基础

组件时**可复用的vue实例**。

**data选项必须为函数**，已便每个实例维护一个**独立拷贝**。否则，实例间将共享数据。

**每个组件必须只有一个根元素**

### 监听子组件事件

组件中`$emit` 触发

#### 不传值

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
<!-- blog-post -->
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

#### 传值

通过`$event`获取值

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
<!-- blog-post -->
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

#### v-model

`v-model` 等价写法

```html
<input v-model="searchText">
<input v-bind:value="searchText" v-on:input="searchText=$event.target.value">
```

组件中使用v-model

```html
<my-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></my-input>
<!-- my-input -->
<!-- 通过props接收值，$emit发送值-->
<input v-bind:value="value" v-on:input="$emit('input',$event.target.value)">
```

### [动态组件](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-dynamic-components-with-binding?file=/index.html)

不同组件之间进行**动态切换**，`<component>`元素加一个特殊的 `is` attribute 来实现

```html
<component v-bind:is="currentTabComponent"></component>
```

`currentTabComponent` 代表当前组件名称，取值如下

- 组件名称（已注册）
- 组件选项对象

`DIF-难点理解`

这个*attribute*[^1]可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会*作为 DOM attribute 被绑定*[^2]。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 *`.prop` 修饰器*[^3]。

[^1]: is 属性
[^2]: html元素属性
[^3]: 

### 解析-DOM-模板注意事项

 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对哪些元素（`<li>`、`<tr>` 和 `<option>`）可以出现在其内部是有严格限制的。

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。通过`is`解决

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

以下条件不存在限制

- `字符串` (`template: '...'`)
- `单文件`组件 (`.vue`)
- `<script type="text/x-template">`

# 语法糖

`v-bind` - `:`

`v-on` - `@`



# API

## 全局配置

`Vue.config`对象，包含全局配置

### silent 

取消所有日志与警告

type：`boolean` 

default：`false`

### keyCodes

 `v-on` 自定义键

type：`{ [key:string]:number| Array<number>}`

default：`{}`

## 全局API

## 选项

### 数据

### DOM

### 钩子函数

### 资源

### 组合

### 其他

## 实例

### property

### 方法

### 数据

##### vm.$watch

`vm.$watch( expOrFn, callback, [options] )`

- {string | Function}  `expOrFn`
-  {Function | Object}  `callback`
- {Object} - `[options]`
  - {boolean} `deep` - 监听内部值变化，数组可以不用（**deep:true**）
  - {boolean} `immediate` - 立即触发回调（**immediate:true**）

返回值：{Function} `unwatch`

观察Vue实例上一个表达式或者函数**计算结果的变化**

```js
var unwatch = vm.$watch('a', cb)
unwatch() // 取消观察
```

> **注意**：
>
> 1. 在变更数组或对象时，旧值和新值指向同一对象和数组，**不会保留之前版本**
> 2. 第一次回调中不能通过`unwatch`取消，因为`unwatch`不存在

##### vm.$set

`vm.$set( target, propertyName/index, value )`

- {Object | Array} `target`
- {string | number} `propertyName/index`
- {any} `value`

返回值：**设置的值**

确保对象中`property`为响应式

> **注意**：对象不能是 Vue 实例，或者 Vue 实例的根数据对象

##### vm.$delete

`vm.$delete( target, propertyName/index)`

- {Object | Array}  `target`
- {string | number}   `propertyName/index`

删除对象的 property，用于避开 Vue `不能检测到 property 被删除`的限制

### 事件

#### vm.$on

`vm.$on( event, callback )`

- { string | Array\<string> } `event` (2.2.0+ 支持数组)
- { Function } `callback`

**监听**实例自定义事件，通过`$emit`触发

#### vm.$once

`vm.$once(event, callback)`

- {string} `event`
- {Function} `callback`

**监听**自定义事件，触发（一次）之后，**监听器销毁**

#### vm.$off

`vm.$off([event, callback])`

- {string | Array\<string>} `event` (2.2.2+ 支持数组)
- {Function} `[callback]`

**移除**自定义事件监听器。

- 无参数，移除**所有**事件监听器
- 事件，移除**该事件**所有监听器
- 事件+回调，移除**该回调**监听器

#### vm.$emit

`vm.$emit(eventName, [...args])`

- {string} `eventName`
- `[...args]`

**触发**当前实例事件。附加参数传给监听器。

### 生命周期

## 指令

### v-bind

缩写：`:`

预期：`any | Object`

参数：`attrOrProp`

修饰符：

- `.prop` - 作为DOM property 绑定（默认attribute）
- `.camel` - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase
- `.sync` (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器

```html
<!-- 动态 attribute 名 (2.6.0+) -->
<button v-bind:[key]="value"></button>
<!-- 动态 attribute 名缩写 (2.6.0+) -->
<button :[key]="value"></button>
<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">
<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">
<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>
<!-- 绑定一个全是 attribute 的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
<!-- 通过 prop 修饰符绑定 DOM attribute -->
<div v-bind:text-content.prop="text"></div>
<!-- ????? prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>
<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>
<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

## 特殊attribute

### key

类型 `number | string | boolean(2.4.0) | symbol (2.5.12)`

主要用于 **Vue虚拟DOM算法**，新旧nodes对比时**辨识VNodes**

- 不使用key， Vue使用最大限度**减少动态元素**且尽可能尝试**修改/复用相同元素**
- 使用key，**基于key**变化**重新排列**元素顺序，**移除key值不在元素**

应用：

可以用于**强制替换元素/组件**，**而不是重复利用**。

- 完整触发生命周期钩子函数
- 因为元素会被替换而不是修改，触发过度

### ref

类型 `string`

`ref`：元素或子组件**注册引用信息**

`$ref`：**引用信息**注册在`$refs`上

`ref`**作为渲染结果**被创建，初始渲染时不能访问，`$refs`**不是响应式**，**不要试图**用它在模板中做**数据绑定**

```html
<!-- `vm.$refs.p` will be the DOM node -->
<p ref="p">hello</p>

<!-- `vm.$refs.child` will be the child component instance -->
<child-component ref="child"></child-component>
```

> `v-for`  引用信息将是数组

### is

`string | Object(组件的选项对象)`

用于**动态组件**且基于 **DOM 内模板的限制**来工作

[动态组件](#动态组件)

## 内置组件

## VNode接口

## 服务器端渲染

# 风格指南

## A - 必要的

### 组件名为多个单词

**避免**跟现有的以及未来的 HTML **元素相冲突**

`todo` -  `todo-item or todoItem`

### 组件数据

组件中使用**data** ，值必须**返回函数对象**

如果不如此，每个组件实例都**引用相同对象**，它会导致所有实例间**共享数据**

### prop定义

**prop**定义应该**尽量详解**，**指定其类型**

- 代码易懂
- 易知错误来源

### v-for 设置 key

用`key`配合`v-for`，便于维护内部组件及其子树的状态

**Vue** 会使用一种**最大限度减少动态元素**并且尽可能的尝试就地修改/复用相同类型元素的算法

使用key后，会基于key变化**重新排列元素**

[refs](https://blog.csdn.net/weixin_41736818/article/details/107372595)

### 避免 v-if 和 v-for

不要让 `v-for` 和 `v-if` 同时使用在**同一元素**

因为`v-for`优先级高于`v-if`，只渲染部分用户，也会遍历整个列表

解决：

- 通过**computed过滤值**，代替`v-if`
  - 只遍历过滤列表，带**缓存**
  - **解耦**渲染层逻辑
- `v-if`写在**上层**

### 组件样式设置作用域

顶级 `App` 组件和布局组件中的**样式可以是全局**，但是其它**组件都应该**是**有作用域**

设置**一致作用域**会确保样式只会运用在它们**想要作用的组件上**

两种方式

- `scoped attribute`
- [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)
- [BEM](http://getbem.com/)

```html
<!-- 使用 `scoped` attribute -->
<style scoped></style>
<!-- 使用 CSS Modules -->
<style module></style>
<!-- 使用 BEM 约定 -->
<style>
.c-Button--close {}
</style>
```

### 私有property名

**使用模块作用域保持**不允许外部访问的函数的**私有性**

`_` ：Vue`私有property`

`$`：Vue`特殊实例 property`

使用 `$_`避免冲突，作为`用户自定义property`，附带命名空间以回避和其它作者的冲突

 (比如 `$_yourPluginName_`)

## B - 强烈推荐

## C - 推荐

## D - 谨慎使用





# 补充

## DOM property 和 attribute

ref: [1](https://blog.csdn.net/rudy_zhou/article/details/104058741)  [2](https://www.jb51.net/article/146813.htm) [3](https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html#answer-6004028)

`attribute`：dom元素在文档中作为 html 标签拥有的属性

`property`：dom元素在 js 中作为对象拥有的属性

- 标准属性：`attribute`和`property`是同步的
- 自定义属性：不会自动添加到`property`

### 转换

通过**attributes**输出，结果为**attr对象**

```html
<div class="divClass" id="divId" ></div>
```

```js
var divId = document.getElementById('divId');
console.log(divId.attributes); // 获取attribute
console.log(divId.getAttribute('class')) // 获取attribute值
```

html**自带属性**会转为 **property**，而**自定义不会**

```html
<div class="divClass" id="divId" haha="nihao"></div>
```

```js
// ...
// 获取property
console.log(divId.class);  //  divClass
console.log(divId.addUserDefine) // undefined
```

### 单向绑定

**修改property**属性，**不改变attribute**(value，class)

```html
<!-- 修改property -->
<input value="initValue" id="ipt"/>
<!-- 修改后 value="changeValue" -->
```

```js
// ...
ipt.value = 'changeValue'
console.log(ipt.value); // changeValue
console.log(ipt.getAttribute('value')); // initValue
```

**修改attribute**属性，**会改变property**，**property会自动同步**attribute

```js
 ipt.setAttribute('value','changeValue');
 console.log(ipt.value); // changeValue
 console.log(ipt.getAttribute('value')); // changeValue
```

> 对属性`property`可以赋任何类型的值，而对`attribute`只能赋值字符串

### 双向绑定

`id`，property与attribute更新会互相影响

`type`，但**值只能为已知值**（`text`，`submit`，`button`，`checkbox`等），如果值不正确，默认设置为`text`，

```js
var inputDom = document.querySelector('#inputId')
console.log(inputDom.getAttribute('type')) // text
console.log(inputDom.type) // text

inputDom.setAttribute('type','007')
console.log(inputDom.getAttribute('type')) // 007
console.log(inputDom.type) // text

inputDom.type = '008'
console.log(inputDom.getAttribute('type')) //008
console.log(inputDom.type) // text

inputDom.setAttribute('type','password')
console.log(inputDom.getAttribute('type')) // password
console.log(inputDom.type) // password

inputDom.type = 'password'
console.log(inputDom.getAttribute('type')) // password
console.log(inputDom.type) // password
```

# todo 

[侦听器案例](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)

[is](https://cn.vuejs.org/v2/api/#is)

 [DOM 模板解析说明](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项) 

https://cn.vuejs.org/v2/api/#devtools)

# https://cn.vuejs.org/v2/guide/components-registration.html

