import { TicketModel } from "../models/tickets.models.js";

class TicketsDao {
  async createTicket(purchaser: string, amount: number){
    return await TicketModel.create({purchaser, amount});
  }
}

const ticketsDao = new TicketsDao();
export default ticketsDao;