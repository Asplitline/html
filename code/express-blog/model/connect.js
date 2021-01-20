const mongo = require('mongoose');
const conf = require('config');

const { host, user, pwd, port, dbname } = conf.db;

mongo.connect(`mongodb://${user}:${pwd}@${host}:${port}/${dbname}`)
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));