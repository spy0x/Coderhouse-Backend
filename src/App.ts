import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { factoryStore, initFactory } from "./DAO/factory.js";
import initPassport from "./config/passport.config.js";
import errorHandler from "./middlewares/errorHandler.js";
import cartsRouter from "./routes/carts.router.js";
import mockingRouter from "./routes/mocking.router.js";
import productsRouter from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import { initSocket } from "./utils.js";
import path from "path";
import { __dirname } from "./utils.js";

// loading .env file for environment variables
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
// setting DAO System
initFactory();
// starting server
startServer();

async function startServer() {
  // await productManager.loadData();
  // await cartManager.loadData();
  // SETTING HANDLEBARS
  app.engine("handlebars", handlebars.engine());
  app.set("views", "src/views");
  app.set("view engine", "handlebars");
  // SETTING MIDDLEWARES
  app.use(compression());
  app.use("/static", express.static("src/public"));
  app.use(express.static(path.join(__dirname, "frontend_react")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(
    session({
      ...factoryStore,
      secret: process.env.SESSION_SECRET as string,
      resave: true,
      saveUninitialized: true,
    })
  );
  initPassport();
  app.use(passport.initialize());
  app.use(passport.session());

  // SETTING ROUTES
  app.use("/api/carts", cartsRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/sessions", sessionsRouter);
  app.use("/", mockingRouter);
  app.use("/", viewsRouter);
  // SETTING ERROR HANDLER
  app.use(errorHandler);
  // SETTING SERVER
  const httpServer = app.listen(PORT, () => {
    if (process.env.NODE_ENV === "DEVELOPMENT") console.log("Server running AT: http://localhost:" + PORT);
  });
  // WEBSOCKET CONNECTION
  initSocket(httpServer);
}
