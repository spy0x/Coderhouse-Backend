import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      readonly _id?: ObjectId;
      first_name: string;
      last_name: string;
      email: string;
      age: number;
      password?: string;
      role: string;
      cartId: string;
    },
  }
}

declare global {
  namespace Express {
    interface User {
      readonly _id?: ObjectId;
      first_name: string;
      last_name: string;
      email: string;
      age: number;
      password: string;
      role: string;
      cartId: ObjectId;
    }
  }
}