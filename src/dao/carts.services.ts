import { CartModel } from "./models/carts.models.js";
import ProductService from "./products.services.js";

const productService = new ProductService();
export default class CartService {
  async addCart(): Promise<ResResult> {
    try {
      const cart = await CartModel.create({ productos: [] });
      return {
        code: 201,
        result: { status: "success", message: "Cart created successfully", payload: cart },
      };
    } catch (error) {
      return { code: 500, result: { status: "error", message: "Couldn't create cart." } };
    }
  }

  async addProductToCart(cartID: string, productID: string): Promise<ResResult> {
    try {
      const productExists = await productService.productExists(productID);
      if (!productExists) {
        return { code: 404, result: { status: "error", message: "Product not found" } };
      }
      // Check if cart exists
      const cartExists = await this.cartExists(cartID);
      if (!cartExists) {
        return { code: 404, result: { status: "error", message: "Cart not found" } };
      }
      // Else, add product to cart
      const cart = (await CartModel.findById(cartID)) as Cart;
      // Check if product is already in cart, add ++ to quantity
      const productInCartIndex = cart.productos.findIndex((product) => product.idProduct === productID);
      if (productInCartIndex !== -1) {
        cart.productos[productInCartIndex].quantity++;
        await CartModel.updateOne({ _id: cartID }, cart);
        return {
          code: 202,
          result: { status: "success", message: "Product updated quantity", payload: cart },
        };
      }
      // Else, add new product to cart
      const product: ProductIdOnly = { idProduct: productID, quantity: 1 };
      cart.productos.push(product);
      await CartModel.updateOne({ _id: cartID }, cart);
      return {
        code: 202,
        result: { status: "success", message: "Product added to cart", payload: cart },
      };
    } catch (error) {
      return { code: 500, result: { status: "error", message: "Couldn't add product to cart." } };
    }
  }

  async cartExists(cartID: string) {
    try {
      await CartModel.findById(cartID);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  async getCartProducts(id: string): Promise<ResResult> {
    try {
        const cart = await CartModel.findById(id);
        if (cart) {
            return { code: 200, result: { status: "success", payload: cart.productos } };
        }
        else {
            return { code: 404, result: { status: "error", message: "Cart not found" } };
        }
    }
    catch (error) {
        return { code: 500, result: { status: "error", message: "Couldn't get cart products." } };
    }
  }
}
