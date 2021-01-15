const http = require('http');
const fs = require('fs');
const url = require('url'); // 解析请求地址
const path = require('path');
const mime = require('mime'); // 获取mime格式
const server = http.createServer();

server.listen(3000, () => {
    console.log('http://localhost:3000');
})

server.on('request', function (req, res) {
    // pathname - 解析出请求地址
    // query - 请求参数
    let { pathname, query } = url.parse(req.url, true);
    pathname = pathname == '/' ? '/default.html' : pathname;
    pathname = path.join(__dirname, 'public', pathname);
    let type = mime.getType(pathname);
    fs.readFile(pathname, function (err, data) {
        if (!err) {
            res.writeHeader(200, {
                'content-type': type
            })
            // 响应头添加文件mime类型
            res.end(data);
        } else {
            res.writeHeader(404, {
                'content-type': 'text/html;charset=utf8'
            })
            // console.log(err);
            res.end("<h1>文件读取失败</h1>");
        }
    })
})

