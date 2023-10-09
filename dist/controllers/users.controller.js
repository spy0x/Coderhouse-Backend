import userService from "../services/users.services.js";
import UsersDTO from "../DAO/DTOs/users.dto.js";
import transporter from "../utils/nodemailer.js";
class UsersController {
    async updateRole(req, res) {
        const response = await userService.updateRole(req.params.uid);
        return res.status(response.code).json(response.result);
    }
    async updateToRole(req, res) {
        const response = await userService.updateToRole(req.params.uid, req.body.role);
        return res.status(response.code).json(response.result);
    }
    register(req, res) {
        return res.status(201).json({ status: "success", message: "User created successfully", payload: req.user });
    }
    failRegister(req, res) {
        return res.status(400).json({ status: "error", message: "Error adding user" });
    }
    async login(req, res) {
        if (!req.user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        req.session.user = req.user;
        const cleanUser = new UsersDTO(req.session.user);
        await userService.updateConnectionDate(req.session.user._id);
        return res.status(200).json({ status: "success", message: "User logged in successfully", payload: cleanUser.user });
    }
    failLogin(req, res) {
        return res.status(400).json({ status: "error", message: "Wrong user or password" });
    }
    githubLogin(req, res) {
        // Successful authentication, redirect home.
        req.session.user = req.user;
        res.redirect("/");
    }
    async logout(req, res) {
        if (req.session.user) {
            await userService.updateConnectionDate(req.session.user._id);
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Error! Couldn't logout!" });
            }
            res.clearCookie("connect.sid");
            res.clearCookie("cartId");
            return res.status(200).json({ status: "success", message: "Logout succesfully!" });
        });
    }
    getSessionCart(req, res) {
        if (req.session.user) {
            return res.status(200).json({ status: "success", message: "Cart found", payload: req.session.user.cartId });
        }
        else {
            return res.status(400).json({ status: "error", message: "Cart not found" });
        }
    }
    async getSessionData(req, res) {
        try {
            if (req.session.user) {
                const user = (await userService.getCurrentUser(req.session.user._id));
                const cleanUser = new UsersDTO(user);
                return res.status(200).json({ status: "success", message: "User found", payload: cleanUser.user });
            }
            else {
                return res.status(400).json({ status: "error", message: "User not found" });
            }
        }
        catch (e) {
            return res.status(400).json({ status: "error", message: "Couldn't get user" });
        }
    }
    async sendRecoveryMail(req, res) {
        const { email } = req.body;
        const response = await userService.createRecoveryTicket(email);
        const URL = process.env.NODE_ENV === "PRODUCTION" ? process.env.PROD_URL : "http://localhost:8080";
        if (response.code == 201) {
            await transporter.sendMail({
                from: "Los Tres Primos <fvd.coderbackend@gmail.com>",
                to: email,
                subject: "Password Recovery",
                html: `<h1>LTP Password Recovery</h1><p>Click <a href='${URL}/recovery?code=${response.result.payload._id}'>here</a> to recover your password</p><caption>Link expires in 60 minutes</caption>`,
            });
        }
        return res.status(response.code).json(response.result);
    }
    async updatePassword(req, res) {
        const { code, password } = req.body;
        const response = await userService.updatePassword(password, code);
        return res.status(response.code).json(response.result);
    }
    async canGetRecoveryTicket(req, res) {
        return res.status(200).json({ status: "success", message: "Ticket found" });
    }
    async uploadDocuments(req, res) {
        const { uid } = req.params;
        const response = await userService.uploadDocuments(uid, req.files);
        return res.status(response.code).json(response.result);
    }
    async getAllUsers(req, res) {
        const response = await userService.getAllUsers();
        return res.status(response.code).json(response.result);
    }
    async cleanUsers(req, res) {
        const response = await userService.cleanUsers();
        return res.status(response.code).json(response.result);
    }
    async deleteUser(req, res) {
        const { uid } = req.params;
        const response = await userService.deleteUser(uid);
        return res.status(response.code).json(response.result);
    }
}
const usersController = new UsersController();
export default usersController;
