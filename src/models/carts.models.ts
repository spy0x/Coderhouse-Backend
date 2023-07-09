import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    productos: [
      {
        idProduct: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
        _id: false,
      },
    ],
    deletionDate: { type: Date, expires: "7d" },
  },
  { versionKey: false }
);

export const CartModel = model("carts", cartSchema);
