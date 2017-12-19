let mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: String,
    last_name: String,
    birthday: Date,
    created: Date,
    updated: Date,
    sex: String, // m OR f
    avatar: String
});

UserSchema.pre('save', function(next) {
    let user = this, date = new Date();
    if(!user.created) user.created = date;
    user.updated = date;
    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
    }));
});

UserSchema.methods.compare = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);