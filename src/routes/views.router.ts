import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { isUser } from "../middlewares/auth.js";
import { cartExists } from "../middlewares/cartsMiddlewares.js";
import { productsValidQueries } from "../middlewares/productsMiddlewares.js";

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

