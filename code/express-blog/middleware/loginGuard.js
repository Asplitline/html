
module.exports = (req, res, next) => {
    if (req.url != "/login" && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        if (req.session.roles == 'normal')
            res.redirect('/home/');
        next();
    }
}