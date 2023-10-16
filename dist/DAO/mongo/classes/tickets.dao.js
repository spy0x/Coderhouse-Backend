import { TicketModel } from "../models/tickets.models.js";
import { v4 as uuidGenerator } from "uuid";
class TicketsDao {
    async createTicket(user, amount, products) {
        const code = uuidGenerator();
        return await TicketModel.create({ purchaser: user.email, userId: user._id, amount, code, products });
    }
}
const ticketsDao = new TicketsDao();
export default ticketsDao;
