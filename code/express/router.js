const express = require('express');

const app = express();
const home = express.Router();

// 为路由对象匹配路径
app.use('/home', home);

// 二级路由
home.get('/index', (req, res) => {
    res.send('二级主页');
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})