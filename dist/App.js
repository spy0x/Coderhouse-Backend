import express from "express";
import fs from "fs";
const PATH = "data.json";
const PORT = 8080;
const app = express();
let products = [];
StartServer();
async function StartServer() {
    await loadData();
    app.use(express.urlencoded({ extended: true }));
    app.get("/products", (req, res) => {
        const countLimit = req.query.limit;
        // if countLimit exists, convert it to number, and list products with the specified limit. Else, list all products.
        if (countLimit) {
            const limit = parseInt(countLimit);
            const result = products.slice(0, limit);
            return res.json(result);
        }
        else {
            return res.json(products);
        }
    });
    app.get("/products/:pid", (req, res) => {
        const id = parseInt(req.params.pid);
        const product = products.find((item) => item.id === id);
        const result = product ? product : "Product not found";
        res.json(result);
    });
    app.listen(PORT, () => {
        console.log("Server http://localhost/ is running on port " + PORT);
    });
}
async function loadData() {
    try {
        const data = await fs.promises.readFile(PATH, "utf-8");
        const parsedData = JSON.parse(data);
        products = parsedData.products;
    }
    catch (error) {
        console.log("Error loading data!");
        products = [];
    }
}
