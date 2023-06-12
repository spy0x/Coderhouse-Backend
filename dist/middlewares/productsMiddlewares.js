import { ProductModel } from "../models/products.models.js";
import mongoose from "mongoose";
import ProductService from "../services/products.services.js";
const productService = new ProductService();
export const productExists = async (req, res, next) => {
    const id = req.params.pid;
    // Check if product exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: "error", message: "Product not found" });
    }
    const product = await ProductModel.findById(id);
    if (!product) {
        return res.status(404).json({ status: "error", message: "Product not found" });
    }
    next();
};
export const productValidParams = async (req, res, next) => {
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
    next();
};
export const productValid = async (req, res, next) => {
    const product = req.body;
    // Check if product already exists
    if (await ProductModel.findOne({ code: product.code })) {
        return res.status(400).json({ status: "error", message: "Product already exists" });
    }
    // Check if product has all required properties
    if (!product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.category ||
        !product.stock) {
        return res.status(400).json({ status: "error", message: "Product is missing required properties" });
    }
    next();
};
