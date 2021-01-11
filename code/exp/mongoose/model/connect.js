const mongoose = require('mongoose');

mongoose.connect("mongodb://mongoexp:123456@localhost/mongooseExp")
    .then(() => console.log('connect success'))
    .catch((err) => console.log('connect failed', err))

module.exports = mongoose;