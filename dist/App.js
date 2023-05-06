import express from "express";
import ProductManager from "./ProductManager.js";
import cartRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
const PORT = 8080;
const app = express();
export const productManager = new ProductManager("data.json");
startServer();
async function startServer() {
    await productManager.loadData();
    app.use('/static', express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/carts", cartRouter);
    app.use("/products", productsRouter);
    app.get("*", (req, res, next) => {
        res.status(404).json({ status: 404, message: "Page Not found" });
    });
    app.listen(PORT, () => {
        console.log("Server http://localhost/ is running on port " + PORT);
    });
}
