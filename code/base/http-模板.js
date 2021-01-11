const http = require('http');


// 写法1
/* const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('hello world!\n你好世界');
})

server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
}) */

// 写法2
const server = http.createServer();

server.listen(3000);

server.on('request', (req, res) => {
    // headers - 请求头
    // url - 请求地址
    // method - 请求方法
    /* console.log(req.headers);
    console.log(req.url);
    console.log(req.method); */
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.write('hello world!\n你好世界');
    res.end();
})
