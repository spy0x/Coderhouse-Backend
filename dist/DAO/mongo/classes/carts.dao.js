import { CartModel } from "../models/carts.models.js";
class CartsDao {
    async createCart() {
        const cart = await CartModel.create({ productos: [] });
        return cart;
    }
    async updateCart(cartID, cart) {
        await CartModel.updateOne({ _id: cartID }, cart);
    }
    async findCart(id) {
        return (await CartModel.findById(id));
    }
    async findCartFull(id) {
        return (await CartModel.findById(id).populate("productos.idProduct").lean());
    }
}
const cartsDao = new CartsDao();
export default cartsDao;
