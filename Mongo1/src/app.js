const express = require('express');
const app = express();

const bcrypt = require("bcrypt")

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

        const hasedPassword = await bcrypt.hash(password,10)//


        const newUser = new User({
            username,
            password:hasedPassword,
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



app.post("/new",
    async (req, res) => {
        const
        { username,
            password,
            email,
            age } = req.body;
            
            const hasedPassword = await bcrypt.hash(password,10)
        try {

            const newUser = new User({
                username,
                password:hasedPassword,
                email,
                age
            })

    // newUser.username = "A";            

            const result = await newUser.save()

            const Ref = new New({
                name:username+"New",
                User:result._id
            })

            const res1 = await Ref.save()

            res.json({
                success:true,
                data:{result,res1}
            })


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
)


app.get("/New",async(req,res)=>{
    try{
        const result = await New.find({name:"BNew"}).populate({path:"User",select:"-email"})

        res.json({
            success:true,
            message:"all Users",
            data:result
        })

    }catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
})


app.post("/login",async(req,res)=>{
    try {
        const {username,password} = req.body;

        // console.log(username,password)

        if(!username || !password){
            return res.json({
                success:false,
                message:"username and password both are required"
            })
        }

        const MyUser = await User.findOne({username})
        // console.log({MyUser})
        if(!MyUser){
            return res.json({
                success:false,
                message:"User not Found"
            })
        }

        const isValid  = await bcrypt.compare(password,MyUser.password)

        

        if(!isValid){
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }

        res.json({
            success:true,
            message:"User Login",
            data:{isValid,MyUser}
        })

    } catch (error) {
         return res.status(500).json({
                success: false,
                message: error.message
            })
    }
})

module.exports = app;

