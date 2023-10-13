import { connect } from "mongoose";
import { logger } from "./logger.js";
// MONGODB CONNECTION
export async function connectMongo(MONGO_USER, MONGO_PASSWORD, MONGO_URL) {
    const DB_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/ltp_market?retryWrites=true&w=majority`;
    try {
        logger.debug("Connecting to the MongoDB...");
        await connect(DB_URL);
        logger.info("Connected to the MongoDB!");
    }
    catch (e) {
        logger.error("Error connecting to the MongoDB...");
        logger.error(e);
    }
}
