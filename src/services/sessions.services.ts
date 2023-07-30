import { UserModel } from "../models/users.models.js";

class SessionService {
  async getCurrentUser(id: string) {
    const user = await UserModel.findById(id).populate({
      path: "cartId",
      populate: {
        path: "productos.idProduct",
      },
    });
    return user;
  }
}

const sessionService = new SessionService();
export default sessionService;
