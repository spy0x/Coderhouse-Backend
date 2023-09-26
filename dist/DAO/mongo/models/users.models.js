import { Schema, model } from "mongoose";
const usersSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false, default: "" },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, default: 18 },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user", enum: ["user", "admin"] },
    cartId: { type: Schema.Types.ObjectId, ref: "carts", required: true, unique: true },
    documents: [
        {
            name: { type: String },
            reference: { type: String },
        },
    ],
    last_connection: { type: Date, default: Date.now() },
}, { versionKey: false });
export const UserModel = model("users", usersSchema);
