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
const CartItem = createCartItemModel( sequelize );
const Order = createOrderModel( sequelize );
const OrderItem = createOrder_itemModelModel( sequelize );
const Categories = createCategoriesModel( sequelize );

// Associations (Foreign Keys) One Cart to => many Cart Items

Cart.hasMany(CartItem, {foreignKey: "cartId", onDelete: "CASCADE"});
CartItem.belongsTo(Cart, { foreignKey: "cartId"})

// Associations (Foreign Keys) One oder to => many order Items
Order.hasMany(OrderItem, {foreignKey: "orderId", onDelete: "CASCADE"});
OrderItem.belongsTo(Order, { foreignKey: "orderId"})




export default connectDB;