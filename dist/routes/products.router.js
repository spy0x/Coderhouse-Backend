import { Router } from "express";
import { products } from "../App.js";
const productsRouter = Router();
productsRouter.get("/", (req, res) => {
    const countLimit = req.query.limit;
    // if countLimit exists, convert it to number, and list products with the specified limit. Else, list all products.
    if (countLimit) {
        const limit = parseInt(countLimit);
        const result = products.slice(0, limit);
        return res.json(result);
    }
    else {
        return res.json(products);
    }
});
productsRouter.get("/:pid", (req, res) => {
    const id = parseInt(req.params.pid);
    let product = undefined;
    if (typeof products === "object") {
        product = products.find((item) => item.id === id);
    }
    const result = product ? product : "Product not found";
    res.json(result);
});
export default productsRouter;
