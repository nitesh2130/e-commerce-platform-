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
            type: DataTypes.STRING,
            allowNull: false
        },
        available_stock_quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_stock_quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}