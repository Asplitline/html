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

# webpack

webpack是一个流行的前端项目构建工具(打包工具)，可以解决当前web开发中所面临的困境。让程序员把工作的重心放到具体的功能实现上，提高了开发效率和项目的可维护性。

- 友好的模块化支持
- 代码压缩混淆
- 处理js兼容问题
- 性能优化等

```shell
# 自定义 JSON 模块 parser 
# 预获取/预加载模块(prefetch/preload module) 
```



## 基本安装

```shell
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

```shell
# 生产环境
npm install --save
# 开发环境
npm install --save-dev

# -D = --save-dev
# -P = --save-prod
```

## 运行

Node 8.2/npm 5.2.0 以上版本提供的 `npx` 命令

**默认**：`src/index.js 作为入口起点`

```shell
# npx方式运行
npx webpack
# 二进制文件方式运行
./node_modules/.bin/webpack
```

> src/index.js 作为入口起点

## 配置

如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它

```shell
webpack.config.js
# 通过配置文件构建
npx webpack --config webpack.config.js 
# 简化命令
npx webpack
```

## 管理资源

```shell
# css
npm install --save-dev style-loader css-loader
# 数据
npm install --save-dev csv-loader xml-loader
```

### webpack.config.js

```js
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // 添加规则
    module: {
        rules: [
            { // css
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], //逆序执行
            },
            { // 图片
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource',
            },
            { // 字体
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            { // 数据
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            { // xml
                test: /\.xml$/i,
                use: ['xml-loader'],
            },

        ]
    }
}
```

### index.js

```js
// 1. 通过html中外部引入
// 2. 通过import 导入
import _ from 'lodash'

// 引入css
import './style.css'
// 引入图片
import Icon from './pic.jpg'
// 引入数据 (JSON,CSV,TSV,XML)
import Data from './data.xml'
import Notes from './data.csv'
import json from '../package.json'

function component() {
    const element = document.createElement('div')
    // lodash
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    // css
    element.classList.add('hello'); //添加hello类
    // 图片
    // 1.img
    // 2.css background
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    // 数据
    console.log(Data);
    console.log(Notes);
    console.log(json);
    return element;
}

document.body.appendChild(component());
// npx webpack 构建项目
```

## 管理输出

```shell
# HtmlWebpackPlugin
npm install --save-dev html-webpack-plugin
# 清理插件 清理 dist
npm install --save-dev clean-webpack-plugin
```

### index.js print.js

```js
//index.js
import _ from 'lodash';
import printMe from './print.js';
function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());

// print.js
export default function printMe() {
    console.log('I get called from print.js!');
}
```

### webpack.config.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 两个入口文件，两个出口文件
    entry: {
        index: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ // 带s
        // 每次构造前清理 /dist
        new CleanWebpackPlugin(),
        // 生成index.html
        new HtmlWebpackPlugin({
            title: '管理输出'
        })
    ]
}
```



## 开发环境

### 开发工具

#### watch mode(观察模式)

文件被更新，代码将被重新编译，**需要刷新浏览器**

```js
"watch": "webpack --watch",
```

####  webpack-dev-server

提供了一个简单的 web server，并且具有 live reloading(**实时重新加载**) 功能。

```shell
npm install --save-dev webpack-dev-server
```

```js
"start": "webpack serve --open"
```

####  webpack-dev-middleware

`webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。

`webpack-dev-server` 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。

```shell
# webpack-dev-middleware 配合 express server 的示例
npm install --save-dev express webpack-dev-middleware
```

```shell
"server": "node server.js"
```

##### server.js

通过express+webpack，将文件跑在真实的服务器上

```js
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

// 使用webpack-dev-middleware
// 将webpack.config.js配置文件作为基础配置
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
)
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
})
```

### webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 生产环境
    mode: 'development',
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    // 更容易地追踪 error 和 warning
    devtool: 'inline-source-map',
    devServer: {
        // 将dist目录下文件移到 localhost:8080下
        // 不会写入到任何输出文件，将bundle文件保留在内存中
        contentBase: './dist',
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // 不自动移除无用文件
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // 在 server 脚本使用 publicPath
        // 以确保文件资源能够正确地 serve 在 http://localhost:3000
        publicPath: '/',
    },
};
```

### index.js

[index.js](#index.js print.js)

## 代码分离

把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。

代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

### 入口起点(entry point) 

使用 [`entry`](https://webpack.docschina.org/configuration/entry-context) 配置手动地分离代码

**最简单直观**的分离代码的方式。手动配置较多，并有一些隐患。

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来

### 防止重复(prevent duplication) 

使用 [Entry dependencies](https://webpack.docschina.org/configuration/entry-context/#dependencies) 或者 [`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin) 去重和分离 chunk。

#### 入口依赖  - 选项

配置 [`dependOn` option](https://webpack.docschina.org/configuration/entry-context/#dependencies) 选项，这样可以在多个 chunk 之间共享模块

```js
module.exports = {
    mode: 'development', // 构建开发模式 
    entry: {
        // 1.入口起点 
        // index another中都由lodash，重复引用
        // index: './src/index.js',
        // another: './src/another-module.js'
        // 2.防止重复
        // 2.1 入口依赖 deepOn
        index: {
            import: './src/index.js',
            dependOn: 'shared'
        },
        another: {
            import: './src/another-module.js',
            dependOn: 'shared'
        },
        shared: 'lodash'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        // 一个 HTML 页面上使用多个入口时
        runtimeChunk: 'single'
    }
}
```

#### SplitChunksPlugin - 插件

[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

[`mini-css-extract-plugin`](https://webpack.docschina.org/guides/code-splitting/plugins/mini-css-extract-plugin): 用于将 CSS 从主应用程序中分离

```js
// 2.2 SplitChunksPlugin 
module.exports = {
    mode: 'development', // 构建开发模式 
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
```

### 动态导入(dynamic import)

#### import()

`function(string path):Promise`

动态的加载模块。调用 `import` 的之处，被视为分割点，意思是，**被请求的模块和它引用的所有子模块，会分割到一个单独的 chunk 中**。

```js
// 3.动态导入
module.exports = {
    mode: 'development', // 构建开发模式 
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
```

#### index.js

```js
// 动态导入
// 普通版
/* function getComponent() {
    // const element = document.createElement('div')
    return import('lodash')
        .then(({ default: _ }) => {
            const element = document.createElement('div');
            element.innerHTML = _.join(['hello', 'webpack'], ' ')
            return element
        })
        .catch(error => 'An error occurred while loading the component')
} */

// async简化
async function getComponent() {
    const element = document.createElement('div')
    const { default: _ } = await import('lodash')
    element.innerHTML = _.join(['hello', 'webpack'], ' ')
    return element
}

getComponent().then(component => {
    document.body.appendChild(component)
})
```



## package.json

```js
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
  "main": "index.js",
  "private": true, // 确保我们安装包是 private(私有的)
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "build": "webpack", //自定命令 npm run build
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   }
 }
```



