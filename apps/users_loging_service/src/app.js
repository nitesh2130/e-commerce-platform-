import express from 'express';
import cors from "cors";             
import cookieParser from "cookie-parser";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credential: true ,
        // whitelisting  please explain in details
    })
)

app.use(express.json({limit: "5kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())  // to this we can setup only server is read and delete the cookie-parser 


export default app