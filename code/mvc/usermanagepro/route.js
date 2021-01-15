const url = require('url');
const controller = require('./controller');

module.exports = {
    start: function (server) {
        server.on('request', (req, res) => {
            const { pathname, query } = url.parse(req.url, true);
            const method = req.method.toLowerCase();
            if (method == 'get') {
                if (pathname == '/') {
                    controller.index(res);
                } else if (pathname == '/add') {
                    controller.addPage(res);
                }
                else if (pathname == '/delete') {
                    controller.deleteUser(res, query.id);
                } else if (pathname == '/show') {
                    controller.showUser(res, query.id);
                } else if (pathname == '/edit') {
                    controller.editPage(res, query.id);
                } else {
                    controller.static(res, pathname);
                }
            } else if (method == 'post') {
                if (pathname == '/add') {
                    controller.addUser(req, res);
                } else if (pathname == '/edit') {
                    controller.editUser(req, res, query.id);
                }
            }
        })
    }
}