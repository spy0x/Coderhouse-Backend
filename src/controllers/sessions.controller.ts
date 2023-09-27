import sessionService from "../services/sessions.services.js";
import SessionsDTO from "../DAO/DTOs/sessions.dto.js";
import { Request, Response } from "express";
import transporter from "../utils/nodemailer.js";
class SessionsController {
  async updateRole(req: Request, res: Response) {
    const response = await sessionService.updateRole(req.params.uid);
    return res.status(response.code).json(response.result);
  }
  register(req: Request, res: Response) {
    return res.status(201).json({ status: "success", message: "User created successfully", payload: req.user });
  }
  failRegister(req: Request, res: Response) {
    return res.status(400).json({ status: "error", message: "Error adding user" });
  }
  async login(req: Request, res: Response) {
    if (!req.user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    req.session.user = req.user;
    const cleanUser = new SessionsDTO(req.session.user);
    await sessionService.updateConnectionDate(req.session.user._id);
    return res.status(200).json({ status: "success", message: "User logged in successfully", payload: cleanUser.user });
  }
  failLogin(req: Request, res: Response) {
    return res.status(400).json({ status: "error", message: "Wrong user or password" });
  }
  githubLogin(req: Request, res: Response) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/");
  }
  async logout(req: Request, res: Response) {
    if (req.session.user) {
      await sessionService.updateConnectionDate(req.session.user._id);
    }
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
        const user = (await sessionService.getCurrentUser(req.session.user._id)) as Express.User;
        const cleanUser = new SessionsDTO(user);
        return res.status(200).json({ status: "success", message: "User found", payload: cleanUser.user });
      } else {
        return res.status(400).json({ status: "error", message: "User not found" });
      }
    } catch (e) {
      return res.status(400).json({ status: "error", message: "Couldn't get user" });
    }
  }
  async sendRecoveryMail(req: Request, res: Response) {
    const { email } = req.body;
    const response: ResResult = await sessionService.createRecoveryTicket(email as string);
    const URL = process.env.NODE_ENV === "PRODUCTION" ? process.env.PROD_URL : "http://localhost:8080";
    if (response.code == 201) {
      await transporter.sendMail({
        from: "Los Tres Primos <fvd.coderbackend@gmail.com>",
        to: email as string,
        subject: "Password Recovery",
        html: `<h1>LTP Password Recovery</h1><p>Click <a href='${URL}/recovery?code=${response.result.payload._id}'>here</a> to recover your password</p><caption>Link expires in 60 minutes</caption>`,
      });
    }
    return res.status(response.code).json(response.result);
  }
  async updatePassword(req: Request, res: Response) {
    const { code, password } = req.body;
    const response: ResResult = await sessionService.updatePassword(password, code);
    return res.status(response.code).json(response.result);
  }
  async canGetRecoveryTicket(req: Request, res: Response) {
    return res.status(200).json({ status: "success", message: "Ticket found" });
  }
  async uploadDocuments(req: Request, res: Response) {
    const { uid } = req.params;
    const response: ResResult = await sessionService.uploadDocuments(uid, req.files as Express.Multer.File[]);
    return res.status(response.code).json(response.result);
  }
}

const sessionsController = new SessionsController();
export default sessionsController;
