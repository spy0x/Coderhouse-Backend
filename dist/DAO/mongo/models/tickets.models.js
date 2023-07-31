import { Schema, model } from "mongoose";
import { v4 as uuidGenerator } from 'uuid';
const ticketSchema = new Schema({
    code: { type: String, default: uuidGenerator(), unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
}, { versionKey: false });
export const TicketModel = model("tickets", ticketSchema);
