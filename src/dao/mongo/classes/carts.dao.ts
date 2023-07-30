import { CartModel } from "../models/carts.models.js";

class CartsDao {
  async createCart() {
    return await CartModel.create({ productos: [] });
  }
  async addToCart(cartID: string) {
    return (await CartModel.findById(cartID)) as Cart;
  }
  async updateCart(cartID: string, cart: Cart) {
    CartModel.updateOne({ _id: cartID }, cart);
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
