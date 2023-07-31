import { ProductModel } from "../models/products.models.js";

class ProductsDao {
  async createProduct(product: Product) {
    await ProductModel.create(product);
  }
  async findProduct(pid: string) {
    return await ProductModel.findById(pid);
  }
  async getProducts(limit: number = 10, query: object = {}, sort: string = "", pag: number = 1) {
    const options: QueryOptions = { limit, page: pag, lean: true, leanWithId: false };
    // if sort exists, add it to options
    if (sort) options.sort = { price: sort };
    return await ProductModel.paginate(query, options);
  }
  async updateProduct(pid: string, productAttributes: ProductKeys) {
    await ProductModel.updateOne({ _id: pid }, productAttributes);
  }
  async deleteProduct(pid: string) {
    await ProductModel.deleteOne({ _id: pid });
  }
  async productExists(pid: string) {
    return await ProductModel.exists({ _id: pid });
  }
}
const productsDao = new ProductsDao();
export default productsDao;
