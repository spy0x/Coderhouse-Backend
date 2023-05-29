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
  idProduct: number;
  quantity: number;
}

type Cart = {
  idCarrito: number;
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