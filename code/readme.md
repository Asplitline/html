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

