const mongoose = require('mongoose');

// 数据库不存在，会自动创建
mongoose.connect('mongodb://exp:123456@localhost:27017/exp')
    .then(() => console.log('connect success'))
    .catch((err) => console.log(err))

module.exports = mongoose;
