/**
 * 手写路由和静态文件获取
 */

const template = require('art-template');
const mime = require('mime');
const querystring = require('querystring');
const fs = require('fs');
const url = require('url');
const Student = require('../model/student');
const path = require('path');

function staticFile(res, type, static) {
    fs.readFile(static, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHeader(200, {
                'content-type': type
            })
            res.write(data);
        }
        res.end();
    })
}

function addForm(req, res) {
    let data = '';
    req.on('data', (temp) => data += temp);
    req.on('end', async () => {
        data = querystring.parse(data);
        data.enterDate = data.enterDate || undefined;
        // data.enterDate = data.enterDate || Date.now();
        await Student.create(data);
    })
    res.writeHead(301, {
        location: '/'
    })
    res.end();
}

async function showList(res) {
    let data = await Student.find();
    // console.log(data);
    let html = template('list', { data });
    res.end(html);
}

function add(res) {
    let html = template('index', {});
    res.end(html);
}


module.exports = {
    router: async function (req, res) {
        const { pathname, query } = url.parse(req.url);
        const method = req.method.toLowerCase();
        const type = mime.getType(pathname);
        const static = path.join(__dirname, '..', pathname)
        if (method == 'get') {
            if (pathname == '/' || pathname == '/list') {
                showList(res);
            } else if (pathname == '/add') {
                add(res);
            } else {
                if (type == 'text/css') {
                    staticFile(res, type, static);
                }
            }
        }
        else if (method == 'post') {
            if (pathname == '/add') {
                addForm(req, res);
            }
        }
    },
    dateformat: function (date) {
        let temp = new Date(date);
        return temp.getFullYear() + '-' + temp.getMonth() + 1 + '-'
            + temp.getDate() + '  ' + temp.getHours() + ':' + temp.getMinutes();
    }
}
