let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    content: String,
    created: Date,
    updated: Date,
    user: mongoose.Schema.Types.ObjectId,
    post: mongoose.Schema.Types.ObjectId
});

CommentSchema.pre('save', function(next) {
    let comment = this, date = new Date();
    if(!comment.created) comment.created = date;
    comment.updated = date;
    next();
});

module.exports = mongoose.model('Comment', CommentSchema);