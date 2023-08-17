import { cartsDao, productsDao, ticketsDao } from "../DAO/factory.js";
import { logger } from "../utils/logger.js";
import cartService from "./carts.services.js";
class TicketService {
    async purchase(purchaser, cartID) {
        try {
            const cart = await cartsDao.findCart(cartID);
            if (cart.productos.length < 1)
                return { code: 404, result: { status: "empty", message: "Cart is empty" } };
            let totalAmount = 0;
            logger.debug("Purchasing products...");
            for (const cartProduct of cart.productos) {
                const productInDB = await productsDao.findProduct(cartProduct.idProduct.toString());
                if (productInDB.stock < cartProduct.quantity) {
                    return {
                        code: 404,
                        result: {
                            status: "nostock",
                            message: `Not enough stock for product ${productInDB.title}`,
                            payload: productInDB,
                        },
                    };
                }
                totalAmount += productInDB.price * cartProduct.quantity;
                productInDB.stock -= cartProduct.quantity;
                await productsDao.updateProduct(productInDB._id, productInDB);
                await cartService.deleteProductFromCart(cartID, cartProduct.idProduct.toString());
            }
            const ticket = await ticketsDao.createTicket(purchaser, totalAmount);
            logger.debug("Products purchased successfully");
            return { code: 200, result: { status: "success", message: "Purchase successful", payload: ticket } };
        }
        catch (error) {
            logger.error(`Ticket Service Error: ${error}`);
            return { code: 500, result: { status: "error", message: "Couldn't purchase products." } };
        }
    }
}
const ticketService = new TicketService();
export default ticketService;
