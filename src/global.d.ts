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

type ProductKeys = Partial<Omit<Product, "id">>;

type ProductIdOnly = {
  idProduct: string;
  quantity: number;
}

type Cart = {
  readonly _id?: string;
  productos: ProductIdOnly[];
}

type Result = {
  status: string;
  message?: string;
  payload?: any;
}

type ResResult = {
  code: number;
  result: Result;
}

type Post = {
  readonly _id?: string;
  username: string;
  message: string;
}

type QueryOptions = {
  limit?: number;
  page?: number;
  sort?: SortQuery;
  category?: string;
};

type SortQuery = {
  price: string;
}