const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: String,
    email: String,
    age: Number,
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {

    if (!this.isModified('password')) {
        return next()
    }

    try {
        this.password = await bcrypt.hash(this.password, 7)
        next()
    } catch (error) {
        return error.message
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.password)
        return result || true
    } catch (error) {
        console.log("Error : ", error.message)
        return false
    }
}


// const User = mongoose.model('User', userSchema);

// module.exports = User;
module.exports = mongoose.model('User', userSchema);

---------------------------------------------
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: { type: String, require: true },
//     password: String,
//     email: String,
//     age: Number,
// }, {
//     timestamps: true
// });

// const User = mongoose.model('User', userSchema);

// // module.exports = User;
// module.exports = mongoose.model('User', userSchema);
