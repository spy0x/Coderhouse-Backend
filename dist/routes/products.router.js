import { Router } from "express";
import ProductService from "../services/products.services.js";
const productsRouter = Router();
const Service = new ProductService();
productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit;
    const filter = req.query.query;
    const sorted = req.query.sort;
    const page = req.query.page;
    const response = await Service.getProducts(limit, filter, sorted, page);
    return res.status(response.code).json(response.result);
});
productsRouter.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const response = await Service.getProductById(id);
    return res.status(response.code).json(response.result);
});
productsRouter.post("/", async (req, res) => {
    const product = req.body;
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
    const productAttributes = req.body;
    const response = await Service.updateProduct(id, productAttributes);
    return res.status(response.code).json(response.result);
});
export default productsRouter;
