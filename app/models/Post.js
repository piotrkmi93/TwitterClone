let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    content: String,
    created: Date,
    updated: Date,
    image: String,
    user: mongoose.Schema.Types.ObjectId
});

PostSchema.pre('save', function(next) {
    let post = this, date = new Date();
    if(!post.created) post.created = date;
    post.updated = date;
    next();
});

module.exports = mongoose.model('Post', PostSchema);