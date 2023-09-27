import { Server } from "socket.io";
import { logger } from "./utils/logger.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import messageService from "./services/messages.services.js";
import productService from "./services/products.services.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
//WEBSOCKET CONNECTION
export function initSocket(httpServer) {
    const socketServer = new Server(httpServer);
    socketServer.on("connection", async (socket) => {
        logger.info(`New client ${socket.id} connected`);
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
