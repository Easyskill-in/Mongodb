const mongoose = require("mongoose")


const NewSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: String,
    email: String,
    age: Number,
    arr: [String],
    address: {
        city: String,
        state: String,
        pincode: Number
    },
    // role: {
    //     type: String,
    //     enum: ["user", "admin", "manager"],
    // }


}, { timestamps: true })


module.exports = mongoose.model("NewModel", NewSchema)