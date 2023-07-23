import { Router } from "express";
import productService from "../services/products.services.js";
import cartService from "../services/carts.services.js";
import { cartExists } from "../middlewares/cartsMiddlewares.js";
import { productsValidQueries } from "../middlewares/productsMiddlewares.js";
import { isUser, isAdmin } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const viewsRouter = Router();
export default viewsRouter;


viewsRouter.get("/", viewsController.index);

viewsRouter.get("/products", productsValidQueries, viewsController.products);

viewsRouter.get("/carts/:cid", isUser, cartExists, viewsController.cart);

viewsRouter.get("*", viewsController.error);

// viewsRouter.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts");
// });

// viewsRouter.get("/chat", (req, res) => {
//   res.render("chat");
// });

