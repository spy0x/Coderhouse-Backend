import { ProductModel } from "../dao/mongo/models/products.models.js";

class ProductService {
  async addProduct(product: Product): Promise<ResResult> {
    try {
      // If no thumbnail, set default value to empty array
      if (!product.thumbnail) product.thumbnail = [];
      // if no status, set default value to true
      if (!product.status) product.status = true;
      // Add product
      await ProductModel.create(product);
      return { code: 201, result: { status: "success", message: "Product added successfully", payload: product } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error adding product" } };
    }
  }

  async getProductById(pid: string) {
    try {
      const product = await ProductModel.findById(pid);
      return { code: 200, result: { status: "success", payload: product } };
    } catch (error) {
      return { code: 404, result: { status: "error", message: "Couldn't get product" } };
    }
  }

  async getProducts(limit: any = 10, query: any = null, sort: any = null, pag: any = 1): Promise<ResResult> {
    try {
      const options: QueryOptions = { limit, page: pag, lean: true, leanWithId: false };
      // if sort exists, add it to options
      if (sort) options.sort = { price: sort };
      const products = await ProductModel.paginate(query, options);
      // if products array is empty, return error
      if (products.docs.length === 0) {
        return { code: 404, result: { status: "error", message: "No products found." } };
      }
      // Get pagination info into variables.
      const { docs, totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage } = products;
      // Setting Next and Prev page urls
      const queryStr = Object.keys(query).length === 0 ? "" : `&query=${query}`;
      const sortStr = sort ? `&sort=${sort}` : "";
      const prevPageUrl = hasPrevPage && `/products?page=${prevPage}&limit=${limit}${queryStr}${sortStr}`;
      const nextPageUrl = hasNextPage && `/products?page=${nextPage}&limit=${limit}${queryStr}${sortStr}`;
      // Setting result object and returning it
      const result = { totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage, prevPageUrl, nextPageUrl };
      return { code: 200, result: { status: "success", payload: docs, ...result } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error getting products" } };
    }
  }

  async updateProduct(pid: string, productAttributes: ProductKeys): Promise<ResResult> {
    try {
      await ProductModel.updateOne({ _id: pid }, productAttributes);
      return {
        code: 200,
        result: {
          status: "success",
          message: "Product updated successfully",
          payload: await ProductModel.findOne({ _id: pid }),
        },
      };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error updating product" } };
    }
  }

  async deleteProduct(pid: string): Promise<ResResult> {
    try {
      const product = await ProductModel.find({ _id: pid });
      await ProductModel.deleteOne({ _id: pid });
      return {
        code: 200,
        result: { status: "success", message: "Product deleted successfully", payload: product },
      };
    } catch {
      return { code: 400, result: { status: "error", message: "Error deleting product" } };
    }
  }

  async productExists(pid: string) {
    try {
      return await ProductModel.exists({ _id: pid });
    } catch {
      return false;
    }
  }
}

const productService = new ProductService();
export default productService;
