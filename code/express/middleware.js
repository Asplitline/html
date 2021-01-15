const express = require('express');

const app = express();

// 拦截所有请求
app.use((req, res, next) => {
    console.log('middleware');
    next();
})

// 拦截 / 
app.get('/', (req, res, next) => {
    req.name = 'test';
    next();
})

app.get('/', (req, res) => {
    res.send(req.name);
})

// 拦截 /index 判断登录状态
app.get('/index', (req, res, next) => {
    let flag = true;
    if (flag) res.send('你还未登录');
    else next();
})

app.get('/index', (req, res) => {
    res.send('欢迎来到主页');
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})