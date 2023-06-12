import { Router } from "express";
import CartService from "../services/carts.services.js";
import { productExists, productValidParams } from "../middlewares/productsMiddlewares.js";
import { cartExists, productInCart } from "../middlewares/cartsMiddlewares.js";
const cartsRouter = Router();
const Service = new CartService();
cartsRouter.post("/", async (req, res) => {
    const response = await Service.addCart();
    return res.status(response.code).json(response.result);
});
cartsRouter.get("/:cid", cartExists, async (req, res) => {
    const cartID = req.params.cid;
    const response = await Service.getCartProducts(cartID);
    return res.status(response.code).json(response.result);
});
cartsRouter.put("/:cid", cartExists, productValidParams, async (req, res) => {
    const cartID = req.params.cid;
    const products = req.body;
    const response = await Service.updateProductsList(cartID, products);
    return res.status(response.code).json(response.result);
});
cartsRouter.delete("/:cid", cartExists, async (req, res) => {
    const cartID = req.params.cid;
    const response = await Service.clearCart(cartID);
    return res.status(response.code).json(response.result);
});
cartsRouter.put("/:cid/product/:pid", cartExists, productExists, productInCart, async (req, res) => {
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const quantity = req.body.quantity;
    const response = await Service.updateProductQuantity(cartID, productID, quantity);
    return res.status(response.code).json(response.result);
});
cartsRouter.post("/:cid/product/:pid", cartExists, productExists, async (req, res) => {
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const response = await Service.addProductToCart(cartID, productID);
    return res.status(response.code).json(response.result);
});
cartsRouter.delete("/:cid/product/:pid", cartExists, productExists, productInCart, async (req, res) => {
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const response = await Service.deleteProductFromCart(cartID, productID);
    return res.status(response.code).json(response.result);
});
export default cartsRouter;
