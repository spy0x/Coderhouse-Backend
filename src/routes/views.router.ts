import { Router } from "express";
import ProductService from "../dao/products.services.js";

const viewsRouter = Router();
const Service = new ProductService();

viewsRouter.get("/", async (req, res) => {
  const { result } = await Service.getProducts();
  res.render("index", result);
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

viewsRouter.get("/chat", (req, res) => {
  res.render("chat");
});

viewsRouter.get("*", (req, res) => {
  const error = {
    status: "ERROR 404",
    message: "Page Not found",
  };
  res.render("error", error);
});

export default viewsRouter;
