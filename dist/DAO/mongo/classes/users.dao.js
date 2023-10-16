import { createHash } from "../../../utils/passwordCrypt.js";
import { PassRecoveryModel } from "../models/passrecovery.models.js";
import { TicketModel } from "../models/tickets.models.js";
import { UserModel } from "../models/users.models.js";
class UsersDao {
    async getUser(id) {
        const user = (await UserModel.findById(id).populate({
            path: "cartId",
            populate: {
                path: "productos.idProduct",
            },
        }));
        return user;
    }
    async createRecoveryTicket(email) {
        const ticket = (await PassRecoveryModel.create({ email }));
        return ticket;
    }
    async getRecoveryTicketByEmail(email) {
        const ticket = (await PassRecoveryModel.findOne({ email }));
        return ticket;
    }
    async getRecoveryTicketById(id) {
        const ticket = (await PassRecoveryModel.findById(id));
        return ticket;
    }
    async deleteRecoveryTicket(id) {
        await PassRecoveryModel.findByIdAndDelete(id);
    }
    async updatePassword(email, password) {
        const hashedPassword = createHash(password);
        await UserModel.updateOne({ email }, { password: hashedPassword });
    }
    async updateRole(userId, role) {
        await UserModel.updateOne({ _id: userId }, { role });
    }
    async updateConnectionDate(userId) {
        await UserModel.updateOne({ _id: userId }, { last_connection: Date.now() });
    }
    async uploadDocuments(userId, files) {
        const documents = files.map((file) => {
            return { name: file.filename, reference: file.path };
        });
        await UserModel.updateOne({ _id: userId }, { documents });
    }
    async getAllUsers() {
        const users = (await UserModel.find());
        return users;
    }
    async deleteUsers(users) {
        const deleteManyQuery = {
            _id: {
                $in: users.map((user) => user._id),
            },
        };
        await UserModel.deleteMany(deleteManyQuery);
    }
    async deleteUser(userId) {
        await UserModel.findByIdAndDelete(userId);
    }
    async getUserTickets(userId) {
        const tickets = await TicketModel.find({ userId }).populate("products.idProduct");
        return tickets;
    }
}
const usersDao = new UsersDao();
export default usersDao;
