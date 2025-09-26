import { DataTypes } from "sequelize";

export const createOrderItemModelModel = async (sequelize) => {
    const Order_item = sequelize.define('Order_items', {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }

    })
}