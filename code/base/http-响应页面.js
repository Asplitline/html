const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.listen(3000, () => {
    console.log('http://127.0.0.1/3000');
});

server.on('request', (req, res) => {
    var urls = req.url;
    console.log(urls);
    if (urls == '/') {
        fs.readFile('./src/index.html', 'utf8', (err, data) => {
            if (!err) {
                // 设置单个请求头
                // res.setHeader('content-type', 'text/html;charset=utf-8');
                // 设置多个请求头
                res.writeHeader(200, {
                    'Content-Type': 'text/html;charset=utf-8'
                })
                res.end(data)
            } else {
                res.end(err);
            }
        })
    } else {
        fs.readFile('.' + urls, (err, data) => {
            if (!err) {
                res.write(data);
            }
            res.end();
        })
    }
})