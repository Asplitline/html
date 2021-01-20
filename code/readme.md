# mongoose - exp

## 分析

不用模板引擎拼页面太麻烦了，尤其是包含循环的时候

系统模块  `url、querystring、http`

第三方模块 `mongoose`

## 收获

- 回顾了一遍流程，更熟练

- 用响应头重定向网址 301

   `res.writeHead(301, {Location: '/' });`

- 多选框的处理
  
  - 先把所有选项遍历，然后找到数据中有的选项添加checked
  
- `mongoimport`导入文件

  ```bash
  mongoimport -u root -p root --authenticationDatabase admin -d mongooseExp  -c userlists /jsonArray user.json
  # -u -p 权限账号/密码
  # --authenticationDatabase 权限账号所在数据库
  # -d 数据库
  # -c 集合
  # /jsonArray 数据类型
  # user.json 数据文件
  ```

## 问题

- req.on('end') - 跑到事件外，接收数据，导致数据一直为空

# art-template-exp

表单加列表

## 分析

- 法1：手写路由、获取静态资源
  - 路由
    - 解析路径 - url
    - 判断请求方式
    - 处理路由
  - 静态变量
    - 需要文件判断类型 - mime
    - 设置静态文件路径 - path
    - 读取文件，将数据返回 - fs
- 法2：利用 router ，serve-static
  - 路由
    - 引入路由模块
    - 获取路由对象
  - 静态资源
    - 引入静态资源模块
    - 设置静态资源路径

## 收获

- padding + w100%，两种处理方法
  - `w100% + box-sizing:border-box`
  - `w90% + padding:0 5%`
    - bug：select 不适用
- table 设置了最大宽度，没有width100%
- `path.join(__dirname,'..')` 可以获取上一层绝对路径

## 错误

- 值为null 不会触发 default
- form date 设置了name，不选日期后台就会为空。如果不设值name，无论选不选日期，日期都为默认值
  - 解决方案，`data.enterDate = data.enterDate || Date.now();` ，这样会导致schema 中默认值是是失效
  - 最佳解决方案 ：  `if (!data.enterDate) data.enterDate = undefined;`将值设为undefined

> Mongoose default values work only if your document object keys do not have those fields defined. `[empty,null]` are valid values. As you are handling at object creation time that is the one way I can see here i.e. either you can assign `undefined` or else you can delete that property from an object.

# mvc-manager

## 分析

- controller  -  处理路由，渲染模板。
- router - 分发路由
- app - 启动服务

## 收获

- 不用模板引擎需要用正则，拼接好数据替换页面内给定字符串
- 含文件表单 
  - 表单设置为`enctype="multipart/form-data"`
  - 服务器通过 formidable 解析数据 
    - `uploadDir: __dirname` - 文件上传默认路径
    - `keepExtensions: true` - 保留后缀
  - 无文件上传会产生空文件，删除文件 - `fs.rm`
  - 文件重命名 - `fs.rename`
- 要重复使用的代码要封装

## 错误

- 卡住，读取文件设置utf8，导致表单传送文件被解析。

# express-blog

## 分析



## 收获

- jquery事件中，jquery指向window

- 服务器和浏览器都用进行表单验证，最好在服务器

- 利用模态框删除，将id通过自定义属性放在按钮上，模态框定义隐藏框，写入id，然后通过表单提交

- mongoose 联合查询溢出
  - RangeError: Maximum call stack size exceeded
  - `JSON.parse(JSON.stringify(list))`
  
- 向表单中填入日期

  - 数据为Date类型，需要转为string
  - `JSON.parse(JSON.stringify(list))`

- 文件上传

  - 前台通过FileReader显示所选图片

    ```js
    const file = document.querySelector('#file');
    const preview = document.querySelector('#preview');
    file.onchange = function () {
        let reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        console.log(reader);
        reader.onload = function () {
            preview.src = reader.result;
    }
    ```

  - 后台通过formidable处理文件

  

## 错误

- 在配置session的时候，app.use写成 app.set，配置好先测试
- 错误拦截 app.use((err, req, res, next) 顺序写错
- mongoose 联合查询
  - ref 与 创建的规则名对应