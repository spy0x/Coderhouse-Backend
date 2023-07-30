import sessionService from "../services/sessions.services.js";
class SessionsController {
    register(req, res) {
        return res.status(201).json({ status: "success", message: "User created successfully", payload: req.user });
    }
    failRegister(req, res) {
        return res.status(400).json({ status: "error", message: "Error adding user" });
    }
    login(req, res) {
        if (!req.user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const { _id, email, first_name, last_name, age, role, cartId } = req.user;
        req.session.user = { _id, email, first_name, last_name, role, age, cartId };
        return res.status(200).json({ status: "success", message: "User logged in successfully", payload: req.session.user });
    }
    failLogin(req, res) {
        return res.status(400).json({ status: "error", message: "Wrong user or password" });
    }
    githubLogin(req, res) {
        // Successful authentication, redirect home.
        req.session.user = req.user;
        res.redirect("/");
    }
    logout(req, res) {
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
                const user = await sessionService.getCurrentUser(req.session.user._id);
                return res.status(200).json({ status: "success", message: "User found", payload: user });
            }
            else {
                return res.status(400).json({ status: "error", message: "User not found" });
            }
        }
        catch (e) {
            return res.status(400).json({ status: "error", message: "Couldn't get user" });
        }
    }
}
const sessionsController = new SessionsController();
export default sessionsController;
