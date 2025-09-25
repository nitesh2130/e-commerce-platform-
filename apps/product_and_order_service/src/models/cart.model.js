import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Student = sequelize.define('Students', {
        userId: {
            type: DataTypes.NUMBER,
            allowNUll: false
        }
    })
}