"use strict";
const fs = require("fs");
class ProductManager {
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
            return "Product already exists";
        }
        // Check if product has all required properties
        if (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock) {
            return "Product is missing required properties";
        }
        // Else, add product
        product = { id: ++this.currentId, ...product };
        this.products.push(product);
        await this.saveData();
        return "Product added successfully";
    }
    async getProductById(id) {
        // Get products file data or create new one if it doesn't exist.
        await this.loadData();
        // Return product if exists, otherwise return error.
        return this.products.find((product) => product.id === id) ?? "Not Found";
    }
    async getProducts() {
        // Get products file data or create new one if it doesn't exist.
        await this.loadData();
        // Return products if exists, otherwise return error.
        return this.products.length > 0 ? this.products : "No products";
    }
    // Update one or more properties of a product id
    async updateProduct(id, product) {
        // Get products file data or create new one if it doesn't exist.
        await this.loadData();
        // Check if product exists
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return "Product not found";
        }
        // Else, update product and secure id property is not modified
        this.products[productIndex] = { ...this.products[productIndex], ...product, id: this.products[productIndex].id };
        await this.saveData();
        return "Product updated successfully";
    }
    async deleteProduct(id) {
        // Get products file data or create new one if it doesn't exist.
        await this.loadData();
        // Check if product exists
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return "Product not found";
        }
        // Else, delete product
        this.products.splice(productIndex, 1);
        await this.saveData();
        return "Product deleted successfully";
    }
}
// TESTS //
test();
async function test() {
    // Create product manager instance
    const myProductManager = new ProductManager("data.json");
    // Show current products. Should return no products first time data file was created, otherwise should return one product
    console.log(await myProductManager.getProducts());
    // Create product1
    const product1 = {
        title: "producto prueba",
        description: "Este es un producto prueba 1",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    };
    // Add product and await to save changes in data file. Second time should return Error product already exists
    console.log(await myProductManager.addProduct(product1));
    // Show current products. Should return one product first time. Second time should return two products.
    console.log(await myProductManager.getProducts());
    // Check product by ID. Should return product1
    console.log(await myProductManager.getProductById(1));
    // Create product1 fields to update
    const productOneUpdates = {
        title: "Nombre actualizado",
        description: "Descripción actualizada",
    };
    // Update product1
    console.log(await myProductManager.updateProduct(1, productOneUpdates));
    // Create product2. First time id should be 2, after that should be always 3.
    const product2 = {
        title: "producto prueba 2",
        description: "Este es un producto prueba 2",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc1234",
        stock: 25,
    };
    // Add product2 and await to save changes in data file. Second time, should return Error product already exists
    console.log(await myProductManager.addProduct(product2));
    // Remove product2 first time. Second time should return Error product not found
    console.log(await myProductManager.deleteProduct(2));
}
