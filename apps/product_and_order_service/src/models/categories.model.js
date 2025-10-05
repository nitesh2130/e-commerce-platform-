import { DataTypes } from "sequelize";
import { Categories } from "../db";

export const createCategoriesModel = async (sequelize) => {
  const Categories = sequelize.define("categories", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoriesImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
