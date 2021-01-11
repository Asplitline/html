const mongo = require('./connect');

const userSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80,
    },
    email: String,
    hobbies: [String],
});

const Users = mongo.model('userlist', userSchema);

module.exports = Users;