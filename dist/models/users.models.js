import { Schema, model } from "mongoose";
const usersSchema = new Schema({
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
}, { versionKey: false });
export const UserModel = model("messages", usersSchema);
