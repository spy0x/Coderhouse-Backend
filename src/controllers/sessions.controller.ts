import sessionService from "../services/sessions.services.js";
import SessionsDTO from "../DAO/DTOs/sessions.dto.js";
import { Request, Response } from "express";
class SessionsController {
  register(req: Request, res: Response) {
    return res.status(201).json({ status: "success", message: "User created successfully", payload: req.user });
  }
  failRegister(req: Request, res: Response) {
    return res.status(400).json({ status: "error", message: "Error adding user" });
  }
  login(req: Request, res: Response) {
    if (!req.user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    req.session.user = req.user;
    const cleanUser = new SessionsDTO(req.session.user);
    return res.status(200).json({ status: "success", message: "User logged in successfully", payload: cleanUser.user});
  }
  failLogin(req: Request, res: Response) {
    return res.status(400).json({ status: "error", message: "Wrong user or password" });
  }
  githubLogin(req: Request, res: Response) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/");
  }
  logout(req: Request, res: Response) {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Error! Couldn't logout!" });
      }
      res.clearCookie("connect.sid");
      res.clearCookie("cartId");
      return res.status(200).json({ status: "success", message: "Logout succesfully!" });
    });
  }
  getSessionCart(req: Request, res: Response) {
    if (req.session.user) {
      return res.status(200).json({ status: "success", message: "Cart found", payload: req.session.user.cartId });
    } else {
      return res.status(400).json({ status: "error", message: "Cart not found" });
    }
  }
  async getSessionData(req: Request, res: Response) {
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
