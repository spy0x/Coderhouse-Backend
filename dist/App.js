import express from "express";
import { connectMongo, initSocket } from "./utils.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
const PORT = 8080;
const app = express();
connectMongo();
startServer();
async function startServer() {
    // await productManager.loadData();
    // await cartManager.loadData();
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
    // SETTING SERVER
    const httpServer = app.listen(PORT, () => {
        console.log("Server http://localhost/ is running on port " + PORT);
    });
    // WEBSOCKET CONNECTION
    initSocket(httpServer);
}
