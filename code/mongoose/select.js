const mongoose = require('./connect');

const selectSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
})

const Select = mongoose.model('select', selectSchema);

// let age = 15;
// for (let i = 0; i < 5; i++) {
//     Select.create({
//         name: 'lisi' + i,
//         age: age + i * 5,
//         email: '132@123.com',
//         password: '231' + i,
//         hobbies: ['js', 'html', 'css']
//     }).then(data => console.log(data))
// }

// Select.find().then(data => console.log(data));
// Select.find({ name: 'lisi0' }).then(data => console.log(data));
// Select.findOne({ hobbies: ["js", "html", "css"] }).then(data => console.log(data))
// Select.find({ age: { $gt: 20, $lt: 40 } }).then(data => console.log(data));
// Select.find({ hobbies: { $in: 'js' } }).then(data => console.log(data));
// Select.find().select('name -_id').then(data => console.log(data));
// Select.find().sort('-age').then(data => console.log(data));
Select.find().skip(2).limit(2).then(data => console.log(data));

