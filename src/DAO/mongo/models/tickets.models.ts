import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true},
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    products: [
      {
        idProduct: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
        _id: false,
      },
    ],
  },
  { versionKey: false }
);

export const TicketModel = model("tickets", ticketSchema);
