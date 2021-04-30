const mongo = require('mongoose');

const commentSchema = new mongo.Schema({
    uid: {
        type: mongo.Schema.Types.ObjectId,
        ref:'user'
    },
    aid: {
        type: mongo.Schema.Types.ObjectId,
        ref:'article'
    },
    content: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const Comment = new mongo.model('comment', commentSchema);

module.exports = {
    Comment,
}