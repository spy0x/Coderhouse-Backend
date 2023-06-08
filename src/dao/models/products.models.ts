import { Model, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface ProductDocument extends Document {
  title: string;
  description: string;
  price: number;
  code: string;
  stock: number;
  category: string;
  thumbnail: Array<String>;
  status: boolean;
}
interface ProductModel<T extends Document> extends Model<T> {
  paginate: any;
}

const productSchema = new Schema({
  title: { type: String, required: true, max: 100, unique: true },
  description: { type: String, required: true, max: 500 },
  price: { type: Number, required: true },
  code: { type: String, required: true, max: 255, unique: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, max: 100 },
  thumbnail: { type: Array<String> },
  status: { type: Boolean },
});

productSchema.plugin(mongoosePaginate);
export const ProductModel = model<ProductDocument>("products", productSchema) as ProductModel<ProductDocument>;
// export const ProductModel = model("products", productSchema);
