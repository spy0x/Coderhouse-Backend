import { Schema, model } from "mongoose";
const productSchema = new Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
});
export const ProductModel = model("products", productSchema);
