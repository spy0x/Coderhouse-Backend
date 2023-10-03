import MongoStore from "connect-mongo";
import { connectMongo } from "../utils/mongoConnect.js";
export let factoryStore;
export let cartsDao;
export let messagesDao;
export let productsDao;
export let usersDao;
export let ticketsDao;
export async function initFactory() {
    switch (process.env.DAO) {
        case "MONGO":
            const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
            const MONGO_USER = process.env.MONGO_USER;
            const MONGO_URL = process.env.MONGO_URL;
            connectMongo(MONGO_USER, MONGO_PASSWORD, MONGO_URL);
            factoryStore = {
                store: MongoStore.create({
                    mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}?retryWrites=true&w=majority`,
                    ttl: 1000,
                }),
            };
            const { default: MongoCarts } = await import("../DAO/mongo/classes/carts.dao.js");
            const { default: MongoMessages } = await import("../DAO/mongo/classes/messages.dao.js");
            const { default: MongoProducts } = await import("../DAO/mongo/classes/products.dao.js");
            const { default: MongoUsers } = await import("../DAO/mongo/classes/users.dao.js");
            const { default: MongoTickets } = await import("../DAO/mongo/classes/tickets.dao.js");
            cartsDao = MongoCarts;
            messagesDao = MongoMessages;
            productsDao = MongoProducts;
            usersDao = MongoUsers;
            ticketsDao = MongoTickets;
    }
}
//FOR FILESYSTEM
// import filesStore from "session-file-store";
// const FileStoreSession = filesStore(session);
