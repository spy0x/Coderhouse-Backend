import fs from "fs";
export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.currentId = 0;
    }
    async loadData() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const parsedData = JSON.parse(data);
            this.products = parsedData.products;
            this.currentId = parsedData.lastId;
        }
        catch (error) {
            console.log("Error loading data!");
            console.log("Creating new data file...");
            try {
                await fs.promises.writeFile(this.path, JSON.stringify({ lastId: 0, products: [] }, null, 2), "utf-8");
                await this.loadData();
                console.log("Data file created");
            }
            catch (error) {
                console.log("Error creating data file!");
            }
        }
    }
    async saveData() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify({ lastId: this.currentId, products: this.products }, null, 2), "utf-8");
        }
        catch (error) {
            console.log("Error saving data!");
        }
    }
    async addProduct(product) {
        // Check if product already exists
        if (this.products.some((item) => item.code === product.code)) {
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
        const newId = ++this.currentId;
        product = { _id: newId.toString(), ...product };
        this.products.push(product);
        await this.saveData();
        return { code: 201, result: { status: "success", message: "Product added successfully", payload: product } };
    }
    getProductById(id) {
        const product = this.products.find((item) => item._id === id);
        if (product) {
            return { code: 200, result: { status: "success", payload: product } };
        }
        else {
            return { code: 404, result: { status: "error", message: "Product not found" } };
        }
    }
    getProducts(countLimit) {
        // if countLimit exists, convert it to number, and list products with the specified limit. Else, list all products.
        if (countLimit) {
            if (isNaN(countLimit)) {
                return { code: 400, result: { status: "error", message: "Invalid limit" } };
            }
            else {
                if (countLimit < 1) {
                    return { code: 400, result: { status: "error", message: "Limit must be greater than 0" } };
                }
                else if (countLimit > this.products.length) {
                    return {
                        code: 400,
                        result: { status: "error", message: "Limit must be less than or equal to the number of products" },
                    };
                }
                const result = this.products.slice(0, countLimit);
                return { code: 200, result: { status: "success", payload: result } };
            }
        }
        else {
            return this.products.length
                ? { code: 200, result: { status: "success", payload: this.products } }
                : { code: 404, result: { status: "error", message: "No products found." } };
        }
    }
    // Update one or more properties of a product id
    async updateProduct(id, product) {
        // Check if product exists
        const productIndex = this.products.findIndex((product) => product._id === id);
        if (productIndex === -1) {
            return { code: 404, result: { status: "error", message: "Product not found" } };
        }
        // Else, update product and secure id property is not modified
        this.products[productIndex] = { ...this.products[productIndex], ...product, _id: this.products[productIndex]._id };
        await this.saveData();
        return {
            code: 200,
            result: {
                status: "success",
                message: "Product updated successfully",
                payload: this.products[productIndex],
            },
        };
    }
    async deleteProduct(id) {
        // Check if product exists
        const productIndex = this.products.findIndex((product) => product._id === id);
        if (productIndex === -1) {
            return { code: 404, result: { status: "error", message: "Product not found" } };
        }
        // Else, delete product
        const deletedProduct = this.products.splice(productIndex, 1);
        await this.saveData();
        return {
            code: 200,
            result: { status: "success", message: "Product deleted successfully", payload: deletedProduct },
        };
    }
    productExists(id) {
        return this.products.some((item) => item._id === id);
    }
}
