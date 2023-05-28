// DB CONNECTION //
import { connect } from "mongoose";
const DB_URL = "mongodb+srv://spy0x:%254y%5EWqkJ%26%264%25fA@cluster0.7hatvzm.mongodb.net/?retryWrites=true&w=majority";
export async function connectMongo() {
    try {
        await connect(DB_URL);
        console.log("plug to mongo!");
    }
    catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
}
// MULTER CONFIG //
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
export const uploader = multer({ storage });
