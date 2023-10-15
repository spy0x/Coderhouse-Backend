import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { cartExists, notProductOwner, productInCart, productNotInCart } from "../middlewares/cartsMiddlewares.js";
import { productExists, productNotPurchased, productValidParams } from "../middlewares/productsMiddlewares.js";
import { isCartOwner } from "../middlewares/auth.js";

const cartsRouter = Router();
export default cartsRouter;

cartsRouter.post("/", cartsController.addCart);

cartsRouter.get("/:cid", cartExists, isCartOwner, cartsController.getCartProducts);

cartsRouter.put("/:cid", cartExists, productValidParams, isCartOwner, cartsController.updateCartProducts);

cartsRouter.delete("/:cid", cartExists, isCartOwner, cartsController.clearCart);

cartsRouter.put("/:cid/product/:pid", cartExists, productExists, productInCart, isCartOwner, cartsController.updateCartProductQuantity);

cartsRouter.post("/:cid/product/:pid", cartExists, productExists, isCartOwner, notProductOwner, productNotInCart, productNotPurchased, cartsController.addCartProduct );

cartsRouter.delete("/:cid/product/:pid", cartExists, productExists, productInCart, cartsController.deleteCartProduct);

cartsRouter.post("/:cid/purchase", cartExists, isCartOwner, cartsController.purchase)
