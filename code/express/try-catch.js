const express = require('express');
const app = express();
const fs = require('fs');
// 通过 util 将函数转为异步函数
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);


app.get('/', async (req, res, next) => {
    try {
        await fs.readFile('./sadas');
    } catch (err) {
        // 异步中throw会中断程序
        // throw new Error(error);
        next(err);
    }
})

app.get('/s', (req, res) => {
    // 同步可以直接throw
    throw new Error('error');
})

// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})