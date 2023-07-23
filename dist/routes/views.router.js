import { Router } from "express";
import productService from "../services/products.services.js";
import cartService from "../services/carts.services.js";
import { cartExists } from "../middlewares/cartsMiddlewares.js";
import { productsValidQueries } from "../middlewares/productsMiddlewares.js";
import { isUser } from "../middlewares/auth.js";
const viewsRouter = Router();
viewsRouter.get("/", async (req, res) => {
    const { register, login } = req.query;
    const session = req.session;
    if (register === 'true' && !session.user)
        return res.render("register");
    if (login === 'true' && !session.user)
        return res.render("login");
    const context = { user: session.user };
    res.render("index", context);
});
viewsRouter.get("/products", productsValidQueries, async (req, res) => {
    const { limit, page, query, sort } = req.query;
    const { result } = await productService.getProducts(limit, query, sort, page);
    const context = { user: req.session.user, ...result };
    res.render("products", context);
});
viewsRouter.get("/carts/:cid", isUser, cartExists, async (req, res) => {
    const cartID = req.params.cid;
    const { result } = await cartService.getCartProducts(cartID);
    const context = { user: req.session.user, ...result };
    res.render("carts", context);
});
viewsRouter.get("*", (req, res) => {
    const error = {
        status: "ERROR 404",
        message: "Page Not found",
    };
    res.render("error", error);
});
// viewsRouter.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts");
// });
// viewsRouter.get("/chat", (req, res) => {
//   res.render("chat");
// });
export default viewsRouter;
