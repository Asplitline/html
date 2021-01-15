const express = require('express');

const app = express();


/**
 * extended: false 方法内部使用querystring模块处理请求参数的格式
 * extended: true 方法内部使用第三方模块qs处理请求参数的格式
 */

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(req.query);
})

app.post('/', (req, res) => {
    console.log(req.body.id);
    res.send(req.body);
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})