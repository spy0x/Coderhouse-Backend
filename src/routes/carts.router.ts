import { Router } from "express";
import { cartManager } from "../App.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
    const response = await cartManager.addCart();
    return res.status(response.code).json(response.result);
  });

cartsRouter.get("/:cid", (req, res) => {
    const cartID = parseInt(req.params.cid);
    const response = cartManager.getCartProducts(cartID);
    return res.status(response.code).json(response.result);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartID = parseInt(req.params.cid);
    const productID = parseInt(req.params.pid);
    const response = await cartManager.addProductToCart(cartID, productID);
    return res.status(response.code).json(response.result);
});

export default cartsRouter;