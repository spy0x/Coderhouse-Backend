import { CartModel } from "./models/carts.models.js";
import ProductService from "./products.services.js";
import mongoose from "mongoose";
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
            // Checks if product exists
            if (!mongoose.Types.ObjectId.isValid(productID)) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            const productExists = await productService.productExists(productID);
            if (!productExists) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            // Checks if cart exists
            if (!mongoose.Types.ObjectId.isValid(cartID)) {
                return { code: 404, result: { status: "error", message: "Cart not found" } };
            }
            const cartExists = await this.cartExists(cartID);
            if (!cartExists) {
                return { code: 404, result: { status: "error", message: "Cart not found" } };
            }
            // Else, add product to cart
            const cart = (await CartModel.findById(cartID));
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
    async cartExists(cartID) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartID)) {
                return false;
            }
            const cart = await CartModel.findById(cartID);
            return cart ? true : false;
        }
        catch (error) {
            return false;
        }
    }
    async getCartProducts(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return { code: 404, result: { status: "error", message: "Cart not found" } };
            }
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
    async deleteProductFromCart(cartID, productID) {
        try {
            // Check if cartID is valid and exists
            if (!mongoose.Types.ObjectId.isValid(cartID)) {
                return { code: 404, result: { status: "error", message: "Cart not found" } };
            }
            const cart = await CartModel.findById(cartID);
            if (!cart) {
                return { code: 404, result: { status: "error", message: "Cart not found" } };
            }
            // Check if productID is valid and exists
            if (!mongoose.Types.ObjectId.isValid(productID)) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            const productExists = await productService.productExists(productID);
            if (!productExists) {
                return { code: 404, result: { status: "error", message: "Product not found" } };
            }
            // Check if product is in cart
            const productInCartIndex = cart.productos.findIndex((product) => product.idProduct === productID);
            if (productInCartIndex === -1) {
                return { code: 404, result: { status: "error", message: "Product not found in cart" } };
            }
            // If product is in cart, delete it
            cart.productos.splice(productInCartIndex, 1);
            await CartModel.updateOne({ _id: cartID }, cart);
            return { code: 200, result: { status: "success", message: "Product deleted from cart", payload: cart } };
        }
        catch (error) {
            return { code: 500, result: { status: "error", message: "Couldn't delete product from cart." } };
        }
    }
}
