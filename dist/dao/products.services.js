import { ProductModel } from "../dao/models/products.models.js";
export default class ProductService {
    async addProduct(product) {
        try {
            // Check if product already exists
            if (await ProductModel.findOne({ code: product.code })) {
                return { code: 400, result: { status: "error", message: "Product already exists" } };
            }
            // Check if product has all required properties
            if (!product.title ||
                !product.description ||
                !product.price ||
                !product.code ||
                !product.category ||
                !product.stock) {
                return { code: 400, result: { status: "error", message: "Product is missing required properties" } };
            }
            // If no thumbnail, set default value to empty array
            if (!product.thumbnail) {
                product.thumbnail = [];
            }
            // if no status, set default value to true
            if (!product.status) {
                product.status = true;
            }
            // Add product
            ProductModel.create(product);
            return { code: 201, result: { status: "success", message: "Product added successfully", payload: product } };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error adding product" } };
        }
    }
    async getProductById(id) {
        try {
            const product = await ProductModel.find({ _id: id });
            if (product) {
                return { code: 200, result: { status: "success", payload: product } };
            }
            else {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
        }
        catch (error) {
            return { code: 404, result: { status: "error", message: "Product not found" } };
        }
    }
    async getProducts(countLimit) {
        try {
            const products = await ProductModel.find().lean().exec();
            // if products array is empty, return error
            if (products.length === 0) {
                return { code: 404, result: { status: "error", message: "No products found." } };
            }
            // if countLimit exists, list products with the specified limit. Else, list all products.
            if (countLimit) {
                if (isNaN(countLimit)) {
                    return { code: 400, result: { status: "error", message: "Invalid limit" } };
                }
                else if (countLimit < 1) {
                    return { code: 400, result: { status: "error", message: "Limit must be greater than 0" } };
                }
                else {
                    try {
                        const products = await ProductModel.find().limit(countLimit);
                        return { code: 200, result: { status: "success", payload: products } };
                    }
                    catch (error) {
                        return { code: 400, result: { status: "error", message: "Error getting products" } };
                    }
                }
            }
            else {
                return { code: 200, result: { status: "success", payload: products } };
            }
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error getting products" } };
        }
    }
    async updateProduct(id, productAttributes) {
        try {
            // Check if product exists
            const product = await ProductModel.find({ _id: id });
            if (!product) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            // Else, update product and secure id property is not modified
            await ProductModel.updateOne({ _id: id }, productAttributes);
            return {
                code: 200,
                result: {
                    status: "success",
                    message: "Product updated successfully",
                    payload: await ProductModel.findOne({ _id: id }),
                },
            };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error updating product" } };
        }
    }
    async deleteProduct(id) {
        try {
            // Check if product exists
            const product = await ProductModel.find({ _id: id });
            if (!product) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            // Else, delete product
            await ProductModel.deleteOne({ _id: id });
            return {
                code: 200,
                result: { status: "success", message: "Product deleted successfully", payload: product },
            };
        }
        catch {
            return { code: 400, result: { status: "error", message: "Error deleting product" } };
        }
    }
    async productExists(id) {
        try {
            await ProductModel.exists({ _id: id });
            return true;
        }
        catch {
            return false;
        }
    }
}
