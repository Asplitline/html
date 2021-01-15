// 建立项目文件夹并生成项目描述文件
// 创建网站服务器实现客户端和服务器端通信
// 连接数据库并根据需求设计学员信息表
// 创建路由并实现页面模板呈递
// 实现静态资源访问
// 实现学生信息添加功能
// 在模板的表单中指定请求地址与请求方式
// 为每一个表单项添加name属性
// 添加实现学生信息功能路由
// 接收客户端传递过来的学生信息
// 将学生信息添加到数据库中
// 将页面重定向到学生信息列表页面
// 实现学生信息展示功能


require('./model/connect');

const http = require('http');
const template = require('art-template');
const path = require('path');
const { router, dateformat } = require('./route/route');

template.defaults.root = path.join(__dirname, 'views');
template.defaults.extname = '.html';
template.defaults.imports.dateformat = dateformat;
const server = http.createServer();

server.listen(3000, () => {
    console.log('http://localhost:3000');
});

server.on('request', (req, res) => {
    router(req, res);
})
