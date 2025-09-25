import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Student = sequelize.define('Students', {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        available_stock_quantity: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        total_stock_quantity: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    })
}