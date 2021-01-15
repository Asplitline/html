const mongo = require('mongoose');

const studentSchema = new mongo.Schema({
    name: String,
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    sex: {
        type: String,
        enum: ['0', '1']
    },
    email: {
        type: String
    },
    hobbies: [String],
    college: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
})

const Student = mongo.model('Student', studentSchema);

module.exports = Student;