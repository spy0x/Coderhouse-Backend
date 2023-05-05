import { Router } from "express";
import { products, productManager } from "../App.js";

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
      } else if (limit > products.length) {
        return res
          .status(400)
          .json({ status: "error", message: "Limit must be less than or equal to the number of products" });
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
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid id" });
  }
  if (id < 0) {
    return res.status(400).json({ status: "error", message: "Id must be equal or greater than 0" });
  }
  const product = products.find((item) => item.id === id);
  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ status: "error", message: "Product not found" });
  }
});

// modify a product
// productsRouter.put("/:pid", (req, res) => {
//   const id = parseInt(req.params.pid);
//   if (isNaN(id)) {
//     return res.status(400).json({ status: "error", message: "Invalid id" });
//   }
//   if (id < 0) {
//     return res.status(400).json({ status: "error", message: "Id must be equal or greater than 0" });
//   }
//   const product = products.find((item) => item.id === id);
//   if (product) {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     if (!title || !price) {
//       return res.status(400).json({ status: "error", message: "Missing title or price" });
//     }
//     if (typeof title !== "string" || typeof price !== "number") {
//       return res.status(400).json({ status: "error", message: "Invalid title or price" });
//     }
//     product.title = title;
//     product.price = price;
//     productManager.saveProducts(products);
//     return res.json(product);
//   } else {
//     return res.status(404).json({ status: "error", message: "Product not found" });
//   }
// }

export default productsRouter;
