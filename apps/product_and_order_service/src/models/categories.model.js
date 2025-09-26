import { DataTypes } from "sequelize";

export const createCategoriesModel = async (sequelize) => {
    const Categories = sequelize.define('categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}