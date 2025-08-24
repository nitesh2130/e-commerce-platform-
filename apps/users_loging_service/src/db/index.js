import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB is connected succesfully !! DB HOST : ${connectionInstance.connection.host}`);
        console.log("Database:", connectionInstance.connection.name);
        console.log("Port:", connectionInstance.connection.port);
    } catch (error) {
        console.log("mongo db giving the error ", error);
    }
}

export default connectDB;