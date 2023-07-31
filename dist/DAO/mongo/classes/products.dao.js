import { ProductModel } from "../models/products.models.js";
class ProductsDao {
    async createProduct(product) {
        await ProductModel.create(product);
    }
    async findProduct(pid) {
        return await ProductModel.findById(pid);
    }
    async getProducts(limit = 10, query = {}, sort = "", pag = 1) {
        const options = { limit, page: pag, lean: true, leanWithId: false };
        // if sort exists, add it to options
        if (sort)
            options.sort = { price: sort };
        return await ProductModel.paginate(query, options);
    }
    async updateProduct(pid, productAttributes) {
        await ProductModel.updateOne({ _id: pid }, productAttributes);
    }
    async deleteProduct(pid) {
        await ProductModel.deleteOne({ _id: pid });
    }
    async productExists(pid) {
        return await ProductModel.exists({ _id: pid });
    }
}
const productsDao = new ProductsDao();
export default productsDao;
