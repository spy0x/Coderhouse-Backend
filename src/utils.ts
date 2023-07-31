// DB CONNECTION //

import { Server } from "socket.io";

// MULTER CONFIG //
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productService from "./services/products.services.js";
import messageService from "./services/messages.services.js";

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
    const { result } = await productService.getProducts();
    socket.emit("getProducts", result);
    socket.emit("getMessages", await messageService.getAllMessages());

    // WEBSOCKET DELETE PRODUCT EVENT
    socket.on("deleteProduct", async (id) => {
      await productService.deleteProduct(id);
      // BROADCAST UPDATE TO ALL CLIENTS
      const { result } = await productService.getProducts();
      socketServer.emit("getProducts", result);
    });
    // WEBSOCKET ADD PRODUCT EVENT
    socket.on("addProduct", async (product) => {
      await productService.addProduct(product);
      // BROADCAST UPDATE TO ALL CLIENTS
      const { result } = await productService.getProducts();
      socketServer.emit("getProducts", result);
    });
    socket.on("addMessage", async (message) => {
      await messageService.addMessage(message);
      // BROADCAST UPDATE TO ALL CLIENTS
      socketServer.emit("getMessages", await messageService.getAllMessages());
    });
  });
}
