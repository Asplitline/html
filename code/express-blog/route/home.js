const express = require('express');
const home = express.Router();
const home_root = './home/';

// 文章列表
home.get('/', require(home_root + 'default'));
home.get('/article', require(home_root + 'article'));

module.exports = home;