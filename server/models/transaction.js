"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(Product, { foreignKey: "barangId" });
    }
  }
  Transaction.init(
    {
      jumlahTerjual: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "JumlahTerjual cannot be null",
          },
          notEmpty: {
            msg: "JumlahTerjual cannot be empty",
          },
          min: {
            args: 1,
            msg: "Minimum jumlahTerjual is 1",
          },
        },
      },
      tanggalTransaksi: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "TanggalTransaksi cannot be null",
          },
          notEmpty: {
            msg: "TanggalTransaksi cannot be empty",
          },
        },
      },
      barangId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "BarangId cannot be null",
          },
          notEmpty: {
            msg: "BarangId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
