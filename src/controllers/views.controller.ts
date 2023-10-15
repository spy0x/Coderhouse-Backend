import { Request, Response } from "express";
import { __dirname } from "../utils.js";
import path from "path";

class ViewsController {
  index(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
  products(req: any, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
  cart(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
  recovery(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
  error(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
  users(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
  orders(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "frontend_react/index.html"));
  }
}

const viewsController = new ViewsController();
export default viewsController;
