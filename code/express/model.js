const express = require('express');
const path = require('path');
const app = express();

// 设置模板引擎
app.engine('art', require('express-art-template'));
// 设置模板路径
app.set('views', path.join(__dirname, 'views'));
// 设置模板默认后缀
app.set('view engine', '.art');
app.use(express.static('public'));

// 公共数据
app.locals.users = [{
    name: 'lisi',
    age: 20
}];

app.get('/index', (req, res) => {
    // 渲染模板
    res.render('index', { msg: '星形线' });
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})