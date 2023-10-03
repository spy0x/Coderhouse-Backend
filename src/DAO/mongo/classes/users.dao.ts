import { createHash } from "../../../utils/passwordCrypt.js";
import { PassRecoveryModel } from "../models/passrecovery.models.js";
import { UserModel } from "../models/users.models.js";

class UsersDao {
  async getUser(id: string) {
    const user = (await UserModel.findById(id).populate({
      path: "cartId",
      populate: {
        path: "productos.idProduct",
      },
    })) as User;
    return user;
  }
  async createRecoveryTicket(email: string) {
    const ticket = (await PassRecoveryModel.create({ email })) as PassRecoveryTicket;
    return ticket;
  }
  async getRecoveryTicketByEmail(email: string) {
    const ticket = (await PassRecoveryModel.findOne({ email })) as PassRecoveryTicket;
    return ticket;
  }
  async getRecoveryTicketById(id: string) {
    const ticket = (await PassRecoveryModel.findById(id)) as PassRecoveryTicket;
    return ticket;
  }
  async deleteRecoveryTicket(id: string) {
    await PassRecoveryModel.findByIdAndDelete(id);
  }
  async updatePassword(email: string, password: string) {
    const hashedPassword = createHash(password);
    await UserModel.updateOne({ email }, { password: hashedPassword });
  }
  async updateRole(userId: string, role: string) {
    await UserModel.updateOne({ _id: userId }, { role });
  }
  async updateConnectionDate(userId: string) {
    await UserModel.updateOne({ _id: userId }, { last_connection: Date.now() });
  }
  async uploadDocuments(userId: string, files: Express.Multer.File[]) {
    const documents = files.map((file) => {
      return { name: file.filename, reference: file.path };
    });
    await UserModel.updateOne({ _id: userId }, { documents });
  }
  async getAllUsers() {
    const users = (await UserModel.find()) as User[];
    return users;
  }
  async deleteUsers(users: User[]) {
    const deleteManyQuery = {
      _id: {
        $in: users.map((user) => user._id),
      },
    };
    await UserModel.deleteMany(deleteManyQuery);
  }
}

const usersDao = new UsersDao();
export default usersDao;
