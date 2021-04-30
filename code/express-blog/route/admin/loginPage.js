const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = {
    getList: (req, res) => {
        res.render('admin/login');
    },
    getLoginOut: (req, res) => {
        res.clearCookie('connect.sid');
        res.redirect('/admin/login');
        req.app.locals.userInfo = null;
        req.app.locals.currentMenu = null;
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        if (email.trim().length == 0 || password.trim().length == 0) {
            return res.render('admin/login', { msg: '邮箱或密码不能为空' });
        }
        // console.log(req.body);
        const user = await User.findOne({ email });
        // console.log(!!user);
        if (user) {
            const isCheck = await bcrypt.compare(password, user.password);
            if (isCheck) {
                req.session.username = user.username;
                req.session.roles = user.roles;
                req.app.locals.userInfo = user;
                return res.redirect('/admin/user');
            } else {
                return res.render('admin/login', { msg: '邮箱或密码错误' })
            }
        } else {
            return res.render('admin/login', { msg: '用户不存在' });
        }
    },
}