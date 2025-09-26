import { DataTypes } from "sequelize";

export const createOrderModel = (sequelize) => {
    const Order = sequelize.define('orders', {
        userId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        totalAmount : {
            type: DataTypes.NUMBER,
            allowNull: false

        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    return Order;
}