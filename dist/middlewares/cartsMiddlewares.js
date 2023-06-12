import { CartModel } from "../models/carts.models.js";
import mongoose from "mongoose";
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
    req.cart = cart;
    next();
};
export const productInCart = async (req, res, next) => {
    const productID = req.params.pid;
    const cart = req.cart;
    // Check if product is in cart
    const productInCartIndex = cart.productos.findIndex((product) => product.idProduct.toString() === productID);
    if (productInCartIndex === -1) {
        return res.status(404).json({ status: "error", message: "Product not found in cart" });
    }
    next();
};
