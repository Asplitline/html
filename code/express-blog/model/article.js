const mongo = require('mongoose');

const articleSchema = new mongo.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: [true, '请填写文章标题'],
    },
    author: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'user'
    },
    publish: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }

});

const Article = mongo.model('article', articleSchema);



async function init() {
    for (let i = 1; i < 20; i += 2) {
        let obj = {
            title: i * 17,
            author: '6005b2cd0cb5b8399cbe139a',
            content: i,
        }
        await Article.create(obj).then(() => console.log('数据创建成功'));
    }
}
// init();

module.exports = {
    Article
}