import { ProductModel } from "../models/products.models.js";
import mongoose from "mongoose";
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
            await ProductModel.create(product);
            return { code: 201, result: { status: "success", message: "Product added successfully", payload: product } };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error adding product" } };
        }
    }
    async getProductById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            const product = await ProductModel.findById(id);
            if (product) {
                return { code: 200, result: { status: "success", payload: product } };
            }
            else {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
        }
        catch (error) {
            return { code: 404, result: { status: "error", message: "Couldn't get product" } };
        }
    }
    async getProducts(limit = 10, query = null, sort = null, pag = 1) {
        try {
            query = query ? { category: query } : {};
            // If limit not a number, return error.
            if (isNaN(limit))
                return { code: 400, result: { status: "error", message: "Invalid limit parameter" } };
            limit = limit || 10;
            // If page not a number, return error.
            if (isNaN(pag))
                return { code: 400, result: { status: "error", message: "Invalid page parameter" } };
            pag = pag || 1;
            const options = { limit, page: pag, lean: true, leanWithId: false };
            // if sort is not null, check if it's a valid value and then set sort option.
            if (sort) {
                const validSort = sort === "asc" || sort === "desc";
                if (!validSort)
                    return { code: 400, result: { status: "error", message: "Invalid sort parameter" } };
                options.sort = { price: sort };
            }
            const products = await ProductModel.paginate(query, options);
            // if products array is empty, return error
            if (products.docs.length === 0) {
                return { code: 404, result: { status: "error", message: "No products found." } };
            }
            // Get pagination info into variables.
            const { docs, totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage } = products;
            // Setting Next and Prev page urls
            const queryStr = Object.keys(query).length === 0 ? "" : `&query=${query}`;
            const sortStr = sort !== null ? `&sort=${sort}` : "";
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
    async updateProduct(id, productAttributes) {
        try {
            // Check if product exists
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            const product = await ProductModel.findById(id);
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
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
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
            return await ProductModel.exists({ _id: id });
        }
        catch {
            return false;
        }
    }
}
