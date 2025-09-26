import { DataTypes } from "sequelize";

export const createCartModel = async (sequelize) => {
    const Cart
     = sequelize.define('Carts', {
        userId: {
            type: DataTypes.INTEGER,
            allowNUll: false
        }
    })
}