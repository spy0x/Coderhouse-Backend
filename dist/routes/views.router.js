import { Router } from "express";
import ProductService from "../services/products.services.js";
import CartService from "../services/carts.services.js";
import { cartExists } from "../middlewares/cartsMiddlewares.js";
import { productsValidQueries } from "../middlewares/productsMiddlewares.js";
import { isUser } from "../middlewares/auth.js";
const viewsRouter = Router();
const productService = new ProductService();
const cartService = new CartService();
viewsRouter.get("/", async (req, res) => {
    const { register, login } = req.query;
    const session = req.session;
    if (register === 'true' && !session.user)
        return res.render("register");
    if (login === 'true' && !session.user)
        return res.render("login");
    const context = { session: session.user };
    res.render("index", context);
});
// viewsRouter.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts");
// });
// viewsRouter.get("/chat", (req, res) => {
//   res.render("chat");
// });
viewsRouter.get("/products", isUser, productsValidQueries, async (req, res) => {
    const { limit, page, query, sort } = req.query;
    const { result } = await productService.getProducts(limit, query, sort, page);
    res.render("products", result);
});
viewsRouter.get("/carts/:cid", cartExists, async (req, res) => {
    const cartID = req.params.cid;
    const { result } = await cartService.getCartProducts(cartID);
    res.render("carts", result);
});
viewsRouter.get("*", (req, res) => {
    const error = {
        status: "ERROR 404",
        message: "Page Not found",
    };
    res.render("error", error);
});
export default viewsRouter;
