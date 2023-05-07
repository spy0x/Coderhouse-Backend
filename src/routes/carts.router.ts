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

export default cartsRouter;