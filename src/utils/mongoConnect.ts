import { connect } from "mongoose";
import { logger } from "./logger.js";

// MONGODB CONNECTION

export async function connectMongo(MONGO_PASSWORD: string) {
  const DB_URL = `mongodb+srv://spy0x:${MONGO_PASSWORD}@cluster0.7hatvzm.mongodb.net/ecommerce?retryWrites=true&w=majority`;
  try {
    logger.debug("Connecting to the MongoDB...");
    await connect(DB_URL);
    logger.info("Connected to the MongoDB!");
  } catch (e) {
    logger.error("Error connecting to the MongoDB...");
    logger.error(e);
  }
}
