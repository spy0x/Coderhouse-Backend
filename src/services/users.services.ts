import { usersDao } from "../DAO/factory.js";
import transporter from "../utils/nodemailer.js";

class UserService {
  async getCurrentUser(id: string) {
    const user = await usersDao.getUser(id);
    return user;
  }
  async createRecoveryTicket(email: string) {
    try {
      const ticket = await usersDao.getRecoveryTicketByEmail(email);
      if (ticket) await usersDao.deleteRecoveryTicket(ticket._id);
      const newTicket = await usersDao.createRecoveryTicket(email);
      return { code: 201, result: { status: "success", message: "Recovery ticket created successfully", payload: newTicket } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error creating recovery ticket" } };
    }
  }
  async updatePassword(password: string, code: string) {
    try {
      const ticket = await usersDao.getRecoveryTicketById(code);
      await usersDao.updatePassword(ticket.email, password);
      await usersDao.deleteRecoveryTicket(code);
      return { code: 200, result: { status: "success", message: "Password updated successfully" } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error updating password" } };
    }
  }
  async updateRole(userId: string) {
    try {
      const user = await usersDao.getUser(userId);
      /* if is role user, check that documents lenght is 3 
      (has to have Identificacion, Comprobante Domicilio and Comprobante de estado de cuenta). 
      If not, return error. */
      if (user.role == "user" && user.documents?.length != 3)
        return { code: 400, result: { status: "error", message: "Documents are required" } };
      const currentRole = user.role;
      if (currentRole == "admin") return { code: 400, result: { status: "error", message: "This user is ADMIN!" } };
      const changeToRole = currentRole == "user" ? "premium" : "user";
      await usersDao.updateRole(userId, changeToRole);
      return {
        code: 200,
        result: { status: "success", message: `Role updated successfully from ${currentRole} to ${changeToRole}` },
      };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error updating role" } };
    }
  }
  async updateToRole(userId: string, role: string) {
    try {
      await usersDao.updateRole(userId, role);
      return {
        code: 200,
        result: { status: "success", message: `Role updated successfully to ${role}` },
      };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error updating role" } };
    }
  }
  async updateConnectionDate(userId: string) {
    await usersDao.updateConnectionDate(userId);
  }
  async uploadDocuments(userId: string, files: Express.Multer.File[]) {
    try {
      const user = await usersDao.getUser(userId);
      await usersDao.uploadDocuments(userId, files);
      return { code: 200, result: { status: "success", message: "Documents uploaded successfully" } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error uploading documents" } };
    }
  }
  async getAllUsers() {
    try {
      const users = await usersDao.getAllUsers();
      const cleanAllUsers = users.map((user) => {
        const cleanUser: User = {
          _id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          last_connection: user.last_connection,
        };
        return cleanUser;
      });
      return { code: 200, result: { status: "success", message: "Users found", payload: cleanAllUsers } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error getting users" } };
    }
  }
  /* 
  Delete all users with last connection is more than 2 days. Ignore role admin and premium 
  */
  async cleanUsers() {
    try {
      const allUsers = await usersDao.getAllUsers();
      const usersToDelete = allUsers.filter((user) => {
        const today = new Date();
        const lastConnection = new Date(user.last_connection as Date);
        const diffTime = Math.abs(today.getTime() - lastConnection.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 2 && user.role == "user";
      });
      await usersDao.deleteUsers(usersToDelete);
      usersToDelete.forEach(async (user) => {
        await transporter.sendMail({
          from: "Los Tres Primos <fvd.coderbackend@gmail.com>",
          to: user.email,
          subject: "Account deleted",
          html: `<h1>LTP NOTICE</h1><p>Your account has been deleted because you have not logged in for more than 2 days.</p>`,
        });
      });
      return { code: 200, result: { status: "success", message: `Deleted ${usersToDelete.length} users!` } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error cleaning users" } };
    }
  }
  async deleteUser(userId: string) {
    try {
      await usersDao.deleteUser(userId);
      return { code: 200, result: { status: "success", message: "User deleted successfully" } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error deleting user" } };
    }
  }
  async getUserTickets(userId: string) {
    try {
      const tickets = await usersDao.getUserTickets(userId);
      return { code: 200, result: { status: "success", message: "Tickets found", payload: tickets } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error getting tickets" } };
    }
  }
}

const userService = new UserService();
export default userService;
