const mongo = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongo.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true,
        enum: ['admin', 'normal'],
    },
    state: {
        type: Boolean,
        default: true,
    },
})

const User = mongo.model('user', userSchema);


async function init() {
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash('123456', salt);
    for (let i = 1; i < 20; i += 3) {
        let obj = {
            username: 'lisi' + i,
            email: '123@123' + i + '.com',
            password,
            roles: 'admin',
        }
        await User.create(obj).then(() => console.log('数据创建成功'));
    }
}
// init();

module.exports = {
    User
}