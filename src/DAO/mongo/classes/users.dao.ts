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
}
const usersDao = new UsersDao();
export default usersDao;