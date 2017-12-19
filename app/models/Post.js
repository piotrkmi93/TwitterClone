let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    content: String,
    created_at: Date,
    image: String,
    user: mongoose.Schema.Types.ObjectId
});

PostSchema.pre('save', function(next) {
    if(!user.created) user.created = date;
    next();
});

module.exports = mongoose.model('Post', PostSchema);