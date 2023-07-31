import { MessageModel } from "../models/messages.models.js";

class MessagesDao {
  async getAll() {
    return await MessageModel.find({});
  }
  async addMessage(message: Post) {
    const newMessage = new MessageModel(message);
    await newMessage.save();
  }
}

const messagesDao = new MessagesDao();
export default messagesDao;
