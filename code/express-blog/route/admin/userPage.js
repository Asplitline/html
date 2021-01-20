const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = {
    getList: async (req, res) => {
        req.app.locals.currentMenu = 'user';
        let { page } = req.query;
        page = page ? page : 1;
        const pageMax = 5;
        let total = await User.countDocuments();
        let list = await User.find().skip(pageMax * (page - 1)).limit(pageMax);
        let pageNum = Math.ceil(total / pageMax);
        let pages = Array.from({ length: pageNum }, (v, k) => k + 1);
        res.render('admin/user', {
            page: {
                pageNum,
                currentPage: page,
                pages,
            },
            list
        });
    },
    getForm: async (req, res) => {
        const { id, msg } = req.query;
        if (id) {
            const userData = await User.findOne({ _id: id });
            // console.log(userData);
            res.render('admin/user-edit', {
                link: '/admin/editUser?id=' + id,
                userData,
                text: '修改',
                msg,
            });
        } else {
            res.render('admin/user-edit', {
                link: '/admin/addUser',
                text: '添加',
                msg
            });
        }
    },
    getDelete: async (req, res) => {
        const { id } = req.query;
        await User.findOneAndDelete({ _id: id })
            .then(() => {
                res.redirect('/admin/user');
            })
            .catch(err => console.log(err));
    },
    postAdd: async (req, res, next) => {
        // console.log(req.body);
        const { email, password } = req.body;
        let isExist = await User.exists({ email });
        if (isExist) {
            next({ path: '/admin/userForm', msg: '修改失败,邮箱已存在' });
        }
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);;
        User.create(req.body)
            .then(() => {
                return res.redirect('/admin/user');
            })
            .catch(err => console.log(err.errors.state));
        // TODO>> 错误验证完善
    },
    postEdit: async (req, res, next) => {
        const { id } = req.query;
        const { password, email } = req.body;
        const userData = await User.findOne({ _id: id });
        let isEqual = await bcrypt.compare(password, userData.password);
        if (isEqual) {
            let isExist = await User.exists({ email });
            req.body.password = userData.password;
            if (!isExist || isExist && userData.email == email) {
                await User.updateOne({ _id: id }, req.body);
                res.redirect('/admin/user');
            } else {
                next(JSON.stringify({ path: '/admin/userForm', msg: '修改失败,邮箱已存在', id }));
            }
        } else {
            next(JSON.stringify({ path: '/admin/userForm', msg: '修改失败,密码不正确', id }));
        }
    },


}