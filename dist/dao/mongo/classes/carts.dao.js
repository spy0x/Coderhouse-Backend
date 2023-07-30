import { CartModel } from "../models/carts.models.js";
class CartsDao {
    async createCart() {
        return await CartModel.create({ productos: [] });
    }
    async addToCart(cartID) {
        return (await CartModel.findById(cartID));
    }
    async updateCart(cartID, cart) {
        CartModel.updateOne({ _id: cartID }, cart);
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
