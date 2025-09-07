import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from './app.js'
dotenv.config({path: './env'});
connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('this is server and its running on port ', process.env.PORT)
        

    })
})
.catch((err) => {
    console.log("mongodb connection failed !!!", err)
})