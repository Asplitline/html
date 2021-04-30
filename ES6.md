# ES6

## let 和 const

JS作用域：全局作用域（var声明，变量提升）、函数作用域、块级作用域（es6新增）

### let

**let关键字**：声明的变量只在当前代码块中生效（块级作用域）

- 可以重新赋值
- 不能在同一作用域重复声明
- 无变量提升 - 防止变量声明前使用变量

解决问题：

- **解决i丢失**的问题 - 不同于var**全局有效**，每次循环**let**都是重新声明的变量
- 内层变量可能会覆盖外层变量
- 替代匿名函数

**块级作用域**：内层作用域可以定义外层作用域的同名变量，ES6 的块级作用域**必须有大括号**

块级作用域**对函数**

- **允许在块级作用域之中声明函数**，行为同let变量（es5不允许）
- 函数提升到**全局作用域或函数作用域的头部**
- 函数声明还会提升到所在的**块级作用域的头部**

### const

- 只读常量，声明后不可改
- 必须给初始值
- 只在声明所在的块级作用域内有效
- 存在`TDZ`

**并不是保障值不变，而是变量指向内存地址不得改动**

普通类型：值保存在变量指向内存地址
引用类型：变量指向存放实际数据的指针

>对象冻结，应该使用`Object.freeze`方法，冻结后添加新属性不起作用，严格模式时还会报错

六种声明变量方法 ：`var、function、let、const、import、class`

### 暂时性死区

ES6 规定，区块中存在`let`和`const`命令，区块对`let const`声明的变量，形成了封闭作用域。声明之前就使用这些变量，就会报错，称为**暂时性死区**（temporal dead zone）

**本质**：进入作用域，变量就已经存在了，但是不可获取，只有声明变量的那一行代码之后（tdz结束），才可以获取和使用该变量。

```js
// #1
typeof x; // ReferenceError
let x; // tdz 结束
// #2
function bar(x = 2, y = x) {}
// #3 
let z=z
```

## 顶层对象

浏览器里面，顶层对象是`window`

浏览器和 Web Worker 里面，`self`也指向顶层对象

Node 里面，顶层对象是`global`

```js
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

ES2020引入`globalThis`作为顶层对象

## 解构赋值

**解构**：自动解析数组或对象中的值，并赋值给指定的变量

### 数组解构

**按序次**排列，解构不成功 ，undefined

```js
let [a, b, c] = [1, 2, 3]
let [foo, [[bar], baz]] = [1, [[2], 3]]
let [ , , third] = ["foo", "bar", "baz"]
let [x, y, ...z] = ['a'];
// y - undefined z -[]
let [a, [b], d] = [1, [2, 3], 4 , 5]; // 部分解构
let [foo = true] = []; // 指定默认值
let [x = f()] = [1]; // 惰性求值，f()不会执行
let [x = 1, y = x] = []; // 引用解构变量
```
等号右边为不可遍历结构，报错

ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值，就是判断是否严格等于`undefined`。(`null`与`undefined`不严格相等)

> **不可遍历结构**：`1、false、NaN、undefined、null、{}`

### 对象解构

不按序次，但需与变量**同名**，解构不成功 ，undefined

```javascript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
const { log } = console;
let { first: f, last: l } = { first: 'hello', last: 'world' }; // 别名
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
// {x} 会被解析为代码块
// 正确的写法
let x;
({x} = {x: 1});
let {0 : first, [arr.length - 1] : last} = [1,2,3] // 解构数组，数组本质为特殊对象
```

### 字符串解构

```js
const [a, b, c, d, e] = 'hello';
let {length : len} = 'hello';
```

### 数值和布尔值解构

解构赋值时，等号右边的值**不是对象或数组**，则会**先转为对象**。`undefined`和`null`无法转为对象，所以解构赋值报错

数值和布尔值的包装对象都有`toString`属性

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

### 函数参数解构

```js
function add([x, y]){
  // ...
}
add([1, 2]); // 3
// 含默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

// 函数参数使用解构数组/对象，调用函数不传参数会报错
function fn([x, y, z]){
  	console.log(x, y, z);
}
fn(); //会报错
```

### 圆括号问题

以下**三种情况**不使用圆括号

#### 变量声明语句

```js
//  全部报错
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };
```

#### 函数参数

函数参数也属于变量声明

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

#### 赋值语句

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
[({ p: a }), { x: c }] = [{}, {}];
```

#### [可以使用圆括号](https://wangdoc.com/es6/destructuring.html#%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%E5%9C%86%E6%8B%AC%E5%8F%B7%E7%9A%84%E6%83%85%E5%86%B5)

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

首先它们都是赋值语句，而不是声明语句；其次它们的**圆括号都不属于模式的一部分**。

第一行语句中，模式是取数组的第一个成员，跟圆括号无关；
第二行语句中，模式是`p`，而不是`d`；
第三行语句与第一行语句的性质一致。

### 应用

**（1）交换变量的值**

```js
[x, y] = [y, x];
```

（2）从函数返回多个值
（3）函数参数的定义
（4）提取 JSON 数据
（5）函数参数的默认值
**（6）遍历 Map 结构**

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
```

（7）输入模块的指定方法

## 字符串扩展

### [字符的unicode](https://wangdoc.com/es6/string.html#%E5%AD%97%E7%AC%A6%E7%9A%84-unicode-%E8%A1%A8%E7%A4%BA%E6%B3%95)

### 字符串遍历接口

`for...of` - 可以识别 `0xFFFF`码点，传统`for`无法识别

### 字符串模板

JS单双引号字符串，均不解析变量，需要使用+号将变量拼接在字符串中

**字符串模板**（模板字面量）：允许使用反引号**``**来创建字符串

- 空格换行保留
- 变量写在 `${}`中，非字符串，如对象，调用`toString()`
- 可用Js表达式，能调用函数
- 可以嵌套
- 引用本身，写成函数

```js
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!" 引用本身
```

### [模板编译](https://wangdoc.com/es6/string.html#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%A8%A1%E6%9D%BF%E7%BC%96%E8%AF%91)

### 标签模板

模板字符串前面有一个标识名`tag`，它是一个函数。整个表达式的返回值，就是`tag`函数处理模板字符串后的返回值

```js
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;

// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

```js
// 第一个参数为数组，模板字符串中没有被变量替换的部分
// 其他参数为替换变量
function tag(stringArr, value1, value2){
  // ...
  // stringArr - ['hello ',' world ','']
  // value1 - 15
  // value2 - 50
}
// 等同于
function tag(stringArr, ...values){
  // ...
}
```

[重要应用](https://wangdoc.com/es6/string.html#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF)：

- 过滤HTML，防止用户输入恶意内容
-  多语言转换

### [模板字符串限制](https://wangdoc.com/es6/string.html#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E9%99%90%E5%88%B6)

## 字符串新增方法

**es5** - `String.fromCharCode()`：从Unicode码点返回字符串，不能识别大于0xFFFF的字符，`0x20BBF` 舍弃高位变为 `0x0BBF`

**es6** - `String.fromCodePoint()`：与`codePointAt()`相反，多个参数，合并为一个字符串

> `fromCodePoint`定义在String对象上，`codePointAt`定义在字符串对象上

**es6** - `String.raw()`：返回斜杠都被转义的字符串

**es5** - `charCodeAt()`：JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为`2`个字节。对于那些需要`4`个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JavaScript 会认为它们是两个字符。

**es6** - [`codePointAt()`](https://wangdoc.com/es6/string-methods.html#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Acodepointat)

**es6** - `normalize()`：将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化

**es5** - `indexOf()`：查找一个字符串是否在里一个字符串中

**es6** - 均返回**布尔值**

- `includes( string, number)`：**是否找到**参数字符串，从number开始
- `startsWith( string, number)`：参数字符串是否在**头部**，从number开始
- `endsWith( string, number)`：参数字符串是否在**尾部**，针对**前number**个数

**es6**

- `repeat()`：返回新字符串，原字符串重复n次
  - n为`小数`，取整
  - n为`负数`，`infinity`报错
  - n为`-1~0`，`NaN` ，均为0，返回空值
- `padStart()`：头部补全
  - 第一参数为最大长度，第二参数为补全字符串(默认为空格)
  - **大于等于**长度，返回原串
  - **补全长度 + 原串 > 最大长度**，截取补全字符串
- `padEnd()`：尾部补全，同上
- `trimStart()`：消除头部空格，返回新字符串
- `trimEnd()`：消除尾部空格

**es5**

- `replace()`

```js
'aabbcc'.replace('b', '_') // 替换第一个匹配
'aabbcc'.replace(/b/g, '_') // 替换所有匹配
```

**es6**

- `matchAll()`：**返回**一个正则表达式在当前字符串的**所有匹配**

- `replaceAll( searchValue, replacement)`

  - searchValue - 字符串* or **全局**正则表达式（带`g`修饰符，不带报错）
  - replacement - 字符串 or 函数，标识替换文本。
    - 字符串
      - `$&`：匹配的**子字符串**。
      - **$`**：匹配结果**前面**的文本。
      - `$'`：匹配结果**后面**的文本。
      - `$n`：匹配成功的第`n`组内容（**n从1**开始），前提是，第一个参数必须是正则表达式。
      - `$$`：指代美元符号`$`。
    - 函数

  ```js
  const str = '123abc456';
  const regex = /(\d+)([a-z]+)(\d+)/g;
  /*
  params #1 - 匹配内容
  params #2 - 捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）
  ...
  params #n-1 - 捕获内容在字符串位置
  parmas #n - 原字符串
  */
  function replacer(match, p1, p2, p3, offset, string) {
    return [p1, p2, p3].join(' - ');
  }
  str.replaceAll(regex, replacer)
  // 123 - abc - 456
  ```

## 正则扩展

### RegExp构造函数

**es5**

情况1 `(String , flag)`

- `new RegExp('xyz', 'i')`
- 等价于 `/xyz/i`

情况2 `(RegExp)`

- `new RegExp(/xyz/i)`
- 等价于 `/xyz/i`

**es6**：引入第三种情况，`(RegExp , flag)`

- `new RegExp(/abc/ig, 'i').flags` - 输出 `i`
- 等价于 `/abc/i`
- `flag`会覆盖原有修饰符

### 字符串正则方法

**es5**

`match()`、`replace()`、`search()`、`split()`

**es6**

将方法**关联到RegExp对象**

- `String.prototype.match` 调用 `RegExp.prototype[Symbol.match]`
- `String.prototype.replace` 调用 `RegExp.prototype[Symbol.replace]`
- `String.prototype.search` 调用 `RegExp.prototype[Symbol.search]`
- `String.prototype.split` 调用 `RegExp.prototype[Symbol.split]`

> es2020 +

`String.prototype.matchAll()`：一次性取出所有匹配，返回的是一个遍历器（Iterator），而不是数组。

```js
const string = 'test1test2test3';
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
```

### [u 修饰符](https://wangdoc.com/es6/regex.html#u-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

`u`修饰符：用来正确处理大于`\uFFFF`的 Unicode 字符

```js
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```



### y 修饰符

“粘连”（sticky）修饰符，全局匹配，*后一次匹配都是从上一次匹配成功的下一个位置开始*。

**区别**：`g`确保**剩余**位置中匹配即可，`y`必须从**下一个**位置（*头部匹配*）开始

`lastIndex`属性：每次搜索开始位置

```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"] r1.lastIndex = 0
r2.exec(s) // ["aaa"] r2.lastIndex = 0

r1.exec(s) // ["aa"] r1.lastIndex = 3
r2.exec(s) // null r2.lastIndex = 3
```

> `y` 不会忽略非法字符

### [s 修饰符：dotAll 模式](https://wangdoc.com/es6/regex.html#s-%E4%BF%AE%E9%A5%B0%E7%AC%A6%EF%BC%9Adotall-%E6%A8%A1%E5%BC%8F)

`s`修饰符：使得`.`可以匹配任意单个字符

```js
// es5
/foo[^]bar/.test('foo\nbar'); // true
// es2018
/foo.bar/s.test('foo\nbar'); // true
```

### RegExp.prototype

`RegExp.prototype.unicode`：表示是否设置了`u`修饰符

`RegExp.prototype.sticky` ：表示是否设置了`y`修饰符

`RegExp.prototype.flags`：会*返回*正则表达式的*修饰符*

`RegExp.prototype.dotAll`：返回一个布尔值，表示该正则表达式是否处在`dotAll`模式

### 断言

**先行断言** ：`x`只有在`y`前面才匹配，必须写成`/x(?=y)/`

**先行否定断言**：`x`只有不在`y `前面才匹配，必须写成`/x(?!y)/`

```js
/\d+(?=%)/.exec('100% of US presidents have been male');  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them');                 // ["44"]
```

> 后行断言 *es2018* 引入

**后行断言**：`x`只有在`y`后面才匹配，必须写成`/(?<=y)x/`

**后行否定断言** ：`x`只有不在`y`后面才匹配，必须写成`/(?<!y)x/`

```js
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill');  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90');                // ["90"]
```

**后行断言组匹配**：先匹配`/(?<=y)x/`的`x`，然后再回到左边，匹配`y`的部分，**先右再左**

```js
// 匹配在(\d+)(\d+)后面的串，第2个(\d+)先贪婪匹配
/(?<=(\d+)(\d+))$/.exec('1053'); // ["", "1", "053"]
// 第1个(\d+)先贪婪匹配
/^(\d+)(\d+)$/.exec('1053'); // ["1053", "105", "3"]
```

*反斜杠引用*，**也**与通常的顺序**相反**

```js
/(?<=(o)d\1)r/.exec('hodor');  // null
/(?<=\1d(o))r/.exec('hodor');  // ["r", "o"]
```

### [Unicode 属性类](https://wangdoc.com/es6/regex.html#unicode-%E5%B1%9E%E6%80%A7%E7%B1%BB)

### 具名组匹配

```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

> 具名组匹配 *es2018*

**具名组匹配**：`?<组名>`为每一组匹配指定一个名称，未匹配值为`undefined`

```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // "1999"
const month = matchObj.groups.month; // "12"
const day = matchObj.groups.day; // "31"
```

解构

```js
{groups: {year, month}} = RE_DATE.exec('1999-12-31');
```

`$<组名>`：引用组名

```js
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

// params#2 String
'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'

// params#2 Function
'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = groups;
 return `${day}/${month}/${year}`;
});
```

`\k<组名>`：正则表达式内部引用，也可以用 `\1`进行捕获

```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```

### [正则匹配索引](https://wangdoc.com/es6/regex.html#%E6%AD%A3%E5%88%99%E5%8C%B9%E9%85%8D%E7%B4%A2%E5%BC%95)

为`exec()`方法的返回结果加上`indices`属性，在这个属性上面可以拿到匹配的开始位置和结束位置。

## 数值扩展

二进制数（`0b，0B`），八进制数（`0o，0O`）

转十进制 `Number('0b111')`

### Number对象

目的：*减少全局方法，语言逐渐模块化*

`Number.isFinite()`：数值是否为有限的(`finite`)，即不是`Infinit,NaN`，参数类型不是`Number`直接返回`false`

`Number.isNaN()`：检测值**是否为NaN**，参数类型不是`NaN`，返回`false`

与全局方法区别：全局方法会先进行 **非数值转数值**，然后判断

```js
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
```

`Number.parseInt()`，`Number.parseFloat()`与全局方法行为一致。

`Number.isInteger()`：用来判断一个数值**是否为整数**，参数类型不是`Nuber`直接返回`false`

**整数和浮点数**采用**同样存储**方法，25和25.0视为同值

JavaScript 采用 IEEE 754 标准，数值存储为*64位双精度格式，*超过精度存在误判

- 数值精度最高：可以达到 *53 个二进制位* - 也就是*小数点后16个十进制位*（1 个隐藏位与 52 个有效位）
- 数值精度最低：`Number.MIN_VALUE`（5E-324）

```js
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(3.0000000000000002) // true
Number.isInteger(5E-325) // true
```

`Number.EPSILON`：极小常量，表示 1 与大于 1 的最小浮点数之间的差。误差小于此值，可以认为没有误差，实质为可以接受的最小误差范围

对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的`1.00..001`，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

```js
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

`Number.isSafeInteger()`：判断整数是**否在范围内**`（MIN_SAFE_INTEGER，MAX_SAFE_INTEGER）`

整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值

```js
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // 9007199254740991
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER // -9007199254740991
```

验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要**同时验证参与运算的每个值**。

```js
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990) // 超出了精度范围，以9007199254740992的形式储存
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确结果 9007199254740003
```

### Math对象

`Math.trunc()`：**去除一个数的小数部分**，返回整数部分。非数值，先转数值，空值和无法截取整数的值返回`NaN`

`Math.sign`方法用来判断一个数到底是**正数、负数、还是零**。对于非数值，会先将其转换为数值

```js
Math.sign(-5) // -1  负数
Math.sign(5) // +1  正数
Math.sign(0) // +0  0
Math.sign(-0) // -0  -0
Math.sign(NaN) // NaN 其他值
```

`Math.cbrt()`：计算一个数的**立方根**，对于非数值，会先将其转换为数值

`Math.clz32()`将参数**转为 32 位无符号整数的形式**，然后返回这个 32 位值里面**有多少个前导 0**。只考虑**整数部分**。对于非数值，会先将其转换为数值

```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2
```

`Math.imul()`：返回两个数以 **32 位带符号整数形式相乘**的结果

JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。对于那些很大的数的乘法，低位数值往往都是不精确的，`Math.imul`方法可以返回正确的低位数值。

```js
(0x7fffffff * 0x7fffffff)|0 // 0
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

`Math.fround()`：返回一个数的**32位单精度浮点数**形式。对于 `NaN` 和 `Infinity`，此方法返回原值。对于非数值，会先将其转换为数值

作用：将*64位双精度浮点数*转为*32位单精度浮点数*。如果小数的*精度超过24个二进制位*，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）

`Math.hypot()`：返回所有参数的**平方和的平方根**。对于非数值，会先将其转换为数值。只要有一个参数无法转为数值，就会返回 NaN。

`Math.expm1(x)`：返回 `e^x - 1`，即`Math.exp(x) - 1`

`Math.log1p(x)`：返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于-1，返回`NaN`。

`Math.log10(x)`：返回以 10 为底的`x`的对数。如果`x`小于 0，则返回 `NaN`

`Math.log2(x)`返回以 2 为底的`x`的对数。如果`x`小于 0，则返回 `NaN`

`Math.sinh(x)` 返回`x`的双曲正弦（hyperbolic sine）

`Math.cosh(x)` 返回`x`的双曲余弦（hyperbolic cosine）

`Math.tanh(x)` 返回`x`的双曲正切（hyperbolic tangent）

`Math.asinh(x)` 返回`x`的反双曲正弦（inverse hyperbolic sine）

`Math.acosh(x)` 返回`x`的反双曲余弦（inverse hyperbolic cosine）

`Math.atanh(x)` 返回`x`的反双曲正切（inverse hyperbolic tangent）

### 指数运算符

ES2016  - 指数运算符（`**`），**从右向左结合**

```js
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
```

### BigInt 数据类型

`BigInt` ：**任何位数的`整数`**都可以精确表示，后缀必须为`n`

- BigInt ，普通整数是**两种值**
- `typeof`运算符对于 BigInt 类型的数据返回`bigint`
- 可以用 `-` 不能用 `+`

**BigInt对象**

`BigInt()`构造函数必须有参数，而且参数必须可以正常转为数值

```js
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
```

> 字符串`123n`无法解析成 Number 类型，所以报错

`BigInt.prototype.toString()`，`BigInt.prototype.valueOf()`，`BigInt.prototype.toLocaleString()`

`BigInt.asUintN(width, BigInt)`： 给定的 BigInt 转为 *0* 到 *2^width-1^* 之间对应的值。

`BigInt.asIntN(width, BigInt)`：给定的 BigInt 转为 *-2^width-1*^ 到 *2^width-1^-1* 之间对应的值。

`BigInt.parseInt(string[, radix])`：将一个字符串转换成指定进制的 BigInt

```js
// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt('9007199254740993', 10)
// 9007199254740992
BigInt.parseInt('9007199254740993', 10)
// 9007199254740993n
```

**转换规则**

```js
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
!0n // true
!1n // false
```

**数学运算**

`+`、`-`、`*`、`**`：与 Number 类型的行为一致

`/`：**舍去小数部分**，返回一个整数

例外

- 不带符号的右移位运算符`>>>`
  - BigInt 总是带有符号的
- 一元的求正运算符`+`
  - BigInt **不能**与*普通数值*进行**混合运算**
  - 无论是返回 `BigInt` 或 `Number`都会丢失精度
- `|0`跟在一个数值的后面会返回一个32位整数
  - 因为不能混合运算，`1n | 0`会报错

`Math.sqrt`的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用`Number`方法转一下类型

```js
// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2
```

**其他运算**

BigInt 对应的**布尔值**，与 Number 类型一致，即`0n`会转为`false`，其他值转为`true`。

**比较运算符**（比如`>`）和相等运算符（`==`）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。

```js
0n < 1 // true
0n < true // true
0n == 0 // true
0n == false // true
0n === 0 // false
```

BigInt 与**字符串**混合运算时，会先转为字符串，再进行运算。

```js
'' + 123n // "123"
```

## 函数

### 参数默认值

ES5定义函数不能指定默认值，ES6定义函数可以指定默认值。

### 展开运算符

**展开运算符**：`...`，将数组和字符串字面量展开为多个元素

```js
//函数本来接收三个单独的参数
function f3(x,y,z){
	console.log(x,y,z);
}

//ES6中，我们可以将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
var arr=[3,4,5];
f3(...arr);//输出：3 4 5 

//ES5中，如果需要传递数组当参数，我们需要使用函数的apply方法
f3.apply(null,arr);//输出：3 4 5 
```

### 不定参数（可变参数/剩余参数）

**不定参数**：在函数中使用命名参数同时接收不定数量的未命名参数

> 与ES5中arguments类似

```js
//不定参数 将多个实参放在一个数组变量中
//  ...x  三个点是固定格式，x是形参变量名
function f1(...x){
	console.log(x);
}
f1(3,4,5); //[3,4,5]

function f2(m, n, ...x){
  	console.log(m, n, x);
}
f2(2,3,4,5,6); // m=2  n=3  x=[4,5,6]
```

## 对象字面量简化

### **ES5对象字面量**

```js
var person = {
    "nickname": "老三",
    "age": 30,
    "sex": "男",
    "say":function(){
          return "hello";
    }
};
```

### 成员属性

属性和变量名称需要一致

```js
var person = {
    nickname,
    age,
    sex
}
```

### 成员方法

省略function关键字

```js
var person = {
    say(){
        
    }
}
```

### 原型对象

对象字面量中定义原型

```js
var person = {
 	say(){
      return "hello";
 	}
};
var coder = {
  	__proto__:person,
  	coding(){
      	return "I'm coding";
  	}
};
console.log( coder.say() );
console.log( coder.coding() );
```

## for of值变量

### **遍历数组**

```js
var team = ["师父", "大师兄", "二师兄", "沙师弟", "小白龙"];
for(var v of team){
  	console.log(v);
}
```

### **遍历字符串**

```js
var str = "zhangsan";
for(var v of str){
  	console.log(v);
}
```

> **不能遍历对象**

## symbol数据类型

**ES5数据类型**：`string  number boolean  null  undefined  object`

**ES6新增**：Symbol，表示独一无二的值。定义对象唯一属性名

Symbol类型的值是一个独一无二的值

```js
Symbol()==Symbol() //false
Symbol('zs')==Symbol('zs') //false
```

作为对象属性名的Symbol

```js
var attr_name = Symbol();
var obj = {
	[attr_name]: "Alice" //[]里面attr_name不带引号，表示attr_name为变量
};
console.log(obj[attr_name]);

var obj = {
  	[Symbol()]:"Alice"
};
console.log(obj);
console.log(obj[Symbol()]);//undefined
```

> 不能用点运算符，因为点运算符后面是字符串

## 类和对象

### 类的定义

ES6提供的类为JS原型的包装

class类：包含 构造方法、实例方法、静态方法

- class中不能直接定义属性，只能定义方法，方法之间不需要逗号隔开
- class只能先定义，再使用，没有提升效果
- 静态方法通过类名调用，实例方法只能实例化后再调用

```javascript
//类的定义
class A {
	//ES6中的构造方法（类的属性，定义在构造方法中）
    constructor(name) {
        this.name = name;
        this.age = 30;
    }
    //实例方法
    say() {
        console.log('我是A中的实例方法say，我的名字是 '+this.name);
    }
  	//静态方法(静态方法与实例方法 同名互不影响)
 	static say(){
      	console.log("我是A中的静态方法say");
 	}
}

//直接调用静态方法,由于没有实例化过程，构造方法中的代码不会自动执行
A.say();

//实例化类 调用实例方法
var a = new A('Tom');
a.say();

//类也有原型对象
console.log(A.prototype);
console.log(a.__proto__)
```

### 类的继承

父类有构造函数，子类构造函数中，需要调用super() 实现父类的构造函数

```js
//类的继承
//父类A
class A {
	//ES6中的构造方法
    constructor(name) {
        this.name = name;
        this.age = 30;
    }
    //实例方法
    say() {
        console.log('我是A中的实例方法say，我的名字是 '+this.name);
    }
  	//静态方法
 	static say(){
      	console.log("我是A中的静态方法say");
 	}
}

//子类B
class B extends A {
  	//构造方法
    constructor(name) {
    	//使用函数形式的super(), 直接调用父类构造方法
      	//只要子类写了构造方法(使用了this)，就必须调用super()，且必须在使用this之前
        super(name);
    }
  	//实例方法
  	//子类方法 会覆盖父类同名方法
    say() {
      	//子类方法中，可以使用super.方法() 调用父类的非构造方法
      	//当前方法是实例方法，则调用父类的实例方法
      	//当前方法是静态方法，则调用父类的静态方法
      	//super.say(); 
        console.log('我是B中的实例方法say，我的名字是 '+this.name);
    }
  	
    static coding() {
        console.log('我是B中的静态方法coding');
    }
  	
}
//调用静态方法
B.say(); //A的静态方法
B.coding();//B自己的静态方法

//调用实例方法
var b = new B('Lucy');
b.say();//B中的实例方法say  //如果B中没有，才调用A的实例方法say
b.coding();//报错，B和A中都没有实例方法coding  （只有静态方法）
```

## 箭头函数

`=>`箭头函数

### 语法

#### 一个参数

```js
var f1 = a=>a;
//var f1 = function(a){return a;};
```

#### 没有参数

```js
var f2 = ()=>'test';
```

#### 多个参数

```js
var f3=(a,b)=>a+b;
```

#### 函数体多条语句

```js
var f4= (a,b)=>{
    var c = a+b;
    return c;
}
```

#### 返回对象

```js
var f5 = () => {
    return ({"name":'xiaoA',"age":40});
}
// var f5 = ()=>({"name":'xiaoA',"age":40});
```

#### 事件处理函数

```html
<input type="button" value="点击" id="btn">
<script>
	document.getElementById('btn').onclick = evt=>{
      	console.log(evt);//evt 事件对象
	}
</script>
```

#### 回调函数

```js
var f6 = (f)=>{
    console.log(f(2));
}
var f7 = a=>a;
f6(f7);
```

### 注意

- typeof 判断箭头函数 结果为function
- instanceof 判断是否Function实例 结果为true
- **箭头函数不绑定this，内外this固定不变**
- 箭头函数不能做构造函数，不能用new实例，没有prototype
- 不能使用arguments
- 支持默认参数，剩余参数，解构

```js
var obj = {
  	say:function(){
      	//非箭头函数
      	var _this = this;
      	var f1 = function(){
      		console.log(_this);//obj
			console.log(this);//window
        };
      	f1();
      	//箭头函数
        var f2 = ()=>{
			console.log(this);//obj
        };
      	f2();
  	}
};
obj.say();
```