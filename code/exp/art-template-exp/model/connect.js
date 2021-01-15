const mongoose = require('mongoose');

mongoose.connect('mongodb://mongoexp:123456@localhost:27017/mongooseExp')
    .then(() => console.log('connect success'))
    .catch(err => console.log(err, 'connect failed'));
