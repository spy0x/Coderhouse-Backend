import { Request, Response } from "express";
import cartService from "../services/carts.services.js";
import ticketService from "../services/tickets.services.js";

class CartsController {
  async addCart(req: Request, res: Response) {
    const response = await cartService.addCart();
    return res.status(response.code).json(response.result);
  }
  async getCartProducts(req: Request, res: Response) {
    const cartID = req.params.cid;
    const response = await cartService.getCartProducts(cartID);
    return res.status(response.code).json(response.result);
  }
  async updateCartProducts(req: Request, res: Response) {
    const cartID = req.params.cid;
    const products = req.body;
    const response = await cartService.updateProductsList(cartID, products);
    return res.status(response.code).json(response.result);
  }
  async clearCart(req: Request, res: Response) {
    const cartID = req.params.cid;
    const response = await cartService.clearCart(cartID);
    return res.status(response.code).json(response.result);
  }
  async updateCartProductQuantity(req: Request, res: Response) {
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const quantity = req.body.quantity;
    const response = await cartService.updateProductQuantity(cartID, productID, quantity);
    return res.status(response.code).json(response.result);
  }
  async addCartProduct(req: Request, res: Response) {
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const response = await cartService.addProductToCart(cartID, productID);
    return res.status(response.code).json(response.result);
  }
  async deleteCartProduct(req: Request, res: Response) {
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const response = await cartService.deleteProductFromCart(cartID, productID);
    return res.status(response.code).json(response.result);
  }
  async purchase(req: Request, res: Response) {
    const cartID = req.params.cid;
    const response = await ticketService.purchase(req.session.user as Express.User, cartID);
    return res.status(response.code).json(response.result);
  }
}

const cartsController = new CartsController();
export default cartsController;
