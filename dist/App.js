import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
const PORT = 8080;
const app = express();
export const productManager = new ProductManager("productos.json");
export const cartManager = new CartManager("carrito.json");
startServer();
async function startServer() {
    await productManager.loadData();
    await cartManager.loadData();
    // SETTING HANDLEBARS
    app.engine("handlebars", handlebars.engine());
    app.set("views", "src/views");
    app.set("view engine", "handlebars");
    // SETTING MIDDLEWARES
    app.use("/static", express.static("src/public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // SETTING ROUTES
    app.use("/api/carts", cartsRouter);
    app.use("/api/products", productsRouter);
    app.use("/", viewsRouter);
    // STARTING SERVER
    const httpServer = app.listen(PORT, () => {
        console.log("Server http://localhost/ is running on port " + PORT);
    });
    //WEBSOCKET CONNECTION
    const socketServer = new Server(httpServer);
    socketServer.on("connection", (socket) => {
        console.log(`New client ${socket.id} connected`);
        const { result } = productManager.getProducts(null);
        socket.emit("getProducts", result);
        // socket.on("getProducts", (data) => {
        //   console.log(data);
        // });
    });
}
