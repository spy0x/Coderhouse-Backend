import { TicketModel } from "../models/tickets.models.js";
import { v4 as uuidGenerator } from "uuid";

class TicketsDao {
  async createTicket(purchaser: string, amount: number) {
    const code = uuidGenerator();
    return await TicketModel.create({ purchaser, amount, code });
  }
}

const ticketsDao = new TicketsDao();
export default ticketsDao;
