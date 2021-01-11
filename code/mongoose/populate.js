
const mongoose = require('./connect');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const postSchema = new mongoose.Schema({
    titile: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const User = mongoose.model('user', userSchema);
const Post = mongoose.model('post', postSchema);

// User添加数据
// User.create({ name: 'wangwu' }).then(data => console.log(data))

// Post添加数据
// Post.create({ titile: 'hello world', author: '5ffc1d59074b683044b79ccb' })
//     .then(data => { console.log(data) });

// 联合查询
Post.find().populate('author').then(data => console.log(data));
