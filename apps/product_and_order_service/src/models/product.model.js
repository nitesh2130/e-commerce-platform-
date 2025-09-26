import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Product = sequelize.define('Products', {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        available_stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(10, 1),
            allowNull: false
        }
    })
}