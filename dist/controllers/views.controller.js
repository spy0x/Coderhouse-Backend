import { __dirname } from "../utils.js";
import path from "path";
class ViewsController {
    index(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
    }
    products(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
    }
    cart(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
    }
    recovery(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
    }
    error(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
    }
    users(req, res) {
        res.sendFile(path.join(__dirname, "frontend_react/index.html"));
    }
}
const viewsController = new ViewsController();
export default viewsController;
