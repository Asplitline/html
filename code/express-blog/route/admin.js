const express = require('express');
const admin = express.Router();

const loginRoute = require('./admin/loginPage');
const userRoute = require('./admin/userPage');
const articleRoute = require('./admin/articlePage');
// 登录
admin.get('/login', loginRoute.getList);
admin.get('/loginOut', loginRoute.getLoginOut);
admin.post('/login', loginRoute.postLogin);
// 用户
admin.get('/user', userRoute.getList);
admin.get('/userForm', userRoute.getForm);
admin.get('/deleteUser', userRoute.getDelete);
admin.post('/addUser', userRoute.postAdd);
admin.post('/editUser', userRoute.postEdit);
// 文章
admin.get('/article', articleRoute.getList);
admin.get('/articleForm', articleRoute.getForm);
admin.get('/deleteArticle', articleRoute.postDelete);
admin.post('/addArticle', articleRoute.postAdd);
admin.post('/editArticle', articleRoute.postEdit);
module.exports = admin;
