const { ProductType } = require("../models");

module.exports = class ProductTypeController {
  static async getAllProductType(req, res, next) {
    try {
      const data = await ProductType.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getProductTypeById(req, res, next) {
    try {
      const { id } = req.params;
      const productType = await ProductType.findByPk(id);
      if (!productType) throw { name: "ProductType not found", status: 404 };
      res.status(200).json(productType);
    } catch (error) {
      next(error);
    }
  }

  static async getProductTypeByName(req, res, next) {
    try {
      const { name } = req.params;
      const productType = await ProductType.findOne({
        where: {
          name,
        },
      });
      if (!productType) throw { name: "ProductType not found", status: 404 };
      res.status(200).json(productType);
    } catch (error) {
      next(error);
    }
  }

  static async addProductType(req, res, next) {
    try {
      if (!req.body) throw { name: "Bad Request", status: 400 };

      const { name } = req.body;

      await ProductType.create({
        name,
      });

      const productType = this.getProductTypeByName(name);

      res.status(201).json({ productType, message: "ProductType has been created" });
    } catch (error) {
      next(error);
    }
  }

  static async editProductType(req, res, next) {
    try {
      const { id } = req.params;
      const productType = await ProductType.findByPk(id);

      if (!productType) throw { name: "ProductType not found", status: 404 };
      if (!req.body) throw { name: "Bad Request", status: 400 };

      let newProductType = Object.fromEntries(
        Object.entries(req.body).filter(
          ([key, value]) =>
            key in productType && value !== undefined && value !== null && value !== ""
        )
      );

      await productType.update(newProductType);
      await productType.save();

      res
        .status(200)
        .json({message: `ProductType: ${productType.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductType(req, res, next) {
    try {
      const { id } = req.params;
      const productType = await ProductType.findByPk(id);
      if (!productType) throw { name: "Product not found", status: 404 };
      await ProductType.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({ message: `Product: ${productType.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
};
