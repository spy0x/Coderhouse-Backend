import express from "express";
import { connectMongo, initSocket} from "./utils.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import filesStore from "session-file-store";
import MongoStore from "connect-mongo";

const PORT = 8080;
const app = express();
const FileStoreSession = filesStore(session);

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
  app.use(cookieParser())
  app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://spy0x:%254y%5EWqkJ%26%264%25fA@cluster0.7hatvzm.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 1000 }),
    secret: "$NhPb39oFn&CdY",
    resave: true,
    saveUninitialized: true,
  }));
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
