import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
// import filesStore from "session-file-store";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import { connectMongo, initSocket } from "./utils.js";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import dotenv from "dotenv";
import cors from "cors";
// loading .env file for environment variables
dotenv.config();
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const PORT = 8080;
const app = express();
// const FileStoreSession = filesStore(session);
connectMongo(MONGO_PASSWORD);
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
    app.use(cors());
    app.use(cookieParser());
    app.use(session({
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://spy0x:${MONGO_PASSWORD}@cluster0.7hatvzm.mongodb.net/ecommerce?retryWrites=true&w=majority`,
            ttl: 1000,
        }),
        secret: "$NhPb39oFn&CdY",
        resave: true,
        saveUninitialized: true,
    }));
    initPassport();
    app.use(passport.initialize());
    app.use(passport.session());
    // SETTING ROUTES
    app.use("/api/carts", cartsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/sessions", sessionsRouter);
    app.use("/", viewsRouter);
    // SETTING SERVER
    const httpServer = app.listen(PORT, () => {
        console.log("Server http://localhost/ is running on port " + PORT);
    });
    // WEBSOCKET CONNECTION
    initSocket(httpServer);
}
