import { connect } from "mongoose";
// MONGODB CONNECTION
export async function connectMongo(MONGO_PASSWORD) {
    const DB_URL = `mongodb+srv://spy0x:${MONGO_PASSWORD}@cluster0.7hatvzm.mongodb.net/ecommerce?retryWrites=true&w=majority`;
    try {
        await connect(DB_URL);
        console.log("plug to mongo!");
    }
    catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
}
