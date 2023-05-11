import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("*", (req, res, next) => {
    const error = {
      status: 'ERROR 404',
      message: "Page Not found",
    }
    res.render("error", error)
  });

export default viewsRouter;