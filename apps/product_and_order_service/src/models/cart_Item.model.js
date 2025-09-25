import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Student = sequelize.define('Students', {
        cartId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        productId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        count: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    })
}