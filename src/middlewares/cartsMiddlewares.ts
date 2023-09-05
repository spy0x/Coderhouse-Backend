import { CartModel } from "../DAO/mongo/models/carts.models.js";
import mongoose from "mongoose";
import { Response, Request, NextFunction } from "express";
import { productsDao } from "../DAO/factory.js";

export const cartExists = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.cid;
    // Check if cart exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }
    const cart = await CartModel.findById(id) as Cart;
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }
    req.cart = cart;
    return next();
  }

export const productInCart = async (req: Request, res: Response, next: NextFunction) => {
    const productID = req.params.pid;
    const cart = req.cart;
    // Check if product is in cart
    const productInCartIndex = cart.productos.findIndex((product) => product.idProduct.toString() === productID);
    if (productInCartIndex === -1) {
        return res.status(404).json({ status: "error", message: "Product not found in cart" });
    }
    return next();
}

export const notProductOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.user?.role === "admin") return next();
    const productID = req.params.pid;
    const product = await productsDao.findProduct(productID);
    if (product?.owner != req.session?.user?._id) {
      return next();
    }
    // return "Cant add your own product to cart"
    return res.status(403).json({ status: "error", message: "You can't add your own product!" });
  } catch (error) {
    next(error);
  }
};