import productService from "../services/products.services.js";

class ProductsController {
  async getProducts(req: any, res: any) {
    const limit = req.query.limit;
    const query = req.query.query;
    const sort = req.query.sort as string;
    const page = req.query.page;
    const response = await productService.getProducts(limit, query, sort, page);
    return res.status(response.code).json(response.result);
  }
  async getProduct(req: any, res: any) {
    const id = req.params.pid;
    const response = await productService.getProductById(id);
    return res.status(response.code).json(response.result);
  }
  async addProduct(req: any, res: any) {
    const product = req.body as Product;
    const response = await productService.addProduct(product);
    return res.status(response.code).json(response.result);
  }
  async deleteProduct(req: any, res: any) {
    const id = req.params.pid;
    const response = await productService.deleteProduct(id);
    return res.status(response.code).json(response.result);
  }
  async updateProduct(req: any, res: any) {
    const id = req.params.pid;
    const productAttributes = req.body as ProductKeys;
    const response = await productService.updateProduct(id, productAttributes);
    return res.status(response.code).json(response.result);
  }
}

const productsController = new ProductsController();
export default productsController;
