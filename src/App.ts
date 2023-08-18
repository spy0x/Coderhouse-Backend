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
import loggerMiddleware from "./middlewares/logger.middleware.js";
import cartsRouter from "./routes/carts.router.js";
import mockingRouter from "./routes/mocking.router.js";
import productsRouter from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import loggerRouter from "./routes/logger.router.js";
import { initSocket } from "./utils.js";
import path from "path";
import { __dirname } from "./utils.js";
import { initLogger, logger } from "./utils/logger.js";

// loading .env file for environment variables
dotenv.config();
// setting Logger System
initLogger();
const PORT = process.env.PORT || 8080;
export const API_URL = process.env.NODE_ENV === "PRODUCTION" ? process.env.PROD_URL : `http://localhost:${PORT}`;
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
  app.use(loggerMiddleware);
  app.use(compression());
  app.use("/static", express.static("src/public"));
  app.use(express.static(path.join(__dirname, "frontend_react")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const allowedOrigins = [ API_URL as string, "http://localhost:3000"];
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true, // Allow cookies to be sent with requests
    })
  );
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
  app.use("/loggerTest", loggerRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/sessions", sessionsRouter);
  app.use("/mockingproducts", mockingRouter);
  app.use("/", viewsRouter);
  // SETTING ERROR HANDLER
  app.use(errorHandler);
  // SETTING SERVER
  logger.debug("Starting NodeJS Express Server...");
  const httpServer = app.listen(PORT, () => {
    logger.info(`Server running AT: ${API_URL}`);
  });
  // WEBSOCKET CONNECTION
  initSocket(httpServer);
}
