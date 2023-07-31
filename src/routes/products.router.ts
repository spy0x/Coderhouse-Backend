import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { productExists, productValid, productsValidQueries } from "../middlewares/productsMiddlewares.js";
import { isAdmin } from "../middlewares/auth.js";

const productsRouter = Router();
export default productsRouter;

productsRouter.get("/", productsValidQueries, productsController.getProducts);

productsRouter.get("/:pid", productExists, productsController.getProduct);

productsRouter.post("/", isAdmin, productValid, productsController.addProduct);

productsRouter.delete("/:pid", isAdmin, productExists, productsController.deleteProduct);

productsRouter.put("/:pid", isAdmin, productExists, productsController.updateProduct);
