import { Router } from "express";
import UserService from "../services/users.services.js";

const sessionsRouter = Router();
const usersService = new UserService();

sessionsRouter.post("/", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;
  console.log(req.body);
  const response = await usersService.addUser(first_name, last_name, email, age, password, role);
  return res.status(response.code).json(response.result);
});

export default sessionsRouter;
