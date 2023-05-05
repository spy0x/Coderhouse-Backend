import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Cart router");
    }
);

export default router;