// DB CONNECTION //
import { connect } from "mongoose";
import { productManager } from "./App.js";
import { Server } from "socket.io";

export const DB_URL =
  "mongodb+srv://spy0x:%254y%5EWqkJ%26%264%25fA@cluster0.7hatvzm.mongodb.net/coderhouse-backend?retryWrites=true&w=majority";

export async function connectMongo() {
  try {
    await connect(DB_URL);
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}

// MULTER CONFIG //
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//WEBSOCKET CONNECTION
export function initSocket(httpServer: any) {
  const socketServer = new Server(httpServer);
  socketServer.on("connection", async (socket) => {
    console.log(`New client ${socket.id} connected`);
    const { result } = await productManager.getProducts(null);
    socket.emit("getProducts", result);

    // WEBSOCKET DELETE PRODUCT EVENT
    socket.on("deleteProduct", async (id) => {
      await productManager.deleteProduct(id);
      // BROADCAST UPDATE TO ALL CLIENTS
      const { result } = await productManager.getProducts(null);
      socketServer.emit("getProducts", result);
    });
    // WEBSOCKET ADD PRODUCT EVENT
    socket.on("addProduct", async (product) => {
      await productManager.addProduct(product);
      // BROADCAST UPDATE TO ALL CLIENTS
      const { result } = await productManager.getProducts(null);
      socketServer.emit("getProducts", result);
    });
  });
}
