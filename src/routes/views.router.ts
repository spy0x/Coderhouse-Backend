import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { isLogged, isAdmin, isUser } from "../middlewares/auth.js";
import { cartExists } from "../middlewares/cartsMiddlewares.js";
import { productsValidQueries } from "../middlewares/productsMiddlewares.js";
import { __dirname } from "../utils.js";
import path from "path";

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
viewsRouter.get("/react_test", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend_react/index.html"));
});
viewsRouter.get("*", viewsController.error);



