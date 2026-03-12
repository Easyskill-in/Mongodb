const express = require('express');
const app = express();

const User = require('../model/User.model.js')
const New = require('../model/New.model.js')

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
        // const ans = await User.findByIdAndDelete('69b0ed0c44b51403bf1c805a')

        // const ans = await User.find({ age: { $eq: 5 } })
        // const ans = await User.find({ username: "A" })
        // const ans = await User.findOneAndUpdate({ username: 'CBA' }, { $inc: { age: 1 } }, { new: true })

        // const ans = await User.find({
        //     $or: [
        //         { age: { $lt: 18 } }
        //         , { username: "A" }
        //     ]
        // })
        const ans = await User.find()
        // const NewModel = await New.create({
        //     username: "A",
        //     password: "A",
        //     email: "A",
        //     age: 20,
        //     arr: ["A", "B", "C", "D"],
        //     address: {
        //         city: "Surat",
        //         state: "Gujarat",
        //         pincode: 395005
        //     }
        // })
        // const NewModel = await New.find({ address: { city: "Surat" } })
        const NewModel = await New.find({ arr: { $nin: ["Z", "F"] } })
        // const NewModel = await New.find({ "address.city": "Surat" })
        res.json({
            success: true,
            message: ans,
            NewModel
        })
        // const NewModel = await New.findOneAndUpdate({ username: "A" }, { $pull: { arr: "B" } }, { new: true })
        // res.json({
        //     success: true,
        //     message: ans,
        //     NewModel
        // })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = app;

