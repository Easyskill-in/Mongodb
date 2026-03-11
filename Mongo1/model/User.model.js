const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

// module.exports = User;
module.exports = mongoose.model('User', userSchema);
