import fs from "fs";
export default class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.currentId = 0;
    }
    async loadData() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const parsedData = JSON.parse(data);
            this.carts = parsedData.carts;
            this.currentId = parsedData.lastId;
        }
        catch (error) {
            console.log("Error loading data!");
            console.log("Creating new data file...");
            try {
                await fs.promises.writeFile(this.path, JSON.stringify({ lastId: 0, carts: [] }, null, 2), "utf-8");
                await this.loadData();
                console.log("Data file created");
            }
            catch (error) {
                console.log("Error creating data file!");
            }
        }
    }
    async saveData() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify({ lastId: this.currentId, carts: this.carts }, null, 2), "utf-8");
        }
        catch (error) {
            console.log("Error saving data!");
        }
    }
    async addCart(res) {
        this.carts.push({ id: ++this.currentId, products: [] });
        await this.saveData();
        return res.json({ status: "success", message: "Cart created successfully", data: this.carts[this.carts.length - 1] });
    }
    getCartProducts(res, id) {
        if (isNaN(id)) {
            return res.status(400).json({ status: "error", message: "Invalid id" });
        }
        if (id < 0) {
            return res.status(400).json({ status: "error", message: "Id must be equal or greater than 0" });
        }
        const cart = this.carts.find((item) => item.id === id);
        if (cart) {
            return res.json(cart.products);
        }
        else {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }
    }
}
