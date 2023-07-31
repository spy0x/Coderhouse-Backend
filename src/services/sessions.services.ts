import usersDao from "../dao/mongo/classes/users.dao.js";

class SessionService {
  async getCurrentUser(id: string) {
    return await usersDao.getUser(id);
  }
}

const sessionService = new SessionService();
export default sessionService;
