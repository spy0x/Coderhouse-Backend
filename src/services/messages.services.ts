import { MessageModel } from "../dao/mongo/models/messages.models.js";

class MessageService {
  async getAllMessages() {
    try {
      const result = await MessageModel.find({});
      return result.reverse();
    } catch (e) {
      return [];
    }
  }
  async addMessage(message: Post): Promise<Result> {
    try {
      const newMessage = new MessageModel(message);
      await newMessage.save();
      return { status: "ok", message: "message added" };
    } catch (e) {
      return { status: "error", message: "could not add message" };
    }
  }
}

const messageService = new MessageService();
export default messageService;