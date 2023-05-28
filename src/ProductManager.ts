import fs from "fs";
import { MongoClient } from "mongodb";
import { DB_URL } from "./Utils.js";
// import { ProductModel } from "./models/products.models.js";

const client = new MongoClient(DB_URL);
const database = client.db('coderhouse-backend');
const collection = database.collection('Products');
export default class ProductManager {
  private path: string;
  private products: Product[];
  private currentId: number;

  constructor(path: string) {
    this.path = path;
    this.products = [];
    this.currentId = 0;
  }

  async loadData() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      this.products = parsedData.products as Product[];
      this.currentId = parsedData.lastId as number;
    } catch (error) {
      console.log("Error loading data!");
      console.log("Creating new data file...");
      try {
        await fs.promises.writeFile(this.path, JSON.stringify({ lastId: 0, products: [] }, null, 2), "utf-8");
        await this.loadData();
        console.log("Data file created");
      } catch (error) {
        console.log("Error creating data file!");
      }
    }
  }

  private async saveData() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify({ lastId: this.currentId, products: this.products }, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log("Error saving data!");
    }
  }

  async addProduct(product: Product): Promise<ResResult> {
    // Check if product already exists
    if (this.products.some((item) => item.code === product.code)) {
      return { code: 400, result: { status: "error", message: "Product already exists" } };
    }
    // Check if product has all required properties
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.category ||
      !product.stock
    ) {
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
    product = { id: ++this.currentId, ...product };
    this.products.push(product);
    await this.saveData();
    return { code: 201, result: { status: "success", message: "Product added successfully", payload: product } };
  }

  getProductById(id: number): ResResult {
    if (isNaN(id)) {
      return { code: 400, result: { status: "error", message: "Invalid id" } };
    }
    if (id < 0) {
      return { code: 400, result: { status: "error", message: "Id must be equal or greater than 0" } };
    }
    const product = this.products.find((item) => item.id === id);
    if (product) {
      return { code: 200, result: { status: "success", payload: product } };
    } else {
      return { code: 404, result: { status: "error", message: "Product not found" } };
    }
  }

  async getProducts(countLimit: any): Promise<ResResult> {
    // if countLimit exists, list products with the specified limit. Else, list all products.
    if (countLimit) {
      if (isNaN(countLimit)) {
        return { code: 400, result: { status: "error", message: "Invalid limit" } };
      } else if (countLimit < 1) {
        return { code: 400, result: { status: "error", message: "Limit must be greater than 0" } };
      } else {
        try {
          const products = await collection.find().limit(countLimit).toArray();
          return { code: 200, result: { status: "success", payload: products } };
        } catch (error) {
          return { code: 400, result: { status: "error", message: "Error getting products" } };
        }
      }
    } else {
      try {
        const products = await collection.find().toArray();;
        return products
          ? { code: 200, result: { status: "success", payload: products } }
          : { code: 404, result: { status: "error", message: "No products found." } };
      } catch (error) {
        return { code: 400, result: { status: "error", message: "Error getting products" } };
      }
    }
  }

  // Update one or more properties of a product id
  async updateProduct(id: number, product: ProductKeys): Promise<ResResult> {
    // Check if product exists
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return { code: 404, result: { status: "error", message: "Product not found" } };
    }
    // Else, update product and secure id property is not modified
    this.products[productIndex] = { ...this.products[productIndex], ...product, id: this.products[productIndex].id };
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

  async deleteProduct(id: number): Promise<ResResult> {
    // Check if product exists
    const productIndex = this.products.findIndex((product) => product.id === id);
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

  productExists(id: number) {
    return this.products.some((item) => item.id === id);
  }
}
