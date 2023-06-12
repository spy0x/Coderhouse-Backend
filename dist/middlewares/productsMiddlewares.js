import { ProductModel } from "../models/products.models.js";
import { CartModel } from "../models/carts.models.js";
import mongoose from "mongoose";
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
export const cartExists = async (req, res, next) => {
    const id = req.params.cid;
    // Check if cart exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: "error", message: "Cart not found" });
    }
    const cart = await CartModel.findById(id);
    if (!cart) {
        return res.status(404).json({ status: "error", message: "Cart not found" });
    }
    next();
};
