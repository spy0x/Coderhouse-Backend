import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
const PORT = 8080;
const app = express();
export const productManager = new ProductManager("productos.json");
export const cartManager = new CartManager("carrito.json");
startServer();
async function startServer() {
    await productManager.loadData();
    await cartManager.loadData();
    app.use('/static', express.static("src/public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/carts", cartsRouter);
    app.use("/api/products", productsRouter);
    app.get("*", (req, res, next) => {
        res.status(404).json({ status: 404, message: "Page Not found" });
    });
    app.listen(PORT, () => {
        console.log("Server http://localhost/ is running on port " + PORT);
    });
}
