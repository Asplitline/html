const fs = require('fs');

module.exports = {
    index: function (res) {
        fs.readFile('./index.html', 'utf8', (err, html) => {
            fs.readFile('./data.json', 'utf8', (err, data) => {
                let Arr = JSON.parse(data);
                let temp = '';
                Arr.forEach(item => {
                    temp += `
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.id}</td>
                        <td>${item.nengli}</td>
                        <td>${item.jituan}</td>
                        <td>
                            <a href="/show?id=${item.id}">查找</a>
                            <a href="/edit">修改</a>
                            <a href="/delete">删除</a>
                        </td>
                    </tr>`;
                })
                html = html.replace(/{{list}}/, temp);
                res.end(html);
            })
            // res.end(html);

        })
    },
    show: function (res, id) {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            let Arr = JSON.parse(data);
            Arr = Arr.filter(item => item.id == id);
            let html = `
            <h1>个人信息</h1>
            <h1>${Arr[0].id}</h1>
            <h1>${Arr[0].name}</h1>
            <h1>${Arr[0].nengli}</h1>
            <h1>${Arr[0].jituan}</h1>
            `;
            fs.readFile('./userinfo.html', 'utf8', (err, users) => {
                users = users.replace(/{{userinfo}}/, html);
                res.end(users);
            })
        })
    },
    static: function (res, path) {
        fs.readFile('.' + path, 'utf8', (err, data) => {
            if (!err) {
                res.end(data);
            } else {
                res.end('no file ' + path);
            }
        })
    }
}