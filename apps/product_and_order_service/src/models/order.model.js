import { DataTypes } from "sequelize";

export const createOrderModel = async (sequelize) => {
    const Order = sequelize.define('Orders', {
        userId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        totalAmount : {
            type: DataTypes.NUMBER,
            allowNull: false

        },
        status: {
            type: DataTypes.NUMBER,
            allowNull: false

        }

    })
}