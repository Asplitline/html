# 一文彻底搞懂ES6 Module

https://mp.weixin.qq.com/s/pSTZq3DJBeAA-F8g5nJd8g

## 为什么需要模块化

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

## 没有模块化

- 变量和方法不容易维护，容易污染全局作用域
- 加载资源的方式通过script标签从上到下。
- 依赖的环境主观逻辑偏重，代码较多就会比较复杂。
- 大型项目资源难以维护，多人合作，资源引入更为复杂

## 模块化

- CommonJs (代表：node.js早期)
- AMD (代表：require.js)
- CMD (代表：sea.js)
- ES Module

### AMD

`Asynchronous ModuleDefinition`（AMD），异步模块定义

采用**异步加载**模块。

所有依赖模块的语句，都定义在一个回调函数中，模块加载完成后，回调才会定义。

代表库为`require.js`

```js
/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```

### CommonJs

`CommonJS` 是一套 `Javascript` 模块规范，**用于服务端**

- **所有代码运行在模块作用域**，不会污染全局作用域
- 模块是**同步加载**的，即只有加载完成，才能执行后面的操作
- 存在缓存，首次执行会缓存，再次执行加载缓存。重新缓存，需清除缓存
- `require`返回值是拷贝值，随后修改不会影响源

```js
// a.js
module.exports={ foo , bar}

// b.js
const { foo,bar } = require('./a.js')
```

### ES6 Module

ES6 在语言标准的层面上，实现了`Module`，成为**浏览器和服务器通用**的模块解决方案

`CommonJS` 和`AMD` 模块，都**只能在运行时确定**。输入时 ==?? 必须查找对象属性==

**ES6设计思想**：静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

```jsx
// CommonJS模块
let { stat, exists, readfile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
// ES6
import { stat, exists, readFile } from 'fs';
```

上述代码中，**import 只加载3个方法，且在编译时完成**。

## 使用

两个命令

- `export`：规定模块的**对外**接口
- `import`：**输入**其他模块提供的功能

### export

一个模块就是一个独立的文件，该文件内部的所有变量独立。

**export**：帮助外部读取内部变量

```jsx
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

或 
// 建议使用下面写法，这样能瞬间确定输出了哪些变量
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

别名：通过`as`

```js
export {
  v1 as streamV1,
};
```

### import

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块

```js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

- `as` 取 别名

```js
import { lastName as surname } from './profile.js';
```

- `*` 加载整个模块

```js
import * as circle from './circle';
```

- 输入的变量都是只读的，不允许修改，但是如果是对象，允许修改属性（**不建议修改**）

```js
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
a = {}; // Syntax Error : 'a' is read-only;
```

- `from` ：指定文件位置（相对路径或绝对路径）。如果为模块名，需要有==??配置文件==

- **import 自动会提升到头部**

```js
foo();

import { foo } from 'my_module';
```

- 多次重复导入，只执行一次

### export default

```jsx
export default function () {
    console.log('foo');
}
```

无需变量名或函数名就可完成加载

```js
import customName from './export-default';
customName(); // 'foo'
```

### import() - 动态加载

将`import()`作为函数调用

- 参数：模块的路径。
- 返回： `promise`，它用一个模块对象来实现，让你可以访问该对象的导出

```js
import('/modules/myModule.mjs')
  .then((module) => {
    // Do something with the module.
  });
```

