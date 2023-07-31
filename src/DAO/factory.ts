import MongoStore from "connect-mongo";
import { connectMongo } from "../utils/mongoConnect.js";
import { Store } from "express-session";


interface FactoryStore {
  store: Store;
}
export let factoryStore: FactoryStore;
export let cartsDao: any;
export let messagesDao: any;
export let productsDao: any;
export let usersDao: any;

export async function initFactory() {
  switch (process.env.DAO) {
    case "MONGO":
      const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
      connectMongo(MONGO_PASSWORD);
      factoryStore = {
        store: MongoStore.create({
          mongoUrl: `mongodb+srv://spy0x:${MONGO_PASSWORD}@cluster0.7hatvzm.mongodb.net/ecommerce?retryWrites=true&w=majority`,
          ttl: 1000,
        }),
      };
      const { default: MongoCarts } = await import("../DAO/mongo/classes/carts.dao.js");
      const { default: MongoMessages } = await import("../DAO/mongo/classes/messages.dao.js");
      const { default: MongoProducts } = await import("../DAO/mongo/classes/products.dao.js");
      const { default: MongoUsers } = await import("../DAO/mongo/classes/users.dao.js");
      cartsDao = MongoCarts;
      messagesDao = MongoMessages;
      productsDao = MongoProducts;
      usersDao = MongoUsers;
  }
}
//FOR FILESYSTEM
// import filesStore from "session-file-store";
// const FileStoreSession = filesStore(session);