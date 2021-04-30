const express = require('express');
const path = require('path');
const app = express();

require('./model/connect');
// const { Article } = require('./model/article');

if (process.env.NODE_ENV === 'development') {
    console.log('当前为开发环境');
} else {
    console.log('当前为生产环境');
}

const session = require('express-session');
// 配置session
app.use(session({
    secret: 'blog-key',
    saveUninitialized: false, //不保存未初始化session
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 引入模板引擎注册后缀
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
// 视图引擎默认后缀html
app.set('view engine', 'html');

// 配置post数据解析
app.use(express.urlencoded({ extended: false }));
// 配置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

// 拦截路由
app.use('/admin', require('./middleware/loginGuard'));
// 引入路由模块
app.use('/home', require('./route/home'));
app.use('/admin', require('./route/admin'));
app.locals.root = __dirname;
// 错误拦截
app.use((err, req, res, next) => {
    console.log(err, '---------');
    // let result = JSON.parse(err);
    // let params = [];
    // for (const attr in result) {
    //     if (attr != 'path') {
    //         params.push(attr + '=' + result[attr]);
    //     }
    // }
    // res.redirect(`${result.path}?${params.join("&&")}`);
})
app.listen(3333, () => {
    console.log("http://localhost:3333");
})