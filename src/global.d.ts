
type PassRecoveryTicket = {
  readonly _id: string | ObjectTypes.ObjectId;
  email: string;
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
  owner?: string;
  status?: boolean;
};

type ProductKeys = Partial<Omit<Product, "id">>;

type ProductIdOnly = {
  idProduct: string;
  quantity: number;
};

type Cart = {
  readonly _id?: string;
  productos: ProductIdOnly[];
};

type Cookie = {
  name: string;
  value: string;
};

interface Result {
  status: string;
  message?: string;
  payload?: any;
  code?: number;
}

type ResResult = {
  code: number;
  result: Result | PaginateResult;
};

type Post = {
  readonly _id?: string;
  username: string;
  message: string;
};

type QueryOptions = {
  limit?: number;
  page?: number;
  sort?: SortQuery;
  category?: string;
  lean?: boolean;
  leanWithId?: boolean;
};

type SortQuery = {
  price: string;
};
interface PaginateResult extends Result {
  docs: Array<Product>;
  totalPages: number;
  prevPage: number;
  nextPage: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  prevPageUrl: string;
  nextPageUrl: string;
}

type User = {
  readonly _id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  age?: number;
  password?: string;
  role?: string;
  cartId?: string;
};

type ErrorCustom = {
  name: string;
  cause: string;
  message: string;
  code: number;
  status: number;
};

