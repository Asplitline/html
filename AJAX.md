## 接口调用

### 调用方式

- 原生ajax
- 基于jQuery的ajax
- fetch
- axios

### 异步

JavaScript的执行环境是「单线程」，指JS引擎中负责解释和执行JavaScript代码的线程只有一个，也就是一次只能完成一项任务，这个任务执行完后才能执行下一个，它会「阻塞」其他任务。这个任务可称为主线程

异步模式可以一起执行**多个任务**

JS中常见的异步调用

- 定时任何
- ajax
- 事件函数

### promise

- 主要解决异步深层嵌套的问题
- promise 提供了简洁的API  使得异步操作更加容易

#### promise使用

- new来构建一个Promise 
- Promise的构造函数接收一个参数（函数）
  - 传入两个参数 
    - resolve - 异步操作执行成功后的回调函数
    - reject - 异步操作执行失败后的回调函数

```js
 var p = new Promise(function(resolve, reject){});
// Promise实例生成以后，可以用then方法指定resolved状态和reject状态的回调函数 
// 在then方法中，也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据
p.then(function(data){
  console.log(data)
},function(info){
  console.log(info)
});
```

#### promise + ajax

##### 封装ajax

```js
function queryData(url) {
 // 创建一个Promise实例
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState != 4) return;
      if(xhr.readyState == 4 && xhr.status == 200) resolve(xhr.responseText); // 处理正常的情况
      else reject('服务器错误'); // 处理异常情况
    };
    xhr.open('get', url);
    xhr.send(null);
  });
}
```

##### 调用ajax

```js
queryData('http://localhost:3000/data')
  .then(function(data){
    console.log(data)
    return queryData('http://localhost:3000/data1');//  链式编程 需要return  
  })
  .then(function(data){
    console.log(data);
    return queryData('http://localhost:3000/data2');
  })
  .then(function(data){
    console.log(data)
  });

```

#### 实例方法

`.then()`  - 得到异步任务正确的结果

`.catch()`- 获取异常信息

`.finally()` - 成功与否都会执行（不是正式标准） 

```js
foo()
  .then(function(data){
    console.log(data)
  })
  .catch(function(data){
    console.log(data)
  })
  .finally(function(){
    console.log('finished')
  });
// 等效写法
foo()
  .then(function(data){
    console.log(data)
  },function(data){
    console.log(data)
  }).finally(function(){console.log('finished')});

```

#### 静态方法

#####  .all()

- `Promise.all`接受一个数组作参数，**状态共同决定**，返回所有改变状态的promise
- 当p1, p2, p3中有一个实例的状态**全部改变完成后返回**

> 不是一个promise，会被用`Promise.resolve`转换为一个promise

#####  .race()

- `Promise.race`接受一个数组作参数。**状态由第一个决定**，返回值第一个改变状态的promise
- 当p1, p2, p3中有一个实例的状态**发生改变**（变为`fulfilled`或`rejected`）就**返回**

```js
var p1 = queryData('http://localhost:3000/a1');
var p2 = queryData('http://localhost:3000/a2');
var p3 = queryData('http://localhost:3000/a3');
 Promise.all([p1,p2,p3]).then(function(result){
   // all中的参数  [p1,p2,p3]   和 返回的结果一 一对应["HELLO TOM", "HELLO JERRY", "HELLO SPIKE"]
   console.log(result) //["HELLO TOM", "HELLO JERRY", "HELLO SPIKE"]
 })
Promise.race([p1,p2,p3]).then(function(result){
  // 由于p1执行较快，Promise的then()将获得结果'P1'。p2,p3仍在继续执行，但执行结果将被丢弃。
  console.log(result) // "HELLO TOM"
})
```

### fetch 

- Fetch API是新的ajax解决方案
- fetch不是ajax的进一步封装，而**是原生js**，没有使用XMLHttpRequest对象
-  **Fetch会返回Promise**，可以使用then拿到请求成功的结果 

#### fetch使用

`fetch(url, options).then()`

- url - 请求的路径
- options  - 请求
  - method - 请求使用的方法 (默认get)
  - body - 请求体（数据）
  - headers - 请求头

```js
fetch('http://localhost:3000/fdata').then(function(data){
  return data.text(); // text()方法属于fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台返回的数据
}).then(function(data){
  console.log(data);//   这个then里面我们能拿到最终的数据  
})
```

#### fetch请求参数

- HTTP协议，它给我们提供了很多的方法，如POST，GET，DELETE，UPDATE，PATCH和PUT
  - 默认 GET 请求
  - 需要在 options对象指定对应的 method
  - **post和普通请求**，需要在options 中 设置  请求头 headers   和  body

```js
// GET 
// 传统URL - http://localhost:3000/books?id=123
// restful - http://localhost:3000/books/123
fetch('http://localhost:3000/books?id=123', { method: 'get'})
.then(function(data) {
        return data.text();
}).then(function(data) {
        console.log(data)
});

// DELETE
fetch('http://localhost:3000/books/789', {method: 'delete'})
    .then(function(data) {
        return data.text();
    }).then(function(data) {
        console.log(data)
    });

// POST
// 默认请求类型
fetch('http://localhost:3000/books', {
        method: 'post',
        body: 'uname=lisi&pwd=123',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data) {
        return data.text();
    }).then(function(data) {
        console.log(data)
    });
// json格式类型
fetch('http://localhost:3000/books', {
        method: 'post',
        body: JSON.stringify({uname: '张三',pwd: '456'}), //必须传字符串
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(data) {
        return data.text(); // 可以用data.json() - parse后的text数据
    }).then(function(data) {
        console.log(data)
    });

// put
fetch('http://localhost:3000/books/123', {
        method: 'put',
        body: JSON.stringify({uname: '张三',pwd: '789'}),
        headers: {'Content-Type': 'application/json'}
    })

```

#### fetch响应格式

**response下方法**

- `data.json()` - 将获取到的数据使 json转换对象
- `data.text() `-  将获取到的数据转换成字符串 

### axios

- 基于promise用于浏览器和node.js的http客户端
- 支持浏览器和node.js
- 支持promise
- **能拦截请求和响应**
- 自动转换JSON数据
- 能转换请求和响应数据

#### axios使用

- get和 delete请求传递参数
  - 传统的url  以 ? 的形式传递参数
  - restful 形式传递参数 
  - params  形式传递参数 
- post  和 put  请求传递参数
  - 通过选项传递参数
  - 通过 URLSearchParams  传递参数 

```js
// get
axios.get('http://localhost:3000/adata').then(function(ret){ 
  //  数据存在data属性
  // console.log(ret.data)
  console.log(ret)
})

// get 请求传递参数
// 1.传统url
axios.get('http://localhost:3000/axios?id=123')
// 2.restful形式传递参数 
axios.get('http://localhost:3000/axios/123')
// 3.params形式传递参数 
axios.get('http://localhost:3000/axios', {params: {id: 789}})

// delete - 同get
axios.delete('http://localhost:3000/axios', {params: {id: 111}})

// post
// 1.通过选项传递参数
axios.post('http://localhost:3000/axios', {uname: 'lisi',pwd: 123})

// 2.通过 URLSearchParams传递参数 
var params = new URLSearchParams();
params.append('uname', 'zhangsan');
params.append('pwd', '111');
axios.post('http://localhost:3000/axios', params)

// put - 同post
axios.put('http://localhost:3000/axios/123', {uname: 'lisi',pwd: 123})
```

#### axios 全局配置

```js
//  配置公共的请求头 
axios.defaults.baseURL = 'https://api.example.com';
//  配置超时时间
axios.defaults.timeout = 2500;
//  配置公共的请求头
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 配置公共的 post 的 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

####  axios 拦截器

- 请求拦截器
  - 请求拦截器的作用是在请求发送前进行一些操作
    - 在请求体加token
- 响应拦截器
  - 响应拦截器的作用是在接收到响应后进行一些操作
    - 服务器返回登录状态失效，需要重新登录的时候，跳转到登录页

```js
// 1. 请求拦截器 
axios.interceptors.request.use(function(config) {
  console.log(config.url)
  // 1.1  任何请求都会经过这一步
  config.headers.mytoken = 'nihao';
  // 1.2  必须return,否则配置不成功  
  return config;
}, function(err){
  // 1.3  对请求错误做点什么    
  console.log(err)
})
// 2. 响应拦截器 
axios.interceptors.response.use(function(res) {
  // 2.1  在接收响应做些什么  
  var data = res.data;
  return data;
}, function(err){
  // 2.2 对响应错误做点什么  
  console.log(err)
})

```



###  async  和 await

- async作为一个关键字放到函数前面
  - 任何一个`async`函数都会隐式**返回一个`promise`**
- `await`关键字**只能在使用`async`定义的函数中使用**
  - ​    await后面可以直接跟一个 Promise实例对象
  - ​    await函数不能单独使用

```js
# 1.  async 基础用法
# 1.1 async作为一个关键字放到函数前面
async function queryData() {
  # 1.2 await关键字只能在使用async定义的函数中使用      await后面可以直接跟一个 Promise实例对象
  var ret = await new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('nihao')
    },1000);
  })
  return ret;
}
# 1.3 任何一个async函数都会隐式返回一个promise   我们可以使用then 进行链式编程
queryData().then(function(data){
  console.log(data)
})

#2.  async    函数处理多个异步函数
axios.defaults.baseURL = 'http://localhost:3000';

async function queryData() {
  # 2.1  添加await之后 当前的await 返回结果之后才会执行后面的代码   
  var info = await axios.get('async1');
  #2.2  让异步代码看起来、表现起来更像同步代码
  var ret = await axios.get('async2?info=' + info.data);
  return ret.data;
}

queryData().then(function(data){
  console.log(data)
})
```



