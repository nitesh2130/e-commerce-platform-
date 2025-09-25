import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Student = sequelize.define('Students', {
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