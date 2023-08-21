type ErrorMessage = {
  status: string;
  message: string;
}

type UserForm = {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
};

type Product = {
  readonly _id?: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string[];
  code: string;
  stock: number;
  category: string;
  status?: boolean;
};

type Products = {
  idProduct: Product
  quantity: number;
};

type Cart = {
  readonly _id?: string;
  productos: Products[];
};

type User = {
  readonly _id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  age?: number;
  password?: string;
  role?: string;
  cartId: Cart;
};

type UserContextType = {
  currentUser: User | undefined;
  isLoading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  updateCurrentUser: () => void;
};

type Page = {
  name: string;
  url: string;
}

type ProductsQuery = {
  status: string;
  payload: Array<Product>;
  totalPages: number;
  prevPage: number;
  nextPage: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  prevPageUrl: string;
  nextPageUrl: string;
}