import productService from "../services/products.services.js";
import { __dirname } from "../utils.js";
import path from "path";
class ViewsController {
    async index(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
        // const { register, login } = req.query;
        // const user = req.session.user
        // if (register === "true" && !user) return res.render("register");
        // if (login === "true" && !user) return res.render("login");
        // const context = { user };
        // res.render("index", context);
    }
    async products(req, res) {
        const { limit, page, query, sort } = req.query;
        const { result } = await productService.getProducts(limit, query, sort, page);
        const user = req.session.user;
        const context = { user, ...result };
        res.render("products", context);
    }
    async cart(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
        // const cartID = req.params.cid;
        // const { result } = await cartService.getCartProducts(cartID);
        // const user = req.session.user
        // const context = { user, ...result };
        // res.render("carts", context);
    }
    async error(req, res) {
        const error = {
            status: "ERROR 404",
            message: "Page Not found",
        };
        res.render("error", error);
    }
}
const viewsController = new ViewsController();
export default viewsController;
