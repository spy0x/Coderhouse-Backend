import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { isLogged, isAdmin, isUser } from "../middlewares/auth.js";
import { cartExists } from "../middlewares/cartsMiddlewares.js";
import { productsValidQueries } from "../middlewares/productsMiddlewares.js";


const viewsRouter = Router();
export default viewsRouter;


viewsRouter.get("/", viewsController.index);

viewsRouter.get("/products", productsValidQueries, viewsController.products);

viewsRouter.get("/carts/:cid", isLogged, cartExists, viewsController.cart);

viewsRouter.get("/chat", isUser, (req, res) => {
  res.render("chat");
});
viewsRouter.get("/realtimeproducts", isAdmin, (req, res) => {
  res.render("realTimeProducts");
});
viewsRouter.get("*", viewsController.error);



