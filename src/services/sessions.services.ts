import { usersDao } from "../DAO/factory.js";

class SessionService {
  async getCurrentUser(id: string) {
    const user = await usersDao.getUser(id);
    return user;
  }
}

const sessionService = new SessionService();
export default sessionService;
