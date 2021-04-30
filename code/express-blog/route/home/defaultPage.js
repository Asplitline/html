const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = {
    index: async (req, res) => {
        let { page } = req.query;
        const pageMax = 6;
        page = page ? page : 1;
        let total = await Article.countDocuments();
        let list = await Article.find().skip(pageMax * (page - 1)).limit(pageMax).populate('author');
        list = JSON.parse(JSON.stringify(list));
        let pageNum = Math.ceil(total / pageMax);
        let pages = Array.from({ length: pageNum }, (v, k) => k + 1);
        res.render('home/default', {
            list,
            page: {
                currentPage: page,
                pageNum,
                pages,
            }
         });
    },
    article: async (req, res) => {
        const { id } = req.query;
        let data = await Article.findOne({ _id: id }).populate('author');
        let comment = await Comment.find({ aid: id }).populate('uid');
        // const list1 = await Article.findOne({ _id: id });
        data = JSON.parse(JSON.stringify(data));
        comment = JSON.parse(JSON.stringify(comment));
        res.render('home/article', { data, comment });
    },
    comment: async (req, res) => {
        const { aid: id } = req.body;
        await Comment.create(req.body)
            .then(() => console.log('评论成功'))
            .catch((err) => console.log('评论失败', err));
        res.redirect('/home/article?id=' + id);
    }
}