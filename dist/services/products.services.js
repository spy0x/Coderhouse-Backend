import productsDao from "../DAO/mongo/classes/products.dao.js";
class ProductService {
    async addProduct(product) {
        try {
            // If no thumbnail, set default value to empty array
            if (!product.thumbnail)
                product.thumbnail = [];
            // if no status, set default value to true
            if (!product.status)
                product.status = true;
            // Add product
            await productsDao.createProduct(product);
            return { code: 201, result: { status: "success", message: "Product added successfully", payload: product } };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error adding product" } };
        }
    }
    async getProductById(pid) {
        try {
            const product = await productsDao.findProduct(pid);
            return { code: 200, result: { status: "success", payload: product } };
        }
        catch (error) {
            return { code: 404, result: { status: "error", message: "Couldn't get product" } };
        }
    }
    async getProducts(limit = 10, query = "", sort = null, pag = 1) {
        try {
            const products = await productsDao.getProducts(limit, query, sort, pag);
            // if products array is empty, return error
            if (products.docs.length === 0) {
                return { code: 404, result: { status: "error", message: "No products found." } };
            }
            // Get pagination info into variables.
            const { docs, totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage } = products;
            // Setting Next and Prev page urls
            const queryStr = query ? `&query=${query}` : "";
            const sortStr = sort ? `&sort=${sort}` : "";
            const prevPageUrl = hasPrevPage && `/products?page=${prevPage}&limit=${limit}${queryStr}${sortStr}`;
            const nextPageUrl = hasNextPage && `/products?page=${nextPage}&limit=${limit}${queryStr}${sortStr}`;
            // Setting result object and returning it
            const result = { totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage, prevPageUrl, nextPageUrl };
            return { code: 200, result: { status: "success", payload: docs, ...result } };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error getting products" } };
        }
    }
    async updateProduct(pid, productAttributes) {
        try {
            await productsDao.updateProduct(pid, productAttributes);
            return {
                code: 200,
                result: {
                    status: "success",
                    message: "Product updated successfully",
                    payload: await productsDao.findProduct(pid),
                },
            };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error updating product" } };
        }
    }
    async deleteProduct(pid) {
        try {
            const product = await productsDao.findProduct(pid);
            await productsDao.deleteProduct(pid);
            return {
                code: 200,
                result: { status: "success", message: "Product deleted successfully", payload: product },
            };
        }
        catch {
            return { code: 400, result: { status: "error", message: "Error deleting product" } };
        }
    }
    async productExists(pid) {
        try {
            return await productsDao.productExists(pid);
        }
        catch {
            return false;
        }
    }
}
const productService = new ProductService();
export default productService;
