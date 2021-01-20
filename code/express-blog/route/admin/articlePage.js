const { Article } = require('../../model/article');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = {
    getList: async (req, res) => {
        req.app.locals.currentMenu = 'article';
        let { page } = req.query;
        page = page ? page : 1;
        const pageMax = 5;
        let total = await Article.countDocuments();
        let list = await Article.find().skip(pageMax * (page - 1)).limit(pageMax).populate('author');

        list = JSON.parse(JSON.stringify(list));
        let pageNum = Math.ceil(total / pageMax);
        let pages = Array.from({ length: pageNum }, (v, k) => k + 1);
        res.render('admin/article', {
            list,
            page: {
                pageNum,
                currentPage: page,
                pages
            }
        });

    },
    getForm: async (req, res) => {
        const { id, msg } = req.query;
        if (id) {
            let ArticleData = await Article.findOne({ _id: id });
            ArticleData = JSON.parse(JSON.stringify(ArticleData));
            res.render('admin/article-edit', {
                link: '/admin/editArticle?id=' + id,
                ArticleData,
                text: '修改',
                msg,
            })
        } else {
            res.render('admin/article-edit', {
                link: '/admin/addArticle',
                text: '添加',
                msg,
            })
        }
    },
    postAdd: (req, res) => {
        let { root } = req.app.locals;
        let formData = new formidable({ uploadDir: __dirname, keepExtensions: true });
        formData.parse(req, async (err, fields, files) => {
            const { path: pathname, name } = files.file;
            const static = path.join(root, 'public', 'uploads', name);
            fs.rename(pathname, static, (err) => {
                if (!err) console.log("修改文件成功");
            })
            fields.publish = fields.publish ? fields.publish : undefined;
            fields.cover = fields.cover ? '/uploads/' + name : '';
            await Article.create(fields)
                .then(console.log("文章创建成功"))
                .catch(err => console.log("文章创建失败"));
            res.redirect('/admin/article');
        })
    },
    postEdit: (req, res) => {
        let { id } = req.query;
        let { root } = req.app.locals;
        let formData = new formidable({ uploadDir: __dirname, keepExtensions: true });
        formData.parse(req, async (err, fields, files) => {
            const { path: pathname, name, size } = files.file;
            const static = path.join(root, 'public', 'uploads', name);
            fs.rename(pathname, static, (err) => {
                if (!err) console.log("修改文件成功");
            })
            if (name === '' && size === 0) {
                fs.rm(pathname, err => {
                    if (!err) console.log('删除空文件成功');
                    else console.log('删除空文件失败');
                })
            }
            fields.publish = fields.publish ? fields.publish : undefined;
            fields.cover = name === '' ? fields.cover : '/uploads/' + name;
            await Article.updateOne({ _id: id }, fields)
                .then(console.log("文章创建成功"))
                .catch(err => console.log("文章创建失败"));
            res.redirect('/admin/article');
        })
    },
    postDelete: (req, res) => {
        const { id } = req.query;
        Article.deleteOne({ _id: id })
            .then(() => console.log('删除成功'))
            .catch(err => console.log('删除失败'))
        res.redirect('/admin/article');
    }

}