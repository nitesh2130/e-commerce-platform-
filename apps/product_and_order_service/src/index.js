import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config({path: './.env'});

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('this is server and its running on port ', process.env.PORT)
    })
})
.catch((error) => {
    console.log("error on running the server", error)
})