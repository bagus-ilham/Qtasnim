const { Transaction, Product, ProductType } = require("../models");

module.exports = class TransactionController {
  static async getAllTransaction(req, res, next) {
    try {
      const data = await Transaction.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: ProductType,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: ProductType,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        },
      });
      if (!transaction) throw { name: "Transaction not found", status: 404 };
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  static async addTransaction(req, res, next) {
    try {
      if (!req.body) throw { name: "Bad Request", status: 400 };

      const { jumlahTerjual, tanggalTransaksi, barangId } = req.body;

      await Transaction.create({
        jumlahTerjual,
        tanggalTransaksi,
        barangId,
      });

      res.status(201).json({ message: "Transaction has been created" });
    } catch (error) {
      next(error);
    }
  }

  static async editTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);

      if (!transaction) throw { name: "Transaction not found", status: 404 };
      if (!req.body) throw { name: "Bad Request", status: 400 };

      let newTransaction = Object.fromEntries(
        Object.entries(req.body).filter(
          ([key, value]) =>
            key in transaction &&
            value !== undefined &&
            value !== null &&
            value !== ""
        )
      );

      await transaction.update(newTransaction);
      await transaction.save();

      res
        .status(200)
        .json({ message: `Transaction: ${transaction.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) throw { name: "Transaction not found", status: 404 };
      await Transaction.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({ message: `Transaction: ${transaction.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
};
