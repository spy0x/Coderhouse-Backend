import { Router } from "express";
const cartRouter = Router();
cartRouter.get("/", (req, res) => {
    res.send("Cart router");
});
export default cartRouter;
