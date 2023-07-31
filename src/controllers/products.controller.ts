import productService from "../services/products.services.js";
import { Request, Response } from "express";

class ProductsController {
  async getProducts(req: any, res: Response) {
    const limit = req.query.limit;
    const query = req.query.query;
    const sort = req.query.sort as string;
    const page = req.query.page;
    const response = await productService.getProducts(limit, query, sort, page);
    return res.status(response.code).json(response.result);
  }
  async getProduct(req: Request, res: Response) {
    const id = req.params.pid;
    const response = await productService.getProductById(id);
    return res.status(response.code).json(response.result);
  }
  async addProduct(req: Request, res: Response) {
    const product = req.body as Product;
    const response = await productService.addProduct(product);
    return res.status(response.code).json(response.result);
  }
  async deleteProduct(req: Request, res: Response) {
    const id = req.params.pid;
    const response = await productService.deleteProduct(id);
    return res.status(response.code).json(response.result);
  }
  async updateProduct(req: Request, res: Response) {
    const id = req.params.pid;
    const productAttributes = req.body as ProductKeys;
    const response = await productService.updateProduct(id, productAttributes);
    return res.status(response.code).json(response.result);
  }
}

const productsController = new ProductsController();
export default productsController;
