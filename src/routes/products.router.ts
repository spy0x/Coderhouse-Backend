import { Router } from "express";
import ProductService from "../dao/products.services.js";


const productsRouter = Router();
const Service = new ProductService();

productsRouter.get("/", async (req, res) => {
  const countLimit = req.query.limit;
  const response = await Service.getProducts(countLimit);
  return res.status(response.code).json(response.result);
});

productsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const response = await Service.getProductById(id);
  return res.status(response.code).json(response.result);
});

productsRouter.post("/", async (req, res) => {
  const product = req.body as Product;
  const response = await Service.addProduct(product);
  return res.status(response.code).json(response.result);
});

productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const response = await Service.deleteProduct(id);
  return res.status(response.code).json(response.result);
});

productsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productAttributes = req.body as ProductKeys;
  const response = await Service.updateProduct(id, productAttributes);
  return res.status(response.code).json(response.result);
});

export default productsRouter;
