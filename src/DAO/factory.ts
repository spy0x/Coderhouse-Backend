import MongoStore from "connect-mongo";
import { connectMongo } from "../utils/mongoConnect.js";
import { Store } from "express-session";
import { Types } from "mongoose";


interface FactoryStore {
  store: Store;
}

interface UserDAOInterface {
  getUser: (id: string) => Promise<User>;
}
interface ProductDAOInterface {
  createProduct: (product: Product) => Promise<void>;
  findProduct: (pid: string) => Promise<Product>;
  getProducts: (limit: number, query: object, sort: string, pag: number) => Promise<any>;
  updateProduct: (pid: string, productAttributes: ProductKeys) => Promise<void>;
  deleteProduct: (pid: string) => Promise<void>;
  productExists: (pid: string)  => Promise<{_id: Types.ObjectId;} | null>
}

interface CartsDAO {
  createCart: () => Promise<any>;
  updateCart: (cartID: string, cart: Cart) => Promise<void>;
  findCart: (id: string) => Promise<Cart>;
  findCartFull: (id: string) => Promise<Cart>;
}

interface TicketsDAO {
  createTicket: (purchase: string, totalAmount: number) => Promise<any>;
}

export let factoryStore: FactoryStore;
export let cartsDao: CartsDAO;
export let messagesDao: any;
export let productsDao: ProductDAOInterface;
export let usersDao: UserDAOInterface;
export let ticketsDao: TicketsDAO;

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