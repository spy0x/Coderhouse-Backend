import { usersDao } from "../DAO/factory.js";

class SessionService {
  async getCurrentUser(id: string) {
    const user = await usersDao.getUser(id);
    return user;
  }
  async createRecoveryTicket(email: string) {
    try {
      const ticket = await usersDao.getRecoveryTicketByEmail(email);
      if (ticket) await usersDao.deleteRecoveryTicket(ticket._id);
      const newTicket = await usersDao.createRecoveryTicket(email);
      return { code: 201, result: { status: "success", message: "Recovery ticket created successfully", payload: newTicket } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error creating recovery ticket" } };
    }
  }
  async updatePassword(password: string, code: string) {
    try {
      const ticket = await usersDao.getRecoveryTicketById(code);
      await usersDao.updatePassword(ticket.email, password);
      await usersDao.deleteRecoveryTicket(code);
      return { code: 200, result: { status: "success", message: "Password updated successfully" } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error updating password" } };
    }
  }
}

const sessionService = new SessionService();
export default sessionService;
