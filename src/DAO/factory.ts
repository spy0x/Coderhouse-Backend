import MongoStore from "connect-mongo";
import { connectMongo } from "../utils/mongoConnect.js";
import { Store } from "express-session";
import { Types } from "mongoose";


interface FactoryStore {
  store: Store;
}

interface UserDAOInterface {
  getUser: (id: string) => Promise<User>;
  createRecoveryTicket: (email: string) => Promise<PassRecoveryTicket>;
  getRecoveryTicketByEmail: (email: string) => Promise<PassRecoveryTicket>;
  getRecoveryTicketById: (id: string) => Promise<PassRecoveryTicket>;
  deleteRecoveryTicket: (id: string) => Promise<void>;
  updatePassword: (email: string, password: string) => Promise<void>;
  updateRole: (userId: string, role: string) => Promise<void>;
  updateConnectionDate: (userId: string) => Promise<void>;
  uploadDocuments: (userId: string, files: Express.Multer.File[]) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
}
interface ProductDAOInterface {
  createProduct: (product: Product) => Promise<Product>;
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
      const MONGO_USER = process.env.MONGO_USER as string;
      const MONGO_URL = process.env.MONGO_URL as string;
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