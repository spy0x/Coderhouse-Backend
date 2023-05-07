type Product = {
  readonly id?: number;
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
