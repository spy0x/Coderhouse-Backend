import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { cartExists, productInCart } from "../middlewares/cartsMiddlewares.js";
import { productExists, productValidParams } from "../middlewares/productsMiddlewares.js";
import { isCartOwner } from "../middlewares/auth.js";

const cartsRouter = Router();
export default cartsRouter;

cartsRouter.post("/", cartsController.addCart);

cartsRouter.get("/:cid", cartExists, cartsController.getCartProducts);

cartsRouter.put("/:cid", cartExists, productValidParams, cartsController.updateCartProducts);

cartsRouter.delete("/:cid", cartExists, cartsController.clearCart);

cartsRouter.put("/:cid/product/:pid", cartExists, productExists, productInCart, cartsController.updateCartProductQuantity);

cartsRouter.post("/:cid/product/:pid", cartExists, productExists, isCartOwner, cartsController.addCartProduct );

cartsRouter.delete("/:cid/product/:pid", cartExists, productExists, productInCart, cartsController.deleteCartProduct);
