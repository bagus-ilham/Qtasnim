const { Product, ProductType } = require("../models");

module.exports = class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const data = await Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: ProductType,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: ProductType,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });

      if (!product) throw { name: "Product not found", status: 404 };
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async getProductByName(name) {
    try {
      const product = await Product.findOne({
        where: { name },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: ProductType,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
      if (!product) throw { name: "Product not found", status: 404 };
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(req, res, next) {
    try {
      if (!req.body) throw { name: "Bad Request", status: 400 };

      const { name, stok, jenisBarangId } = req.body;

      await Product.create({
        name,
        stok,
        jenisBarangId,
      });

      const product = this.getProductByName(name);

      res.status(201).json({ product, message: "Product has been created" });
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) throw { name: "Product not found", status: 404 };
      if (!req.body) throw { name: "Bad Request", status: 400 };

      let newProduct = Object.fromEntries(
        Object.entries(req.body).filter(
          ([key, value]) =>
            key in product &&
            value !== undefined &&
            value !== null &&
            value !== ""
        )
      );

      await product.update(newProduct);
      await product.save();

      res
        .status(200)
        .json({ message: `Product: ${product.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) throw { name: "Product not found", status: 404 };
      await Product.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({ message: `Product: ${product.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
};
