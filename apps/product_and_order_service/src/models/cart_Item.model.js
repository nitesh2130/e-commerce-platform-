import { DataTypes } from "sequelize";

export const createCartItemModel = async (sequelize) => {
    const CartItem = sequelize.define('CartItems', {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        }
    })
}