"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // hasOne associations
      Product.hasOne(models.OrderDetail, {
        as: 'orderdetails',
        foreignKey: 'products_id'
      })

      // hasMany associations
      Product.hasMany(models.Image,{
        as:"images",
        foreingKey:"products_id"
      })

      // belongsTo associations
      Product.belongsTo(models.Category,{
        as:"categories",
        foreignKey: "id"
      })

    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      stock: DataTypes.DECIMAL,
      stock_min: DataTypes.DECIMAL,
      stock_max: DataTypes.DECIMAL,
      categories_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      week: DataTypes.STRING,
      facts: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
