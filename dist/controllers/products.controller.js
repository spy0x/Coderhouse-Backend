import productService from "../services/products.services.js";
class ProductsController {
    async getProducts(req, res) {
        const limit = req.query.limit;
        const filter = req.query.query;
        const sorted = req.query.sort;
        const page = req.query.page;
        const response = await productService.getProducts(limit, filter, sorted, page);
        return res.status(response.code).json(response.result);
    }
    async getProduct(req, res) {
        const id = req.params.pid;
        const response = await productService.getProductById(id);
        return res.status(response.code).json(response.result);
    }
    async addProduct(req, res) {
        const product = req.body;
        const response = await productService.addProduct(product);
        return res.status(response.code).json(response.result);
    }
    async deleteProduct(req, res) {
        const id = req.params.pid;
        const response = await productService.deleteProduct(id);
        return res.status(response.code).json(response.result);
    }
    async updateProduct(req, res) {
        const id = req.params.pid;
        const productAttributes = req.body;
        const response = await productService.updateProduct(id, productAttributes);
        return res.status(response.code).json(response.result);
    }
}
const productsController = new ProductsController();
export default productsController;
