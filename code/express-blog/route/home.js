const express = require('express');
const home = express.Router();

const indexRoute = require('./home/defaultPage');
// 文章列表
home.get('/', indexRoute.index);
home.get('/article', indexRoute.article);
home.post('/comment', indexRoute.comment);
module.exports = home;