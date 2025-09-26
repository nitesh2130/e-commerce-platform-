import { DataTypes } from "sequelize";

export const createCartItemModel = async (sequelize) => {
    const Cart_items = sequelize.define('Cart_items', {
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