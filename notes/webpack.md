# webpack

webpack是一个流行的前端项目构建工具(打包工具)，可以解决当前web开发中所面临的困境。让程序员把工作的重心放到具体的功能实现上，提高了开发效率和项目的可维护性。

- 友好的模块化支持
- 代码压缩混淆
- 处理js兼容问题
- 性能优化等

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

```js
// 自定义 JSON 模块 parser 
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

**使用 entry 配置手动地分离代码**

**最简单直观**的分离代码的方式。手动配置较多，并有一些隐患。



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

