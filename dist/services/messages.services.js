import { MessageModel } from "../models/messages.models.js";
export default class MessageService {
    async getAllMessages() {
        try {
            const result = await MessageModel.find({});
            return result.reverse();
        }
        catch (e) {
            return [];
        }
    }
    async addMessage(message) {
        try {
            const newMessage = new MessageModel(message);
            await newMessage.save();
            return { status: "ok", message: "message added" };
        }
        catch (e) {
            return { status: "error", message: "could not add message" };
        }
    }
}
