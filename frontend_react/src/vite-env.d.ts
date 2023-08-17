/// <reference types="vite/client" />
type UserForm = {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
};

type User = {
  readonly _id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  age?: number;
  password?: string;
  role?: string;
  cartId: string;
};