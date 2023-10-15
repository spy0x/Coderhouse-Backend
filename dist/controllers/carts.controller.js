import cartService from "../services/carts.services.js";
import ticketService from "../services/tickets.services.js";
class CartsController {
    async addCart(req, res) {
        const response = await cartService.addCart();
        return res.status(response.code).json(response.result);
    }
    async getCartProducts(req, res) {
        const cartID = req.params.cid;
        const response = await cartService.getCartProducts(cartID);
        return res.status(response.code).json(response.result);
    }
    async updateCartProducts(req, res) {
        const cartID = req.params.cid;
        const products = req.body;
        const response = await cartService.updateProductsList(cartID, products);
        return res.status(response.code).json(response.result);
    }
    async clearCart(req, res) {
        const cartID = req.params.cid;
        const response = await cartService.clearCart(cartID);
        return res.status(response.code).json(response.result);
    }
    async updateCartProductQuantity(req, res) {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const quantity = req.body.quantity;
        const response = await cartService.updateProductQuantity(cartID, productID, quantity);
        return res.status(response.code).json(response.result);
    }
    async addCartProduct(req, res) {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const response = await cartService.addProductToCart(cartID, productID);
        return res.status(response.code).json(response.result);
    }
    async deleteCartProduct(req, res) {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const response = await cartService.deleteProductFromCart(cartID, productID);
        return res.status(response.code).json(response.result);
    }
    async purchase(req, res) {
        const cartID = req.params.cid;
        const response = await ticketService.purchase(req.session.user, cartID);
        return res.status(response.code).json(response.result);
    }
}
const cartsController = new CartsController();
export default cartsController;
