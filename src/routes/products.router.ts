import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { productExists, productValid, productsValidQueries } from "../middlewares/productsMiddlewares.js";
import { isAdmin, isAdminOrPremium, isProductOwner } from "../middlewares/auth.js";

const productsRouter = Router();
export default productsRouter;

productsRouter.get("/", productsValidQueries, productsController.getProducts);

productsRouter.get("/:pid", productExists, productsController.getProduct);

productsRouter.post("/", isAdminOrPremium, productValid, productsController.addProduct);

productsRouter.delete("/:pid", isAdminOrPremium, productExists, isProductOwner, productsController.deleteProduct);

productsRouter.put("/:pid", isAdmin, productExists, productsController.updateProduct);

