import { Schema, model } from "mongoose";
const cartSchema = new Schema({
    productos: { type: Array, default: [] },
});
export const CartModel = model("carts", cartSchema);
