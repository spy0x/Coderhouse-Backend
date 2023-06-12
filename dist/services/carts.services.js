import { CartModel } from "../models/carts.models.js";
import ProductService from "./products.services.js";
const productService = new ProductService();
export default class CartService {
    async addCart() {
        try {
            const cart = await CartModel.create({ productos: [] });
            return {
                code: 201,
                result: { status: "success", message: "Cart created successfully", payload: cart },
            };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't create cart." } };
        }
    }
    async addProductToCart(cartID, productID) {
        try {
            const cart = (await CartModel.findById(cartID));
            // Check if product is already in cart, add ++ to quantity
            const productInCartIndex = cart.productos.findIndex((product) => product.idProduct.toString() === productID);
            if (productInCartIndex !== -1) {
                cart.productos[productInCartIndex].quantity++;
                await CartModel.updateOne({ _id: cartID }, cart);
                return {
                    code: 202,
                    result: { status: "success", message: "Product updated quantity", payload: cart },
                };
            }
            // Else, add new product to cart
            const product = { idProduct: productID, quantity: 1 };
            cart.productos.push(product);
            await CartModel.updateOne({ _id: cartID }, cart);
            return {
                code: 202,
                result: { status: "success", message: "Product added to cart", payload: cart },
            };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't add product to cart." } };
        }
    }
    async getCartProducts(id) {
        try {
            const cart = (await CartModel.findById(id).populate("productos.idProduct").lean());
            //if product list is empty, return error message, else return products
            if (cart.productos.length === 0) {
                return { code: 404, result: { status: "error", message: "Cart is empty" } };
            }
            else {
                return { code: 200, result: { status: "success", payload: cart.productos } };
            }
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't get cart products." } };
        }
    }
    async deleteProductFromCart(cartID, productID) {
        try {
            const cart = (await CartModel.findById(cartID));
            const productInCartIndex = cart.productos.findIndex((product) => product.idProduct.toString() === productID);
            cart.productos.splice(productInCartIndex, 1);
            await CartModel.updateOne({ _id: cartID }, cart);
            return { code: 200, result: { status: "success", message: "Product deleted from cart", payload: cart } };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't delete product from cart." } };
        }
    }
    async updateProductsList(cartID, products) {
        try {
            const cart = (await CartModel.findById(cartID));
            cart.productos = products;
            await CartModel.updateOne({ _id: cartID }, cart);
            return { code: 200, result: { status: "success", message: "Cart product list updated", payload: cart } };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't update cart product list." } };
        }
    }
    async updateProductQuantity(cartID, productID, quantity) {
        try {
            const cart = (await CartModel.findById(cartID));
            const productInCartIndex = cart.productos.findIndex((product) => product.idProduct.toString() === productID);
            // Check if quantity is valid
            if (!quantity || quantity < 1 || isNaN(quantity)) {
                return { code: 404, result: { status: "error", message: "Invalid quantity" } };
            }
            // Else update its quantity
            cart.productos[productInCartIndex].quantity = quantity;
            await CartModel.updateOne({ _id: cartID }, cart);
            return { code: 200, result: { status: "success", message: "Product quantity updated", payload: cart } };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't update product quantity." } };
        }
    }
    async clearCart(cartID) {
        try {
            const cart = (await CartModel.findById(cartID));
            cart.productos = [];
            await CartModel.updateOne({ _id: cartID }, cart);
            return { code: 200, result: { status: "success", message: "Cart cleared", payload: cart } };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't clear cart." } };
        }
    }
}
