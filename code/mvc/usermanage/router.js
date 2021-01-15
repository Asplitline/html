const fs = require('fs');
const url = require('url');

const controller = require('./controller');

module.exports = {
    start: function (server) {
        server.on('request', (req, res) => {
            const { pathname, query } = url.parse(req.url, true);
            if (pathname == '/') {
                controller.index(res);
            } else if (pathname == '/show') {
                controller.show(res, query.id);
            } else {
                controller.static(res, pathname);
            }
        })
    }
}
