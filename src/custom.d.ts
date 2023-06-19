import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      readonly _id?: string;
      first_name: string;
      last_name: string;
      email: string;
      age: number;
      password: string;
      role: string;
    };
  }
}