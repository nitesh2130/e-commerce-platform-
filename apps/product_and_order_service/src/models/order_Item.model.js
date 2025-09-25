import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Student = sequelize.define('Students', {
        orderId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        productId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        Quantity: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false
        }

    })
}