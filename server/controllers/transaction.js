const { Transaction, Product, ProductType } = require("../models");
const { Op } = require("sequelize");

module.exports = class TransactionController {
  static async getAllTransaction(req, res, next) {
    try {
      const { search, sortBy, sortOrder, startDate, endDate } = req.query;

      const where = {};
      if (search) {
        where.namaTransaksi = { [Op.like]: `%${search}%` };
      }
      if (startDate && endDate) {
        where.tanggalTransaksi = {
          ...where.tanggalTransaksi,
          [Op.between]: [startDate, endDate],
        };
      }

      const order = [];
      if (sortBy === "name") {
        order.push(["Product", "name", sortOrder === "asc" ? "ASC" : "DESC"]);
      } else if (sortBy === "date") {
        order.push(["tanggalTransaksi", sortOrder === "asc" ? "ASC" : "DESC"]);
      } else if (sortBy === "quantity") {
        order.push(["jumlahTerjual", sortOrder === "asc" ? "ASC" : "DESC"]);
      }

      const data = await Transaction.findAll({
        where,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: ProductType,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
        ],
        order,
        group: ["Transaction.id", "Product.id", "Product->ProductType.id"],
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
      console.log("masuk sini");
      const { id } = req.params;
      console.log(id, "disini");
      const transaction = await Transaction.findByPk(id);

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
      console.log(transaction, "ini trans");
      res.status(200).json({ message: `Transaction has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);

      await Transaction.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `Transaction has been deleted` });
    } catch (error) {
      next(error);
    }
  }
};
