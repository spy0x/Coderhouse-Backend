import { Router } from "express";
import { productManager } from "../App.js";
const productsRouter = Router();
productsRouter.get("/", async (req, res) => {
    const countLimit = parseInt(req.query.limit);
    const response = await productManager.getProducts(countLimit);
    return res.status(response.code).json(response.result);
});
productsRouter.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const response = await productManager.getProductById(id);
    return res.status(response.code).json(response.result);
});
productsRouter.post("/", async (req, res) => {
    const product = req.body;
    const response = await productManager.addProduct(product);
    return res.status(response.code).json(response.result);
});
productsRouter.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const response = await productManager.deleteProduct(id);
    return res.status(response.code).json(response.result);
});
productsRouter.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = req.body;
    const response = await productManager.updateProduct(id, product);
    return res.status(response.code).json(response.result);
});
export default productsRouter;
