import fs from "fs";
import { productManager } from "./App.js";

export default class CartManager {
  private path: string;
  private carts: Cart[];
  private currentId: number;

  constructor(path: string) {
    this.path = path;
    this.carts = [];
    this.currentId = 0;
  }

  async loadData() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      this.carts = parsedData.carts as Cart[];
      this.currentId = parsedData.lastId as number;
    } catch (error) {
      console.log("Error loading data!");
      console.log("Creating new data file...");
      try {
        await fs.promises.writeFile(this.path, JSON.stringify({ lastId: 0, carts: [] }, null, 2), "utf-8");
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
        JSON.stringify({ lastId: this.currentId, carts: this.carts }, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log("Error saving data!");
    }
  }

  async addCart(): Promise<ResResult> {
    const newId = ++this.currentId;
    this.carts.push({ _id: newId.toString(), productos: [] });
    await this.saveData();
    return {
      code: 201,
      result: { status: "success", message: "Cart created successfully", payload: this.carts[this.carts.length - 1] },
    };
  }

  getCartProducts(id: string): ResResult {
    const cart = this.carts.find((item) => item._id === id);
    if (cart) {
      return { code: 200, result: { status: "success", payload: cart.productos } };
    } else {
      return { code: 404, result: { status: "error", message: "Cart not found" } };
    }
  }

  async addProductToCart(cartID: string, productID: string): Promise<ResResult> {
    // Check if product exists
    if (!productManager.productExists(productID)) {
      return { code: 404, result: { status: "error", message: "Product not found" } };
    }
    // Check if cart exists
    const cartIndex = this.carts.findIndex((cart) => cart._id === cartID);
    if (cartIndex === -1) {
      return { code: 404, result: { status: "error", message: "Cart not found" } };
    }
    // Check if product is already in cart, add ++ to quantity
    const productIndex = this.carts[cartIndex].productos.findIndex((product) => product.idProduct === productID);
    if (productIndex !== -1) {
      this.carts[cartIndex].productos[productIndex].quantity++;
      await this.saveData();
      return {
        code: 202,
        result: { status: "success", message: "Product updated quantity", payload: this.carts[cartIndex] },
      };
    }
    // Else, add product to cart
    this.carts[cartIndex].productos.push({ idProduct: productID, quantity: 1 });
    await this.saveData();
    return {
      code: 202,
      result: { status: "success", message: "Product added to cart", payload: this.carts[cartIndex] },
    };
  }
}
