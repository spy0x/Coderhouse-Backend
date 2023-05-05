import { Router } from "express";
import { products } from "../App.js";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  const countLimit = req.query.limit;

  // if countLimit exists, convert it to number, and list products with the specified limit. Else, list all products.
  if (countLimit) {
    const limit = parseInt(countLimit as string);
    if (isNaN(limit)) {
      return res.status(400).json({ status: "error", message: "Invalid limit" });
    } else {
      if (limit < 1) {
        return res.status(400).json({ status: "error", message: "Limit must be greater than 0" });
      }
      else if (limit > products.length) { 
        return res.status(400).json({ status: "error", message: "Limit must be less than or equal to the number of products" });  
      }
      const result = products.slice(0, limit);
      return res.json(result);
    }
  } else {
    return res.json(products);
  }
});

productsRouter.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  let product: Product | undefined = undefined;
  if (typeof products === "object") {
    product = products.find((item) => item.id === id);
  }
  const result = product ? product : "Product not found";
  res.json(result);
});

export default productsRouter;
