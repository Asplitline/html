require('./model/connect');

const http = require('http');
const template = require('art-template');
const server = http.createServer();

const path = require('path');
const servestatic = require('serve-static');
const static = servestatic('public');

template.defaults.root = path.join(__dirname, 'views');
template.defaults.extname = '.html';
template.defaults.imports.dateformat = dateformat;

server.listen(3000, () => {
    console.log('http://localhost:3000');
})
const router = require('./route/route1');
server.on('request', (req, res) => {
    router(req, res, () => { });
    static(req, res, () => { });
})


function dateformat(date) {
    let temp = new Date(date);
    return temp.getFullYear() + '-' + temp.getMonth() + 1 + '-'
        + padZero(temp.getDate()) + '  ' + padZero(temp.getHours()) + ':' + padZero(temp.getMinutes());
}

function padZero(str) {
    return str.toString().padStart(2, '0');
}