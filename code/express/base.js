const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello');
})

app.get('/list', (req, res) => {
    /**
     * send内部会检测响应内容的类型
     * send自动设置http状态码
     * send自动设置响应内容类型及编码
     */
    res.send({ name: 'lis', age: 18 });
})


app.listen(3000, () => {
    console.log("http://localhost:3000");
})