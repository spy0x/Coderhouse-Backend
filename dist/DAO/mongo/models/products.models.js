import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 500 },
    price: { type: Number, required: true },
    code: { type: String, required: true, max: 255, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    thumbnail: { type: (Array) },
    owner: { type: String, max: 100, default: "admin" },
    status: { type: Boolean },
}, { versionKey: false });
productSchema.plugin(mongoosePaginate);
export const ProductModel = model("products", productSchema);
// export const ProductModel = model("products", productSchema);
