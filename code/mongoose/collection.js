
const mongoose = require('./connect');

// 设定集合规则
const expSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 创建集合并应用规则
const Exp = mongoose.model('exp', expSchema);

// 创建文档 - 向集合插入元素
// method - 1
/* const exp1 = new Exp({
    name: 'js',
    author: 'lisi',
    isPublished: true
})
exp1.save(); */

// method - 2
/* Exp.create({ name: 'html', author: 'wangwu', isPublished: false },
    function (err, data) {
        console.log(err);
        console.log(data); // 创建的文档
    }); */

// method - 2+
/* Exp.create({ name: 'css', author: 'zhangsan', isPublished: false })
    .then(data => console.log(data))
    .catch(err => console.log(err)); */

module.exports = Exp;