import { Router } from "express";
import { productManager } from "../App.js";
const viewsRouter = Router();
viewsRouter.get("/", (req, res) => {
    const { result } = productManager.getProducts(null);
    res.render("index", result);
});
viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});
viewsRouter.get("*", (req, res, next) => {
    const error = {
        status: "ERROR 404",
        message: "Page Not found",
    };
    res.render("error", error);
});
export default viewsRouter;
