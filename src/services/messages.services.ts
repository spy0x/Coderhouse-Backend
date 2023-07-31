import messagesDao from "../dao/mongo/classes/messages.dao.js";

class MessageService {
  async getAllMessages() {
    try {
      const result = await messagesDao.getAll();
      return result.reverse();
    } catch (e) {
      return [];
    }
  }
  async addMessage(message: Post): Promise<Result> {
    try {
      await messagesDao.addMessage(message);
      return { status: "ok", message: "message added" };
    } catch (e) {
      return { status: "error", message: "could not add message" };
    }
  }
}

const messageService = new MessageService();
export default messageService;