import { createHash } from "../../../utils/passwordCrypt.js";
import { PassRecoveryModel } from "../models/passrecovery.models.js";
import { UserModel } from "../models/users.models.js";

class UsersDao {
  async getUser(id: string){
    const user = await UserModel.findById(id).populate({
      path: "cartId",
      populate: {
        path: "productos.idProduct",
      },
    }) as User;
    return user;
  }
  async createRecoveryTicket(email: string) {
    const ticket = await PassRecoveryModel.create({ email }) as PassRecoveryTicket;
    return ticket;
  }
  async getRecoveryTicketByEmail(email: string) {
    const ticket = await PassRecoveryModel.findOne({ email }) as PassRecoveryTicket;
    return ticket;
  }
  async getRecoveryTicketById(id: string) {
    const ticket = await PassRecoveryModel.findById(id) as PassRecoveryTicket;
    return ticket;
  }
  async deleteRecoveryTicket(id: string) {
    await PassRecoveryModel.findByIdAndDelete(id);
  }
  async updatePassword(email: string, password: string) {
    const hashedPassword = createHash(password);
    await UserModel.updateOne({ email }, { password: hashedPassword });
  }
}
const usersDao = new UsersDao();
export default usersDao;