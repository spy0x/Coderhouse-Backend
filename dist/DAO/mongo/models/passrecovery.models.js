import { Schema, model } from "mongoose";
const recoverySchema = new Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true, versionKey: false, expires: 120 } // expires in 1 hour
);
export const PassRecoveryModel = model("recovery", recoverySchema);
