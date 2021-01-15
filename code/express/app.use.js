const express = require('express');
const app = express();

// 将函数提取出来，方便传参
app.use(fn({ a: 1 }));

function fn(obj) {
    return function (req, res, next) {
        if (obj.a == 1) {
            console.log(req.url);
        } else {
            console.log(req.method);
        }
        next();
    }
}

app.get('/', (req, res) => {
    res.send('ok');
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})