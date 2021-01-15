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

### 初始化

```shell
1. 建立项目所需文件夹
   - public 静态资源
   - model 数据库操作
   - route 路由
   - views 模板
2. 初始化项目描述文件
   - npm init -y
3. 下载第三方模块
   - express	mongoose 	art-template	express-art-template
4. 创建网址服务器
5. 构建模块化路由
6. 构建博客管理页面模板
```

### 登录

```shell
1. 创建用户集合，初始化用户
   - 连接数据库
   - 创建用户集合
   - 初始化用户
2. 为登录表单项设置请求地址、请求方式以及表单项name属性
3. 当用户点击登录按钮时，客户端验证用户是否填写了登录表单
4. 如果其中一项没有输入，阻止表单提交
5. 服务器端接收请求参数，验证用户是否填写了登录表单
6. 如果其中一项没有输入，为客户端做出响应，阻止程序向下执行
7. 根据邮箱地址查询用户信息
8. 如果用户不存在，为客户端做出响应，阻止程序向下执行
9. 如果用户存在，将用户名和密码进行比对
10. 比对成功，用户登录成功
11. 比对失败，用户登录失败
12. 保存登录状态
13. 密码加密处理 
```

### 新增用户

```shell
1. 为用户列表页面的新增用户按钮添加链接
2. 添加一个连接对应的路由，在路由处理函数中渲染新增用户模板
3 .为新增用户表单指定请求地址、请求方式、为表单项添加name属性
4. 增加实现添加用户的功能路由
5. 接收到客户端传递过来的请求参数
6. 对请求参数的格式进行验证
7. 验证当前要注册的邮箱地址是否已经注册过
8. 对密码进行加密处理
9. 将用户信息添加到数据库中
10. 重定向页面到用户列表页面
```

### 数据分页

```shell
1.当前页，用户通过点击上一页或者下一页或者页码产生，客户端通过get参数方式传递到服务器端
2.总页数，根据总页数判断当前页是否为最后一页，根据判断结果做响应操作
```

### 用户信息修改

```shell
1. 将要修改的用户ID传递到服务器端
2. 建立用户信息修改功能对应的路由
3. 接收客户端表单传递过来的请求参数 
4. 根据id查询用户信息，并将客户端传递过来的密码和数据库中的密码进行比对
5. 如果比对失败，对客户端做出响应
6. 如果密码对比成功，将用户信息更新到数据库中
```

### 用户信息删除

```shell
1. 在确认删除框中添加隐藏域用以存储要删除用户的ID值
2. 为删除按钮添自定义属性用以存储要删除用户的ID值
3. 为删除按钮添加点击事件，在点击事件处理函数中获取自定义属性中存储的ID值并将ID值存储在表单的隐藏域中
4. 为删除表单添加提交地址以及提交方式
5. 在服务器端建立删除功能路由
6. 接收客户端传递过来的id参数
7. 根据id删除用户
```

### 文章评论

```shell
1.创建评论集合
2.判断用户是否登录，如果用户登录，再允许用户提交评论表单
3.在服务器端创建文章评论功能对应的路由
4.在路由请求处理函数中接收客户端传递过来的评论信息
5.将评论信息存储在评论集合中
6.将页面重定向回文章详情页面
7.在文章详情页面路由中获取文章评论信息并展示在页面中
```