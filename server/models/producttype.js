'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductType.hasMany(models.Product, { foreignKey: "jenisBarangId"})
    }
  }
  ProductType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name Cannot be null",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};