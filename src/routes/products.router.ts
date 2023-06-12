import { Router } from "express";
import ProductService from "../services/products.services.js";
import { productExists } from "../middlewares/productsMiddlewares.js";

const productsRouter = Router();
const Service = new ProductService();

productsRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  const filter = req.query.query;
  const sorted = req.query.sort as string;
  const page = req.query.page;
  const response = await Service.getProducts(limit, filter, sorted, page);
  return res.status(response.code).json(response.result);
});

productsRouter.get("/:pid", productExists, async (req, res) => {
  const id = req.params.pid;
  const response = await Service.getProductById(id);
  return res.status(response.code).json(response.result);
});

productsRouter.post("/", async (req, res) => {
  const product = req.body as Product;
  const response = await Service.addProduct(product);
  return res.status(response.code).json(response.result);
});

productsRouter.delete("/:pid", productExists, async (req, res) => {
  const id = req.params.pid;
  const response = await Service.deleteProduct(id);
  return res.status(response.code).json(response.result);
});

productsRouter.put("/:pid", productExists, async (req, res) => {
  const id = req.params.pid;
  const productAttributes = req.body as ProductKeys;
  const response = await Service.updateProduct(id, productAttributes);
  return res.status(response.code).json(response.result);
});

export default productsRouter;
