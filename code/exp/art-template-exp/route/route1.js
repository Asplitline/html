const getRouter = require('router');
const router = getRouter();
const template = require('art-template');
const Student = require('../model/student');
const querystring = require('querystring');

router.get('/add', (req, res) => {
    let html = template('index', {});
    res.end(html);
})

router.get('/list', async (req, res) => {
    let data = await Student.find();
    let html = template('list', { data });
    res.end(html)
})

router.post('/add', (req, res) => {
    let data = '';
    req.on('data', temp => data += temp);
    req.on('end', async (req, res) => {
        data = querystring.parse(data);
        data.enterDate = data.enterDate || undefined;
        await Student.create(querystring.parse(data));
    })
    res.writeHead(301, { location: '/list' });
    res.end();
})
module.exports = router;