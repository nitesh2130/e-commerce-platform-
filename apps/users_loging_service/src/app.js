import express from 'express';

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


export default app