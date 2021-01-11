const http = require('http');
const server = http.createServer();
const users = require('./model/users');
const url = require('url');
const querystring = require('querystring');
server.listen(3000, () => {
    console.log("http://localhost:3000");
});

server.on('request', async (req, res) => {
    const method = req.method.toLowerCase();
    const { pathname, query } = url.parse(req.url, true);
    if (method == 'get') {
        if (pathname == '/' || pathname == '/list') {
            let data = await users.find();
            // console.log(data);
            let html = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>用户列表</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                <body>
                    <div class="container">
                        <h6>
                            <a href="/add" class="btn btn-primary">添加用户</a>
                        </h6>
                        <table class="table table-striped table-bordered">
                            <tr>
                                <td>用户名</td>
                                <td>年龄</td>
                                <td>爱好</td>
                                <td>邮箱</td>
                                <td>操作</td>
            </tr>`;
            data.forEach(element => {
                // console.log(val.name);
                html += `<tr>
                <td>${element.name}</td>
                <td>${element.age}</td>
                <td>`;
                element.hobbies.forEach(hob => {
                    html += `<span> ${hob}</span >`;
                });
                html += `</td>
                <td>${element.email}</td>
                <td>
                    <a href="/remove?id=${element._id}" class="btn btn-danger btn-xs">删除</a>
                    <a href="/modify?id=${element._id}" class="btn btn-success btn-xs">修改</a>
                </td>
                </tr>`;

            })
            html += `</table >
              </div >
             </body >
            </html >
            `;
            res.end(html);
        } else if (pathname == '/remove') {
            console.log(query.id);
            await users.deleteOne({ _id: query.id });
            // TIPS>> 利用响应头重定向 301
            res.writeHead(301, {
                Location: '/'
            });
            res.end();
        } else if (pathname == '/modify') {
            let data = await users.findOne({ _id: query.id });
            let hobbies = ["足球", "篮球", "橄榄球", "敲代码", "抽烟", "喝酒", "烫头"];
            let html = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>用户列表</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                <body>
                    <div class="container">
                        <h3>修改用户</h3>
                        <form action="/modify?id=${query.id}" method="post">
                        <div class="form-group"  >
                            <label>用户名</label>
                            <input type="text" class="form-control" placeholder="请填写用户名" value="${data.name}"  name="name">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input type="password" class="form-control" placeholder="请输入密码" value="${data.password}" name="password">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input type="text" class="form-control" placeholder="请填写年龄" value="${data.age}" name="age">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input type="email" class="form-control" placeholder="请填写邮箱" value="${data.email}" name="email">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                        <div>`;
            hobbies.forEach(element => {
                if (data.hobbies.includes(element)) {
                    html += `
                    <label class="checkbox-inline">
                    <input type="checkbox" value="${element}"  name="hobbies" checked> ${element}
                    `;
                } else {
                    html += `
                    <label class="checkbox-inline">
                    <input type="checkbox" value="${element}" name="hobbies" > ${element}
                    `;
                }
            })

            html += `</div>
                        </div>
                        <button type="submit" class="btn btn-primary">确认修改</button>
                        </form>
                    </div>
                </body>
                </html>`;
            res.end(html);

        } else if (pathname == '/add') {
            let html = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>用户列表</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                <body>
                    <div class="container">
                        <h3>添加用户</h3>
                        <form method="post" action="/add">
                        <div class="form-group">
                            <label>用户名</label>
                            <input type="text" class="form-control" placeholder="请填写用户名" name="name">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input type="password" class="form-control" placeholder="请输入密码" name="password">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input type="text" class="form-control" placeholder="请输入年龄" name="age">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input type="email" class="form-control" placeholder="请填写邮箱" name="email">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="足球 name="hobbies""> 足球
                                </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="篮球" name="hobbies"> 篮球
                                </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                                </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                                </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                                </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                                </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" value="烫头" name="hobbies"> 烫头
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">添加用户</button>
                        </form>
                    </div>
                </body>
                </html>`;
            res.end(html);
        }
    } else if (method == 'post') {
        if (pathname == '/modify') {
            let data = '';
            let endData = null;
            req.on('data', (temp) => data += temp);
            // TIPS>> 默认为false 
            // QUES>> 犯了一个错误，在on之外接收data
            req.on('end', async () => {
                await users.findOneAndUpdate({ _id: query.id }, querystring.parse(data));
            });
            res.writeHead(301, {
                Location: '/'
            })
            res.end();
        } else if (pathname == '/add') {
            let data = '';
            req.on('data', (temp) => data += temp);
            req.on('end', async () => {
                await users.create(querystring.parse(data));
            })
            res.writeHead(301, {
                Location: '/'
            });
            res.end();
        }
    }
    res.end();
})

// 搭建网站服务器，实现客户端与服务器端的通信
// 连接数据库，创建用户集合，向集合中插入文档
// 当用户访问/list时，将所有用户信息查询出来
// 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 当用户访问/delete时，实现用户删除功能