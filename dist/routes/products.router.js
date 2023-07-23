import { Router } from "express";
import productService from "../services/products.services.js";
import { productValid, productExists, productsValidQueries } from "../middlewares/productsMiddlewares.js";
const productsRouter = Router();
productsRouter.get("/", productsValidQueries, async (req, res) => {
    const limit = req.query.limit;
    const filter = req.query.query;
    const sorted = req.query.sort;
    const page = req.query.page;
    const response = await productService.getProducts(limit, filter, sorted, page);
    return res.status(response.code).json(response.result);
});
productsRouter.get("/:pid", productExists, async (req, res) => {
    const id = req.params.pid;
    const response = await productService.getProductById(id);
    return res.status(response.code).json(response.result);
});
productsRouter.post("/", productValid, async (req, res) => {
    const product = req.body;
    const response = await productService.addProduct(product);
    return res.status(response.code).json(response.result);
});
productsRouter.delete("/:pid", productExists, async (req, res) => {
    const id = req.params.pid;
    const response = await productService.deleteProduct(id);
    return res.status(response.code).json(response.result);
});
productsRouter.put("/:pid", productExists, async (req, res) => {
    const id = req.params.pid;
    const productAttributes = req.body;
    const response = await productService.updateProduct(id, productAttributes);
    return res.status(response.code).json(response.result);
});
export default productsRouter;
