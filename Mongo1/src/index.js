const { PORT } = require('../config/Config');
const app = require('./app');
const connectDB = require("../config/Db.js")


async function connectDataBase() {
    try {
        const res = await connectDB()
        if (!res) {
            console.log("DB Connection Error")
            return;
        }


        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


    } catch (error) {
        console.log("Error ", error.message)
    }
}


connectDataBase()