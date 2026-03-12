const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: String,
    email: String,
    age: Number,
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

// module.exports = User;
module.exports = mongoose.model('User', userSchema);
