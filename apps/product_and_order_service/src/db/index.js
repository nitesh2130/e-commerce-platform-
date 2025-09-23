import { Sequelize } from "sequelize"



const sequelize = new Sequelize('shoping_db', 'postgres', 'shoping_password', {
    host: 'localhost',
    dialect: 'postgres',
});

const connectDB = async () => {
     try {
        await sequelize.authenticate();
        console.log("Database connection is establised ✅ ")
     } catch (error) {
        console.log("ERROR ❌ : ", error.message);
     }
}

export default connectDB;