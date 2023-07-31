import { CartModel } from "../models/carts.models.js";

class CartsDao {
  async createCart() {
    const cart = await CartModel.create({ productos: [] });
    return cart;
  }
  async updateCart(cartID: string, cart: Cart) {
    await CartModel.updateOne({ _id: cartID }, cart);
  }
  async findCart(id: string) {
    return (await CartModel.findById(id)) as Cart;
  }
  async findCartFull(id: string) {
    return (await CartModel.findById(id).populate("productos.idProduct").lean()) as Cart;
  }
}

const cartsDao = new CartsDao();
export default cartsDao;
