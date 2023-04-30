import express from "express";
import ProductManager from "./ProductManager.js";

const PORT = 8080;
const app = express();
const productManager = new ProductManager("data.json");

startServer();

async function startServer() {
  const products = await productManager.getProducts();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.get("/products", (req, res) => {
    const countLimit = req.query.limit;

    // if countLimit exists, convert it to number, and list products with the specified limit. Else, list all products.
    if (countLimit) {
      const limit = parseInt(countLimit as string);
      const result = products.slice(0, limit);
      return res.json(result);
    } else {
      return res.json(products);
    }
  });
  app.get("/products/:pid", (req, res) => {
    const id = parseInt(req.params.pid);
    let product : Product | undefined = undefined;
    if(typeof products === "object")
    {
      product = products.find((item) => item.id === id);
    }
    const result = product ? product : "Product not found";
    res.json(result);
  });
  app.listen(PORT, () => {
    console.log("Server http://localhost/ is running on port " + PORT);
  });
}
