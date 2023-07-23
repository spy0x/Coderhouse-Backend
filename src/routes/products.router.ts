import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { productExists, productValid, productsValidQueries } from "../middlewares/productsMiddlewares.js";

const productsRouter = Router();

productsRouter.get("/", productsValidQueries, productsController.getProducts);

productsRouter.get("/:pid", productExists, productsController.getProduct);

productsRouter.post("/", productValid, productsController.addProduct);

productsRouter.delete("/:pid", productExists, productsController.deleteProduct);

productsRouter.put("/:pid", productExists, productsController.updateProduct);

export default productsRouter;
