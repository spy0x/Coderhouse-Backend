import { Router } from "express";
import { productManager } from "../App.js";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  const countLimit = req.query.limit;
  productManager.getProducts(res, countLimit);
});

productsRouter.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.getProductById(id, res);
});

productsRouter.post("/", (req, res) => {
  const product = req.body as Product;
  productManager.addProduct(res, product);
});

productsRouter.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.deleteProduct(res, id);
});

productsRouter.put("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = req.body as ProductKeys;
  productManager.updateProduct(res, id, product);
});

export default productsRouter;
