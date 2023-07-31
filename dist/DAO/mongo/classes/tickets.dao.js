import { TicketModel } from "../models/tickets.models.js";
class TicketsDao {
    async createTicket(purchaser, amount) {
        return await TicketModel.create({ purchaser, amount });
    }
}
const ticketsDao = new TicketsDao();
export default ticketsDao;
