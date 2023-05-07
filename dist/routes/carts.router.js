import { Router } from "express";
import { cartManager } from "../App.js";
const cartsRouter = Router();
cartsRouter.post("/", (req, res) => {
    cartManager.addCart(res);
});
cartsRouter.get("/:cid", (req, res) => {
    const cartID = parseInt(req.params.cid);
    const cart = cartManager.getCartProducts(res, cartID);
});
cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const cartID = parseInt(req.params.cid);
    const productID = parseInt(req.params.pid);
    cartManager.addProductToCart(res, cartID, productID);
});
export default cartsRouter;
