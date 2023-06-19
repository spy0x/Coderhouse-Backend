import { Router } from "express";
import UserService from "../services/users.services.js";
const sessionsRouter = Router();
const usersService = new UserService();
sessionsRouter.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    const response = await usersService.addUser(first_name, last_name, email, age, password, role);
    return res.status(response.code).json(response.result);
});
sessionsRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const response = await usersService.login(email, password);
    // if login success, save user in session and redirect to products page
    if (response.code === 200) {
        req.session.user = response.result.payload;
    }
    return res.status(response.code).json(response.result);
});
sessionsRouter.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error! Couldn't logout!" });
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logout succesfully!" });
    });
});
export default sessionsRouter;
