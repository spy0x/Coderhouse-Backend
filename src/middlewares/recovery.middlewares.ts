import { NextFunction, Request, Response } from "express";
import { UserModel } from "../DAO/mongo/models/users.models.js";
import { usersDao } from "../DAO/factory.js";
import mongoose from "mongoose";
import { compareHash } from "../utils/passwordCrypt.js";

export const emailExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return next();
  }
  return res.status(404).json({ status: "error", message: "Email not found" });
}

export const recoveryTicketExists = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body;
  if (!mongoose.Types.ObjectId.isValid(code)) {
    return res.status(404).json({ status: "error", message: "Invalid product ID" });
  }
  const ticket = await usersDao.getRecoveryTicketById(code);
  if (ticket) {
    return next();
  }
  return res.status(404).json({ status: "error", message: "Ticket not found or has expired." });
}

export const isSamePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, code } = req.body;
  const ticket = await usersDao.getRecoveryTicketById(code);
  const user = await UserModel.findOne({ email: ticket.email });
  if (!compareHash(password, user?.password as string)) {
    return next();
  }
  return res.status(400).json({ status: "error", message: "You can't use the same previous password!" });
}