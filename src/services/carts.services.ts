import { CartModel } from "../dao/models/carts.models.js";

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
}