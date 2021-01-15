const http = require('http');

const server = http.createServer();
const router = require('./route');

router.start(server);

server.listen(3000, () => {
    console.log('http://localhost:3000');
})
