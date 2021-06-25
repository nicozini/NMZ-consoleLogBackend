"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // hasMany associations
      Roll.hasMany(models.User,{
        as:"users",
        foreinKey:"roll_id"
      })
      
    }
  }
  Roll.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roll",
    }
  );
  return Roll;
};
