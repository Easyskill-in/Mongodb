const express = require('express');
const app = express();

const User = require('../model/User.model.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/submit", async (req, res) => {
    const { username, password, email, age } = req.body
    try {

        const newUser = new User({
            username,
            password,
            email,
            age
        })

        const ans = await newUser.save()

        // const ans = await User.create({
        //     username,
        //     password,
        //     email,
        //     age
        // },
        //     {
        //         username: "1",
        //         password: "2",
        //         email: "21",
        //         age: 12
        //     },
        // )

        res.json({
            success: true,
            message: ans
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})



app.get("/Users", async (req, res) => {
    try {
        // const ans = await User.find()
        // const ans = await User.findOne({ age: 5 })
        // const ans = await User.findOne({ _id: "69b0ed0c44b51403bf1c805a" })
        // const ans = await User.findById("69b0ed0c44b51403bf1c805a").select("username email")
        // const ans = await User.findById("69b0ed0c44b51403bf1c805a").select("-password")

        // const ans = await User.updateOne({ age: 5 }, { email: "Z.com" })
        // const ans = await User.updateMany({ age: 5 }, { email: "Z.com" })
        // const ans = await User.findByIdAndUpdate('69b0ed0c44b51403bf1c805a', { age: 909 }, { new: true })
        const ans = await User.findByIdAndDelete('69b0ed0c44b51403bf1c805a')

        res.json({
            success: true,
            message: ans
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = app;

