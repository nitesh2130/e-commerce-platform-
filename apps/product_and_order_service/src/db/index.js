import { Sequelize } from "sequelize"
import { createProductModel } from "../models/product.model.js";
import { createCartItemModel } from "../models/cart_Item.model.js";
import { createCartModel } from "../models/cart.model.js";
import { createCategoriesModel } from "../models/categories.model.js";
import { createOrderModel } from "../models/order.model.js";
import { createOrderItemModel} from "../models/order_Item.model.js";


const sequelize = new Sequelize('shoping_db', 'postgres', 'shoping_password', {
    host: 'localhost',
    dialect: 'postgres',
});

const connectDB = async () => {
     try {

      // console.log("db an connect hoga ")
      // const sequelize = new Sequelize('shoping_db', 'postgres', 'shoping_password', {
      //    host: 'localhost',
      //    dialect: 'postgres',
      // });

      console.log("db an connect ho gaya ")

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
const OrderItem = createOrderItemModel( sequelize );
const Categories = createCategoriesModel( sequelize );

// Associations (Foreign Keys) One Cart to => many Cart Items

Cart.hasMany(CartItem, {foreignKey: "cartId", onDelete: "CASCADE"});
CartItem.belongsTo(Cart, { foreignKey: "cartId"});

// Associations (Foreign Keys) One oder to => many order Items
Order.hasMany(OrderItem, {foreignKey: "orderId", onDelete: "CASCADE"});
OrderItem.belongsTo(Order, { foreignKey: "orderId"})




export default connectDB;