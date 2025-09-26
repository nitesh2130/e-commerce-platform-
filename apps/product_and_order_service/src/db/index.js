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

// Initialize models for the table
const Product = createProductModel( sequelize );
const Cart = createCartModel( sequelize );
const Cart_item = createCartItemModel( sequelize );
const Order = createOrderModel( sequelize );
const Order_item = createOrder_itemModelModel( sequelize );
const Categories = createCategoriesModel( sequelize );

export default connectDB;