import { DataTypes } from "sequelize";

export const createCartModel = (sequelize) => {
    const Cart = sequelize.define('carts', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Cart
}