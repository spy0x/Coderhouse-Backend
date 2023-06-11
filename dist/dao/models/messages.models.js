import { Schema, model } from "mongoose";
const messageSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
}, { versionKey: false });
export const MessageModel = model("messages", messageSchema);
