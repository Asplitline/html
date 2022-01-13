[TOC]



# 基础

##  Vue实例

### [数据与方法](https://cn.vuejs.org/v2/guide/instance.html#数据与方法)

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

当这些数据改变时，视图会进行重渲染。值得注意的是**只有当实例被创建时就已经存在于 `data` 中的 property 才是响应式的**。

以后需要一个 property，但是一开始它为空或不存在，那么你仅**需要设置一些初始值**

例外是使用 `Object.freeze()`，这会**阻止修改现有 property**，也意味着响应系统**无法再追踪**变化。

 **实例 property 与方法**：它们都有前缀 `$`，以便与用户定义的 property 区分开来

> $0.__vue__ 浏览器获取vue

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
<input :value="searchText" @input="searchText=$event.target.value">
```

组件中使用v-model

```html
<my-input
  :value="searchText"
  @input="searchText = $event"
></my-input>
<!-- my-input -->
<!-- 通过props接收值，$emit发送值-->
<input :value="value" @input="$emit('input',$event.target.value)">
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

# 深入了解组件

## 组件注册

```js
// kebab-case - 引用时必须使用 kebab-case
Vue.component('my-component-name',{ /* ... */ })
// PascalCase - 引用时两者都行
Vue.component('MyComponentName', { /* ... */ }
```

> 命名规则：建议字母小写，含连字符。避免和当前以及未来的 HTML 元素相冲突

### 全局注册

注册后可以在任何新创建的 Vue 根实例 (`new Vue`) 的模板

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

### 局部注册

局部注册的组件在其子组件中不可用，需手动引入才能使用

```js
var ComponentA = { /* ... */ }
var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

### 模块系统

#### 基础组件自动化全局注册

 `require.context` 全局注册通用基础组件

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

## Prop

### prop大小写

html大小写不敏感，**驼峰法**要转**短横线**，字符串模板不存在限制

```html
<blog-post post-title="hello!"></blog-post>
```

```js
Vue.component('blog-post', {
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

### prop类型

以**对象**形式列出prop

```js
props: {
  title: String,
  // ...
  contactsPromise: Promise // or any other constructor
}
```

### 动态prop

使用 `v-bind`传入动态prop

```html
<blog-post v-bind:title="post.title"></blog-post>
```

传入所有property，使用**不带参数**的`v-bind`

```html
<blog-post v-bind="post"></blog-post>
<!-- 
v-bind:id 
v-bind:title 
-->
```

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

### 单项数据流

**父prop会更新子组件**，**反之不行**。防止子组件意外变更父级。

**子组件不应该在组件中改变prop**，应该由父组件刷新。用以下方式代替。

- data定义本地值
- 为prop定义计算属性

> **对象和数组**是通过引用传入的，子组件中改变变更这个对象或数组本身**将会影响到父组件**的状态

### prop验证

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

prop 会在一**个组件实例创建之前进行验证**，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的

**type**：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`

*type取值还可以自定义构造函数*

### 非prop的Attribute

- 组件上`Attribute`自动添加到根元素
- 替换/合并已有的`Attribute`
- 禁用Attribute继承，禁用后给组件`attribute`手动赋值（不影响*class*，*style*）。

```js
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

## 自定义事件

### 事件名

不同于组件和prop，事件名不存在大小写转换。始终推荐**短横线**，在html中`myEvent - >  myevent` 始终无法匹配

### 自定义v-model

`v-model = @input  + value` - 默认

2.2.0+ 手动设置`value`和`event`

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
<!-- lovingVue传入checked，并且change事件触发更新-->
```

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean // 必须声明
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

### 原生事件

组件监听原生事件 `.native`

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

**`.native`失效场景**

```html
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

通过`$listenters` property解决，里面包含组件上所有监听器

通过 `v-on="$listenters"`将组件所有监听器**指定到某个元素**

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
     // 将组件所有监听器 添加到label下input中
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          // ques why
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

### .sync 修饰符

2.3.0+

推荐以 `update:myPropName`方式变更父组件，实现双向绑定。

`.sync`和`v-bind`不能使用表达式，`v-bind:title.sync="doc.title + '!'"`不合法

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
<!-- 等效写法 -->
<text-document v-bind:title.sync="doc.title"></text-document>
```

```js
this.$emit('update:title', newTitle)
```

设置多个prop，直接配合`v-bind`和`sync`

```html
<text-document v-bind.sync="doc"></text-document>
```

## 插槽

组件内没有插槽`<slot>`，标签之间的元素会忽略

### 编译作用域

插槽不能访问`<navigation-link>`作用域

插槽内容是传递给`<navigation-link>` ，而不是在 `<navigation-link>` 组件内部定义的。

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!-- `url` 会是 undefined-->
</navigation-link>
```

> **父**模板所有内容都是在父级作用域中编译，**子**模板所有内容都是在子作用域中编译

### 后备内容

`<slot>content</slot>`  默认显示content（后备内容），提供内容，只会取代后备内容

### 具名插槽

`<slot>` ： `name` attribute，定义额外插槽

父级组件

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
  <!-- name="default" -->
   <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

子级组件：通过`template` + `v-slot:name`向 模板中填充内容

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <!-- 未被v-slot包裹视为默认插槽,v-slot:default -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

旧版写法：3.0废弃

```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>
  <!-- 未被v-slot包裹视为默认插槽,v-slot:default -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```



### 作用域插槽

使插槽能**访问子组件数据**。

父级组件：通过`v-slot:default`获取值

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

子级组件：通过`v-bind`绑定值

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

父级组件只有默认插槽，`v-slot`可以**放到组件**上，*正常情况 `v-slot` 都是放在 `template` 上*

```html
<!-- default 可以省略-->
<current-user v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
</current-user>
```

**默认插槽缩写和具名插槽不能混用**，会导致作用域不明确

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

多个插槽，为**所有插槽**写**完整语法**

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

作用域插槽原理：将你的插槽内容包裹在一个拥有单个参数的函数里。**支持解构和默认值**

```html
<current-user v-slot="{ user }" />
<current-user v-slot="{ user: person }" />
<current-user v-slot="{ user = { firstName: 'Guest' } }" />
```

### 动态插槽名

`v-slot:[dynamicSlotName]`

缩写：`v-slot:header` 可以被重写为 `#header`

**注意**：无效写法`#="{user}"`，有效写法`#default="{user}"`

## 动态组件 & 异步组件

通过`is` attribute 切换动态组件，每次切换时都会**新建组件实例**

```html
<component v-bind:is="currentTabComponent"></component>
```

### keep-alive

通过`keep-alive`包裹，缓存不活动组件，避免重新渲染。自身不会渲染DOM，是*抽象组件*

组件切换时，触发 `activated` 和 `deactivated` 这两个生命周期钩子函数。

> 2.2.0+ , 这两个钩子函数会在**树内所有嵌套组件**中触发

```html
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

####  条件

- 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

- **要求`keep-alive`同时只有一个子元素被渲染**

#### props

- `include ` *2.1.0+*
  - `string | RegExp | Array`
  - 名称匹配的组件**会**被缓存
  - 匹配规则
    - 匹配组件**自身** `name`
    - name不可用，**匹配局部注册名称**（父组件 `components` 选项的键值）
    - 匿名组件不能匹配

```html
<keep-alive include="a,b" >
<keep-alive :include="/a|b/" >
<keep-alive :include="['a', 'b']" >
```

- `exclude ` *2.1.0+*
  - `string | RegExp | Array`
  - 名称匹配的组件都**不会**被缓存
  - 同上
- `max` *2.5.0+*
  - `number`
  - **最多缓存**多少组件实例
  - 数量达到，清除**最久**没有访问的实例

>`<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

### 异步组件

**以工厂函数的方式定义你的组件**，会**异步**解析你的组件定义。

组件**需要被渲染**才会触发该工厂函数，且会把**结果缓存**起来供未来重渲染。

#### 全局组件

```js
Vue.component('async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

#### 局部组件

```js
new Vue({
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

#### 处理加载状态 2.3.0+

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

## 处理边界情况

### 访问元素&组件

**访问根实例**：根实例可以通过 `$root` property 进行访问

**访问父级组件实例**：`$parent` property 可以用来从一个子组件访问父组件的实例

**访问子组件或子元素**：除了prop和事件，还可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

> `$ref` 组件渲染完成之后生效，并且**不是响应式**

ref 补充

1. 普通元素中：$refs 获取的是dom元素
2. 组件中：$refs 获取的是组件实例，通过 \$el获取组件元素

```vue
<Demo ref="demo"></Demo>
<div ref="divDemo">123</div>
```

```js
console.log(this.$refs.demo)
// VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
console.log(this.$refs.demo.$el)
// <div class="demo">12313</div>
console.log(this.$refs.divDemo)
// <div ref="divDemo">123</div>
```



### 依赖注入

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法

> refs:[provide/inject](https://cn.vuejs.org/v2/api/#provide-inject)

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

在任何后代组件里，都可以使用 `inject` 选项来接收指定的数据/方法

```js
inject: ['getMap']
```

依赖注入可以理解为**大范围有效的prop**

- 祖先不需要知道哪些后代组件使用
- 后代组件也不需要直到property来自哪里

缺陷

- **耦合度高**，重构困难
- property**非响应式**

### 程序化的事件侦听器

普通

- 需要在组件实例中**保存变量**
- 清理代码独立于创建代码

```js
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```

程序化侦听

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

### 循环引用

#### 递归组件

组件可以在自**己模板中调用自身**。只能通过 `name`选项来调用

全局注册一个组件时，这个全局的 ID 会自动设置为该组件的 `name` 选项

无限循环

```js
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```

#### 组件间循环引用

两个组件称为 A 和 B。模块系统发现它需要 A，但是**首先 A 依赖 B，但是 B 又依赖 A**，但是 A 又依赖 B，如此往复。这变成了一个循环，不知道如何不经过其中一个组件而完全解析出另一个组件。

需要给模块系统一个点，“A *反正*是需要 B 的，但是我们不需要先解析 B。”

**两种方案**

- 生命周期钩子 `beforeCreate` 时去注册它
- 本地注册组件的时候，你可以使用 webpack 的异步 `import`

```js
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```

```js
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

### 模板定义替代品

#### 内联模板

`inline-template` 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其**里面的内容作为模板**，而不是将其作为被分发的内容。

缺陷：作用域更难理解，建议使用`<template>`

#### X-Template

 `<script>` 元素中，带上 `text/x-template` 的类型，通过一个 `id` 将模板引用过去

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```

```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

缺陷：模板和定义分开

#### 控制更新

强制更新：通过 `$forceUpdate`强制渲染Vue实例，仅影响**实例本身**和**插入插槽内容的子组件**，并非所有子组件

#### v-once

组件包含了**大量静态内容**，可以在根元素上添加 `v-once` attribute 以确保这些内容**只计算一次然后缓存起来**

# 过渡 & 动画

## 单元素/组件过度

 `transition` ：在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

`transition`会对里面元素做以下处理

- 自动嗅探目标元素是否应用了 CSS 过渡或动画
- 过渡组件提供了 [JavaScript 钩子函数](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)，这些钩子函数将在恰当的时机被调用
- 没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行

`<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`

### 过渡的类名

<img src="https://cn.vuejs.org/images/transition.png" alt="过渡" style="zoom: 50%;" />

*六个class*

`*-active`：过渡过程，`*-enter`,`*-leave`：过渡前后

- `v-enter`：进入过渡开始状态
  - 生效：插入之前
  - 移除：插入之后下一帧
- `v-enter-active`：进入过渡生效状态
  - 生效：插入之前
  - 移除：过渡/动画完成之后
  - 定义进入过渡的过程时间，延迟和曲线函数
- `v-enter-to` *2.1.8+*：进入过渡结束状态
  - 生效：插入之后下一帧（*v-enter移除*）
  - 移除：过渡/动画完成之后
- `v-leave`：离开过渡开始状态
  - 生效：离开触发
  - 移除：离开触发下一帧
- `v-leave-active`：离开过渡生效状态
  - 生效：离开触发
  - 移除：过渡/动画完成之后
  - 定义进入过渡的过程时间，延迟和曲线函数
- `v-leave-to` *2.1.8+*：离开过渡结束状态
  - 生效：离开触发下一帧（*v-leave移除*）
  - 移除：过渡/动画完成之后

### 自定义过渡切换类名

*优先级高于普通的类名*

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

### css过渡和css动画

动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除。

### 同时使用动画和过渡

Vue设置相应的事件来监听过渡的完成状态。

`transitionend` 或 `animationend`，取决于元素 CSS 规则。只使用*一种*，Vue会*自动识别类型并设置监听*

同时使用，需要在 `type` attribute 并设置 `animation` 或 `transition` 来明确声明你需要 Vue 监听的类型。

### 显性的过渡持续时间  

Vue 自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。

 `<transition>` 组件上的 `duration` prop *自定义*显性的*过渡持续时间* (*ms*)

```js
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JavaScript 钩子

```js
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

第一参数：`dom元素`

第二参数：`done`回调

```js
methods: {
  // 进入中
  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时,回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // 离开时
  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时,回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

>只用 JavaScript 过渡的时候，**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。
>
>否则，它们将被*同步调用**，过渡会立即完成*。

> 仅有 JavaScript 过渡的元素添加 `v-bind:css="false"`
>
> Vue 会跳过 CSS 的检测，可避免过渡中 CSS 的影响

# 可复用性&组合

## 混入

```js
// 定义一个混入对象
var myMixin = {
  created() {
    // ...
  },
  methods: {
    hello() {
      // ...
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 选项合并

**数据对象**：在内部进行递归合并，同名以*组件数据优先*

**钩子函数**：将合并为数组，都被调用，*混子钩子先于组件钩子*

**值为对象的选项**：（`methods`、`components` 、`directives`）合并为同一个对象，对象键名冲突，*取组件对象键值对*

> `Vue.extend()`使用同样策略合并

### 全局混入

一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例，可以用来*为自定义选项注入处理逻辑*

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

### 自定义选项合并策略

自定义选项*将使用默认策略*，即*简单地覆盖已有值*。

如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

## 自定义指令

*代码复用和抽象*的主要形式是*组件*，有时，需要对普通 *DOM 元素进行底层操作*

### 指令

**全局指令**

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

**局部指令**：接受一个 `directives` 的选项

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

**使用**

```html
<input v-focus>
```

### 钩子函数

`bind`：指令*第一次绑定*到元素时调用（*一次性*）。可以进行初始化设置

`inserted`：被绑定元素插入父节点时调用。（*仅保证父节点存在，不保证已被插入文档*）

`update`：所有组件 VNode更新时调用（*有可能发生在子VNode更新之前*）

`componentUpdated`：组件VNode及子VNode*全部更新后*调用

`unbind`：指令与元素*解绑时*调用（一次性）

### 钩子函数参数

- `el`：指令所绑定的元素，可以用来*直接操作 DOM*。
- `binding`：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。
  - `arg`：传给指令的参数，可选。
  - `modifiers`：一个包含修饰符的对象。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
// name  - demo
// value - hello!
// expression - message
// arg - foo
// modifiers - {"a":true,"b":true}
new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

> 除了 `el` 之外，其它参数*都应该是只读的*，切勿进行修改。
>
> 需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

**动态参数指令**：指令的参数可以是动态的。

 `v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新

**函数简写**：在`bind`和`update`触发相同行为，不关心其他钩子

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

**对象字面量**：指令需要多个值，传入Js对象字面量

```js
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

## 渲染函数 & JSX

### 动态标题

```html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

#### template方式

```html
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  ...
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
```

#### render函数方式

```js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

### 节点、树以及虚拟 DOM

每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。

```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```

<img src="https://cn.vuejs.org/images/dom-tree.png" style="zoom: 50%;" />

### 虚拟DOM

Vue 通过建立一个**虚拟 DOM** 来追踪自己要如何改变真实 DOM。

```js
return createElement('h1', this.blogTitle)
```

`createElement`：不是一个*实际的* DOM 元素，而是返回`createNodeDescription`，页面上需要渲染什么样的节点，包括及其子节点的描述信息。又叫**虚拟节点**

### createElement参数

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}  必填项
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。
  'div',

  // {Object} 可选
  // 一个与模板中 attribute 对应的数据对象。
  {
    // (详情见下一节)
  },

  // {String | Array} 可选
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

#### 数据对象

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```



## 插件

**用途**

- 全局方法 或 property
- 全局资源：指令、过滤器、过渡
- 全局混入
- Vue实例方法，`Vue.prototype`
- 提供自己API

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

**使用**

全局方法 `Vue.use()`，需要在`new Vue()`之前调用

- 可传入可选选项对象

```js
Vue.use(MyPlugin, { someOption: true })
```

- `Vue.user()`阻止多次注册相同插件



## 过滤器

用于常见文本格式化。

**使用场景**：*双花括号插值*和 *`v-bind` 表达式*（*2.1.0+*）

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

**全局过滤器**

```js
Vue.filter('capitalize', function (value) {
  return ...
})
```

**局部过滤器**

```js
filters: {
  capitalize(value) {
    return ...
  }
}
```

全局和局部*同名*，*采用局部*

过滤器函数接收*表达式的值为第一个参数*。

过滤器可以*串联*

```js
{{ message | filterA | filterB }}
```

过滤器是Javascript函数，也可*接收多个参数*

```js
{{ message | filterA('arg1', arg2) }}
```



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

