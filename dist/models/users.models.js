import { Schema, model } from "mongoose";
const usersSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user", enum: ["user", "admin"] }
}, { versionKey: false });
export const UserModel = model("users", usersSchema);
