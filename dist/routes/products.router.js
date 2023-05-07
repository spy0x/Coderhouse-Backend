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
//add a product
productsRouter.post("/", (req, res) => {
    const product = req.body;
    productManager.addProduct(res, product);
});
// // delete a product
// productsRouter.delete("/:pid", (req, res) => {
//   const id = parseInt(req.params.pid);
//   if (isNaN(id)) {
//     return res.status(400).json({ status: "error", message: "Invalid id" });
//   }
//   if (id < 0) {
//     return res.status(400).json({ status: "error", message: "Id must be greater than 0" });
//   }
//   const product = products.find((item) => item.id === id);
//   if (product) {
//     productManager.deleteProduct(id);
//     return res.json(product);
//   } else {
//     return res.status(404).json({ status: "error", message: "Product not found" });
//   }
// });
// modify a product
// productsRouter.put("/:pid", (req, res) => {
//   const id = parseInt(req.params.pid);
//   if (isNaN(id)) {
//     return res.status(400).json({ status: "error", message: "Invalid id" });
//   }
//   if (id < 0) {
//     return res.status(400).json({ status: "error", message: "Id must be equal or greater than 0" });
//   }
//   const product = products.find((item) => item.id === id);
//   if (product) {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     if (!title || !price) {
//       return res.status(400).json({ status: "error", message: "Missing title or price" });
//     }
//     if (typeof title !== "string" || typeof price !== "number") {
//       return res.status(400).json({ status: "error", message: "Invalid title or price" });
//     }
//     product.title = title;
//     product.price = price;
//     productManager.saveProducts(products);
//     return res.json(product);
//   } else {
//     return res.status(404).json({ status: "error", message: "Product not found" });
//   }
// }
export default productsRouter;
