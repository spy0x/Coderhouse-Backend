import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ProductModel } from "../DAO/mongo/models/products.models.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateProductAlreadyExistsErrorInfo, generateProductErrorInfo } from "../services/errors/info.js";
import productService from "../services/products.services.js";

export const productExists = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.pid;
  // Check if product exists and has valid id
  const product = await ProductModel.findById(id);
  if (mongoose.Types.ObjectId.isValid(id) && product) {
    return next();
  }
  return res.status(404).json({ status: "error", message: "Product not found" });
};

export const productValidParams = async (req: Request, res: Response, next: NextFunction) => {
  const products = req.body;
  // Check if products is an array
  if (!Array.isArray(products)) {
    return { code: 404, result: { status: "error", message: "Products must be an array" } };
  }
  // Check products array contains valid parameters
  for (const product of products) {
    if (!mongoose.Types.ObjectId.isValid(product.idProduct)) {
      return res.status(404).json({ status: "error", message: "Some product has wrong ID" });
    }
    const productExists = await productService.productExists(product.idProduct);
    if (!productExists) {
      return res.status(404).json({ status: "error", message: "Some product does not exist" });
    }
    if (!product.quantity || product.quantity < 1 || isNaN(product.quantity)) {
      product.quantity = 1;
    }
  }
  req.body = products;
  return next();
};

export const productValid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body as Product;
    // Check if product already exists
    if (await ProductModel.findOne({ code: product.code })) {
      CustomError.createError({
        name: "PRODUCT ERROR",
        message: "Product already exists",
        code: EErrors.PRODUCT_ALREADY_EXISTS,
        cause: generateProductAlreadyExistsErrorInfo(product),
        status: 400
      });
    }
    // Check if product has all required properties
    if (!product.title || !product.description || !product.price || !product.code || !product.category || !product.stock) {
      CustomError.createError({
        name: "PRODUCT ERROR",
        message: "Product is missing required properties",
        code: EErrors.PRODUCT_MISSING_PROPERTIES,
        cause: generateProductErrorInfo(product),
        status: 400
      });
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export const productsValidQueries = async (req: any, res: Response, next: NextFunction) => {
  const sort = req.query.sort;
  req.query.limit = req.query.limit || 10;
  req.query.page = req.query.page || 1;
  req.query.query = req.query.query ? { category: req.query.query } : {};
  // If limit not a number, return error.
  if (isNaN(req.query.limit)) return res.status(400).json({ status: "error", message: "Invalid limit parameter" });
  // If page not a number, return error.
  if (isNaN(req.query.page)) return res.status(400).json({ status: "error", message: "Invalid page parameter" });
  // if sort existsl, check if it's a valid value.
  if (sort) {
    const validSort = sort === "asc" || sort === "desc";
    if (!validSort) return res.status(400).json({ status: "error", message: "Invalid sort parameter" });
  }
  return next();
};
