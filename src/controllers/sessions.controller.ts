import sessionService from "../services/sessions.services.js";
import SessionsDTO from "../DAO/DTOs/sessions.dto.js";

class SessionsController {
  register(req: any, res: any) {
    return res.status(201).json({ status: "success", message: "User created successfully", payload: req.user });
  }
  failRegister(req: any, res: any) {
    return res.status(400).json({ status: "error", message: "Error adding user" });
  }
  login(req: any, res: any) {
    if (!req.user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const { _id, email, first_name, last_name, age, role, cartId } = req.user;
    req.session.user = { _id, email, first_name, last_name, role, age, cartId };
    return res.status(200).json({ status: "success", message: "User logged in successfully", payload: req.session.user });
  }
  failLogin(req: any, res: any) {
    return res.status(400).json({ status: "error", message: "Wrong user or password" });
  }
  githubLogin(req: any, res: any) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/");
  }
  logout(req: any, res: any) {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Error! Couldn't logout!" });
      }
      res.clearCookie("connect.sid");
      res.clearCookie("cartId");
      return res.status(200).json({ status: "success", message: "Logout succesfully!" });
    });
  }
  getSessionCart(req: any, res: any) {
    if (req.session.user) {
      return res.status(200).json({ status: "success", message: "Cart found", payload: req.session.user.cartId });
    } else {
      return res.status(400).json({ status: "error", message: "Cart not found" });
    }
  }
  async getSessionData(req: any, res: any) {
    try {
      if (req.session.user) {
        const user = await sessionService.getCurrentUser(req.session.user._id) as Express.User;
        const cleanUser = new SessionsDTO(user);
        return res.status(200).json({ status: "success", message: "User found", payload: cleanUser.user });
      } else {
        return res.status(400).json({ status: "error", message: "User not found" });
      }
    } catch (e) {
      return res.status(400).json({ status: "error", message: "Couldn't get user" });
    }
  }
}

const sessionsController = new SessionsController();
export default sessionsController;
