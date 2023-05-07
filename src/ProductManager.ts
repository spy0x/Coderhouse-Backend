import fs from "fs";


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

  async addProduct(res: any, product: Product) {
    // Check if product already exists
    if (this.products.some((item) => item.code === product.code)) {
      return res.status(400).json({ status: "error", message: "Product already exists" });
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
      return res.status(400).json({ status: "error", message: "Product is missing required properties" });
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
    return res.json({ status: "success", message: "Product added successfully", data: product });
  }

  getProductById(id: number, res: any) {
    if (isNaN(id)) {
      return res.status(400).json({ status: "error", message: "Invalid id" });
    }
    if (id < 0) {
      return res.status(400).json({ status: "error", message: "Id must be equal or greater than 0" });
    }
    const product = this.products.find((item) => item.id === id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
  }

  getProducts(res: any, countLimit: any) {
    // if countLimit exists, convert it to number, and list products with the specified limit. Else, list all products.
    if (countLimit) {
      if (isNaN(countLimit)) {
        return res.status(400).json({ status: "error", message: "Invalid limit" });
      } else {
        if (countLimit < 1) {
          return res.status(400).json({ status: "error", message: "Limit must be greater than 0" });
        } else if (countLimit > this.products.length) {
          return res.status(400).json({ status: "error", message: "Limit must be less than or equal to the number of products" });
        }
        const result = this.products.slice(0, countLimit);
        return res.json(result);
      }
    } else {
      return this.products.length
        ? res.json(this.products)
        : res.status(404).json({ status: "error", message: "No products found." });
    }
  }

  // Update one or more properties of a product id
  async updateProduct(res: any, id: number, product: ProductKeys) {
    // Check if product exists
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    // Else, update product and secure id property is not modified
    this.products[productIndex] = { ...this.products[productIndex], ...product, id: this.products[productIndex].id };
    await this.saveData();
    return res.json({ status: "success", message: "Product updated successfully", data: this.products[productIndex] });
  }

  async deleteProduct(res: any, id: number) {
    // Check if product exists
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    // Else, delete product
    const deletedProduct = this.products.splice(productIndex, 1);
    await this.saveData();
    return res.json({ status: "success", message: "Product deleted successfully", data: deletedProduct });
  }
}
