"use strict";
class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 0;
    }
    addProduct(product) {
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
        product = { id: this.currentId++, ...product };
        this.products.push(product);
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
// Create product manager
const myProductManager = new ProductManager();
// Show current products. Should be empty
console.log(myProductManager.getProducts());
// Create product 1
const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba 1",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
};
// Add product
myProductManager.addProduct(product1);
// Show current products. Should have one product
console.log(myProductManager.getProducts());
// Add product again. Should show error message
myProductManager.addProduct(product1);
// Get product by id. Should return product1
console.log(myProductManager.getProductById(0));
// Get product by unexisting id. Should return error message
console.log(myProductManager.getProductById(1));
// Create product 2
const product2 = {
    title: "producto prueba 2",
    description: "Este es un producto prueba 2",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc321",
    stock: 25,
};
// Add product 2
myProductManager.addProduct(product2);
// Show current products. Should have two products
console.log(myProductManager.getProducts());
// Get product by previously unexisting id. Now should return product2
console.log(myProductManager.getProductById(1));
