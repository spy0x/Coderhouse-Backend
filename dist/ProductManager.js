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
            console.log(this.currentId);
        }
        catch (error) {
            console.log("Error loading data!");
            console.log("Creating new data file...");
            try {
                await fs.promises.writeFile(this.path, JSON.stringify({ lastId: 0, products: [] }, null, 2), 'utf-8');
                console.log("Data file created");
            }
            catch (error) {
                console.log("Error creating data file!");
            }
        }
    }
    async saveData() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify({ lastId: this.currentId, products: this.products }, null, 2), 'utf-8');
        }
        catch (error) {
            console.log("Error saving data!");
        }
    }
    async addProduct(product) {
        // Check if product already exists
        if (this.products.some((item) => item.code === product.code)) {
            console.log("Product already exists");
            return;
        }
        // Check if product has all required properties
        if (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock) {
            console.log("Product is missing required properties");
            return;
        }
        // Else, add product
        product = { id: ++this.currentId, ...product };
        this.products.push(product);
        await this.saveData();
    }
    getProductById(id) {
        // Check if product exists
        return this.products.find((product) => product.id === id) ?? "Not Found";
    }
    getProducts() {
        return this.products.length > 0 ? this.products : "No products";
    }
}
// TESTS //
test();
async function test() {
    // Create product manager instance
    const myProductManager = new ProductManager("data.json");
    // Load data.json file if exists. Else, it creates a new data.json file
    await myProductManager.loadData();
    // Show current products
    console.log(myProductManager.getProducts());
    // Created product1
    const product1 = {
        title: "producto prueba",
        description: "Este es un producto prueba 1",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    };
    // Add product and await to save changes in data file.
    await myProductManager.addProduct(product1);
    // Show current products
    console.log(myProductManager.getProducts());
    // Check product by ID
    console.log(myProductManager.getProductById(0));
    const product2 = {
        title: "producto prueba 2",
        description: "Este es un producto prueba 2",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc321",
        stock: 25,
    };
    myProductManager.addProduct(product2);
    console.log(myProductManager.getProducts());
    console.log(myProductManager.getProductById(1));
}
// Create product manager
// const myProductManager = new ProductManager("data.json");
// Show current products. Should be empty
// console.log(myProductManager.getProducts());
// Add product
// myProductManager.addProduct(product1);
// Show current products. Should have one product
// console.log(myProductManager.getProducts());
// Add product again. Should show error message
// myProductManager.addProduct(product1);
// Get product by id. Should return product1
// console.log(myProductManager.getProductById(0));
// Get product by unexisting id. Should return error message
// console.log(myProductManager.getProductById(1));
// Add product 2
// myProductManager.addProduct(product2);
// Show current products. Should have two products
// console.log(myProductManager.getProducts());
// Get product by previously unexisting id. Now should return product2
// console.log(myProductManager.getProductById(1));
