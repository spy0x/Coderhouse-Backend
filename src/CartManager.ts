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

  async addCart(res: any) {
    this.carts.push({idCarrito: ++this.currentId, productos: []});
    await this.saveData();
    return res.json({ status: "success", message: "Cart created successfully", data: this.carts[this.carts.length - 1] });
  }
  
  getCartProducts(res: any , id: number) {
    if (isNaN(id)) {
      return res.status(400).json({ status: "error", message: "Invalid id" });
    }
    if (id < 0) {
      return res.status(400).json({ status: "error", message: "Id must be equal or greater than 0" });
    }
    const cart = this.carts.find((item) => item.idCarrito === id);
    if (cart) {
      return res.json({ status: "success", payload: cart.productos });
    } else {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }
  }

  async addProductToCart(res: any, cartID: number, productID: number) {
    // Check if product exists
    if(!productManager.productExists(productID)) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    // Check if cart exists
    const cartIndex = this.carts.findIndex((cart) => cart.idCarrito === cartID);
    if (cartIndex === -1) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }
    // Check if product is already in cart, add ++ to quantity
    const productIndex = this.carts[cartIndex].productos.findIndex((product) => product.idProduct === productID);
    if (productIndex !== -1) {
      this.carts[cartIndex].productos[productIndex].quantity++;
      await this.saveData();
      return res.json({ status: "success", message: "Product updated quantity", data: this.carts[cartIndex].productos[productIndex] });
    }
    // Else, add product to cart
    this.carts[cartIndex].productos.push({idProduct: productID, quantity: 1});
    await this.saveData();
    const selectedCart = this.carts[cartIndex];
    return res.json({ status: "success", message: "Product added to cart", data: selectedCart.productos[selectedCart.productos.length - 1] });
  }
}
