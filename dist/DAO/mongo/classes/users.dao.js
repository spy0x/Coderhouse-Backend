import { createHash } from "../../../utils/passwordCrypt.js";
import { PassRecoveryModel } from "../models/passrecovery.models.js";
import { UserModel } from "../models/users.models.js";
class UsersDao {
    async getUser(id) {
        const user = await UserModel.findById(id).populate({
            path: "cartId",
            populate: {
                path: "productos.idProduct",
            },
        });
        return user;
    }
    async createRecoveryTicket(email) {
        const ticket = await PassRecoveryModel.create({ email });
        return ticket;
    }
    async getRecoveryTicketByEmail(email) {
        const ticket = await PassRecoveryModel.findOne({ email });
        return ticket;
    }
    async getRecoveryTicketById(id) {
        const ticket = await PassRecoveryModel.findById(id);
        return ticket;
    }
    async deleteRecoveryTicket(id) {
        await PassRecoveryModel.findByIdAndDelete(id);
    }
    async updatePassword(email, password) {
        const hashedPassword = createHash(password);
        await UserModel.updateOne({ email }, { password: hashedPassword });
    }
}
const usersDao = new UsersDao();
export default usersDao;
