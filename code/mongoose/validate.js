const mongoose = require('./connect');

const valiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '输入标题'],
        minlength: 2,
        maxlength: 10,
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    publishDate: {
        type: Date,
        default: Date.now // 默认值
    },
    category: {
        type: String,
        enum: { // 枚举 列举出当前字段可以拥有的值
            values: ['html', 'css', 'javascript', 'nodejs'],
            message: '分类名称错误'
        }
    },
    author: {
        type: String,
        validate: {
            validator: v => {
                return v && v.length >= 4;
            },
            message: '作者不为空,作者名称长度不能小于4'
        }
    }
})

const Validate = mongoose.model('validate', valiSchema);

Validate.create({
    title: 'aa',
    age: 99,
    category: 'css3',
    author: '123'
}).then(data => console.log(data)).catch(err => {
    // console.log(err.errors);
    let { errors } = err;
    for (attr in errors) {
        console.log(errors[attr].properties.message);
    }
})