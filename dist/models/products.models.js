import { Schema } from "mongoose";
const productSchema = new Schema({
    title: { type: String, required: true, max: 100, unique: true },
    description: { type: String, required: true, max: 500 },
    price: { type: Number, required: true },
    code: { type: String, required: true, max: 255, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    thumbnail: { type: (Array) },
    status: { type: Boolean },
});
// export const ProductModel = model("Productos", productSchema);
