# 前端工程化

## 模块化相关规范

### 模块化概述

#### 传统开发模式问题

- 命名冲突
- 文件依赖

#### 通过模块化解决

 模块化就是把单独的一个功能封装到一个模块（文件）中，模块之间相互隔离，但是可以通过特定的接口公开内部成员，也可以依赖别的模块

#### 模块化开发好处

方便代码的重用，从而提升开发效率，并且方便后期的维护后

### 浏览器端模块化规范

- AMD - Require.js
- CMD - Sea.js

### 服务器端模块化规范

#### CommonJS

- 模块分为**单文件模块**与**包**
- 模块成员导出: `module.exports和exports`
- 模块成员导入: `require ('模块标识符')`

### ES6模块化 - 大一统

在ES6模块化规范诞生之前，Javascript社区已经尝试并提出了AMD、CMD、CommonJs等模块化规范。

但是，这些社区提出的模块化标准，还是存在一定的差异性与局限性、并不是浏览器与服务器通用的模块化标准，

- AMD和CMD适用于**浏览器端**的Javascript模块化
- commonJs适用于**服务器端**的Javascript模块化

Es6语法规范中，在语言层面上定义了ES6模块化规范，是浏览器端与服务器端通用的模块化开发规范。

- 每个js文件都皇一个独立的模块
- **导入模块成员**使用**import**关键字
- **暴露模块成员**使用**export**关键字

#### Node.js中通过babel体验ES6模块化

```shell
# 1 
# core - babel核心 
# cli - 命令行工具
# preset-env - 环境配置 
npm install --save-dev @babel/core @babel/cli @babel/preset-env
# 2 polyfill - 转义高级语法
npm install —-save @babel/polyfill
# 3 根目录创建并配置babel.config.js
# 4 执行示例文件，判断是否解析成功
npx babel-node index.js
```

**babel.config.js**

```js
const presets = [
    ["@babel/env", {
        targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1"
        }
    }]
];
module.exports = { presets };
```

#### ES6模块化的基本语法

##### 默认导出与默认导入

每个模块 export default 只能**使用一次**

```js
let a = 10
let b = 20
let c = 30
function show() { console.log('hello es6')}

export default {
    a,
    b,
    show
}


import a from './a'
```

##### 按需导入和按需导出

**按需导入和导出可以使用多次**

```js
export let s1 = '123'
export let s2 = '456'
export function say() { console.log("hello") }

import { s1, s2, say as sayHi } from './a'
```

> **默认导出中内容中，不包含按需导出内容**

##### 直接导入

单纯执行某个模块中的代码，并不需要得到模块中向外暴露的成员

```js
import './b'
```

## Web开发面临的困境

- 文件依赖**关系错综复杂**
- 静态资源**请求效率低**
- 模块化**支持不友好**
- 浏览器对高级Javascript特性**兼容程度较低**
- etc...





