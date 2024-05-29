'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductType, { foreignKey: "jenisBarangId"})
    }
  }
  Product.init({
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
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stok cannot be null",
        },
        notEmpty: {
          msg: "Stok cannot be empty",
        },
        min: {
          args : 1,
          msg : "Minimum Stok is 1"
        }
      },
    },
    jenisBarangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "jenisBarangId cannot be null",
        },
        notEmpty: {
          msg: "jenisBarangId cannot be empty",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};