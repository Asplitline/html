
const fs = require('fs');
const template = require('art-template');
const querystring = require('querystring');
const formidable = require('formidable');
const mime = require('mime');
template.defaults.root = './';
module.exports = {
    index: function (res) {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            let temp = template('index.html', { data })
            res.end(temp);
        })
    },
    static: function (res, path) {
        // let type = mime.getType(path);
        // console.log(type);
        fs.readFile('.' + path, (err, data) => {
            if (!err) {
                // res.setHeader('content-type', type);
                // if (type == 'image/png')
                // console.log(data);
                res.end(data);
            } else {
                // console.log(err);
                res.end('no file ' + path);
            }
        })
    },
    addPage: function (res) {
        let html = template('add.html', {});
        // console.log(html); 
        res.end(html);
    },
    addUser: function (req, res) {
        const form = formidable({ uploadDir: __dirname, keepExtensions: true });
        form.parse(req, (err, fields, files) => {
            if (files.img.size == 0 && files.img.name == '') {
                fs.rm(files.img.path, err => {
                    if (!err) console.log('删除成功');
                })
                fields.img = '';
                // console.log(fields, 1);
            } else {
                const newPath = './img/' + files.img.name;
                fs.rename(files.img.path, newPath, (err, data) => {
                    if (!err) console.log(data);
                    else console.log(err);
                })
                fields.img = newPath;
            }
            fields.id = Number.parseInt(fields.id);
            fs.readFile('./data.json', 'utf8', (err, data) => {
                data = JSON.parse(data);
                data.push(fields);
                fs.writeFile('./data.json', JSON.stringify(data), (err, endData) => {
                    res.setHeader('content-type', 'text/html;charset=utf8')
                    if (!err) res.end('<script>alert("添加数据成功");location.href="/";</script>');
                    else res.end('<script>alert("添加数据失败");location.href="/";</script>');
                })
            })
        })
        // let data = '';
        // req.on('data', temp => data += temp);
        // req.on('end', () => {

        // })
        // res.end('add success');
    },
    showUser: function (res, id) {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            let endData = data.filter(item => item.id == id);
            let html = template('userinfo.html', { data: endData });
            res.end(html);
        })
    },
    deleteUser: function (res, id) {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            let path = '';
            let endData = data.filter(item => {
                if (item.id == id) path = item.img;
                return item.id != id;
            });
            fs.rm(path, (err) => {
                if (!err) console.log('文件删除成功');
                else console.log('文件删除失败');
            })
            fs.writeFile('./data.json', JSON.stringify(endData), (err) => {
                if (!err) console.log('用户删除成功');
                else console.log('用户删除失败');
                res.writeHead(301, { location: '/' });
                res.end();
            });
        })
    },

    editPage: function (res, id) {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            let endData = data.find(item => item.id == id);
            let html = template('edit.html', { data: endData });
            res.end(html)
        })
    },

    editUser: function (req, res, id) {
        const form = formidable({ uploadDir: __dirname, keepExtensions: true });
        form.parse(req, (err, fields, files) => {
            let curData;
            fs.readFile('./data.json', 'utf8', (err, data) => {
                data = JSON.parse(data);
                curData = data.find(item => item.id == id);
                // console.log(curData);
                fields.id = Number.parseInt(fields.id);
                console.log(files.img.size, files.img.name);
                if (files.img.size == 0 && files.img.name == '') {
                    fs.rm(files.img.path, err => {
                        if (!err) console.log('删除空图片成功');
                    })
                    fields.img = curData.img;
                    // console.log(fields, 1);
                } else {
                    fs.rm(curData.img, err => {
                        if (!err) console.log("删除旧图片成功");
                    })
                    let newPath = './img/' + files.img.name;
                    fs.rename(files.img.path, newPath, (err) => {
                        if (!err) console.log('修改文件成功');
                        else console.log(err);
                    })
                    fields.img = newPath;
                }
                data = data.map(item => item.id == id ? fields : item);
                // console.log(data);
                fs.writeFile('./data.json', JSON.stringify(data), (err) => {
                    res.setHeader('content-type', 'text/html;charset=utf8');
                    if (!err) res.end('<script>alert("修改用户成功");location.href="/";</script>')
                    else res.end('<script>alert("修改用户失败");location.href="/";</script>')
                })
            })
        })
    }
}