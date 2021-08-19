[TOC]



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

## 选项

### 数据

### DOM

### 钩子函数

### 资源

### 组合

### 其他

#### inheritAttrs ^2.4+^

- **类型**：`boolean`

- **默认值**：`true`

- **详细**：

  默认行为：非`props attribute`会被 视为 `html attribute` 绑定在 **子组件根元素**上

  `inheritAttrs：false`，去掉默认行为。

  `$attrs`^2.4+^：通过 `$attrs`获取非 `props attribute`，再通过 `v-bind`可以使其绑定到非根元素上
> **不影响** `class` 和 `style` 绑定

## 实例

### property

| 属性        | 类型                              | 权限 | 详情                                                  |
| ----------- | --------------------------------- | ---- | ----------------------------------------------------- |
| `$data`     | Object                            |      | data对象                                              |
| `$props`    | Object                            |      | props对象                                             |
| `$el`       | Element                           | 只读 | Vue实例根DOM元素                                      |
| `$options`  | Object                            | 只读 | Vue实例初始化选项                                     |
| `$parent`   | Vue instance                      | 只读 | 父实例                                                |
| `$root`     | Vue instance                      | 只读 | 当前组件根Vue实例，<br />如果没有父实例，此实例为本身 |
| `$children` | Array<Vue instance>               | 只读 | 当前实例直接子组件<br />不保证顺序，也非响应式        |
| `$slots`    | { [name: string]: ?Array<VNode> } | 只读 | 访问插槽分发内容                                      |



#### vm.$slots

- **类型**：`{ [name: string]: ?Array<VNode> }`

- **只读**

- **响应性**：否

- **详细**：

  访问父组件向子组件分发的插槽内容。

  `v-slot:foo` 对应 `vm.$slots.foo` 的内容。

  `v-slot:default` 对应 `v-slot:default` 的内容。

  >插槽**不是**响应性。
  >
  >在子组件获取此值。

#### vm.$slots

*具名插槽*有相应 property (`v-slot:foo`  >> `vm.$slots.foo` )

`default` property 包括了所有*没有被包含在具名插槽中*的节点（`v-slot:default`） 内容。

> **插槽不是响应性的**。如果需要一个组件可以在被传入的数据发生变化时重渲染，建议 `props` 或 `data` 等响应性实例选项。



#### vm.$attrs  ^2.4.0^

- **类型**：`{ [key: string]: string }`

- **只读**

- **详细**：

  包含父作用域 `attribute`，需满足下面条件

  - 非 class 和 style
  - 非 prop

  > 可通过 `v-bind="$attrs"` 传入内部组件



#### vm.$listeners ^2.4.0^

- **类型**：`{ [key: string]: Function | Array<Function> }`

- **只读**

- **详细**：

  包含`v-on`事件

  - 不含 `.native`修饰符

  > 可通过 `v-on="$listeners"` 传入内部组件

### 方法

### 数据

#### vm.$watch

`vm.$watch( expOrFn, callback, [options] )`

- {string | Function}  `expOrFn`
- {Function | Object}  `callback`
- {Object} - `[options]`
  - {boolean} `deep` - 监听内部值变化，数组可以不用（**deep:true**）
  - {boolean} `immediate` - 立即触发回调（**immediate:true**）

返回值：{Function} `unwatch`

观察Vue实例上一个表达式或者函数**计算结果的变化**

```js
var unwatch = vm.$watch('a', cb)
unwatch() // 取消观察
```

> 1. 在变更数组或对象时，旧值和新值指向同一对象和数组，**不会保留之前版本**
> 2. 第一次回调中不能通过`unwatch`取消，因为`unwatch`不存在

#### vm.$set

`vm.$set( target, propertyName/index, value )`

- {Object | Array} `target`
- {string | number} `propertyName/index`
- {any} `value`

返回值：**设置的值**

确保对象中`property`为响应式

> **注意**：对象不能是 Vue 实例，或者 Vue 实例的根数据对象

#### vm.$delete

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

