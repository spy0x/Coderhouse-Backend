import { Router } from "express";
import passport from "passport";
import usersController from "../controllers/users.controller.js";
import { emailExists, isSamePassword, recoveryTicketExists } from "../middlewares/recovery.middlewares.js";
import { uploaderDocuments } from "../utils/multer.js";
import { isLogged, isUserIdOwner } from "../middlewares/auth.js";
import { isFileEmpty as isFileNotEmpty } from "../middlewares/multer.middleware.js";

const usersRouter = Router();
export default usersRouter;

usersRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failRegister", session: true }),
  usersController.register
);

usersRouter.get("/failRegister", usersController.failRegister);

usersRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin", session: true }),
  usersController.login
);

usersRouter.get("/faillogin", usersController.failLogin);

usersRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

usersRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  usersController.githubLogin
);

usersRouter.get("/logout", usersController.logout);

//Get the cartID from the current session
usersRouter.get("/cart", usersController.getSessionCart);

usersRouter.get("/current", usersController.getSessionData);

usersRouter.post("/recovery", emailExists, usersController.sendRecoveryMail);

usersRouter.put("/recovery", recoveryTicketExists, usersController.canGetRecoveryTicket);

usersRouter.delete("/recovery", recoveryTicketExists, isSamePassword, usersController.updatePassword);

usersRouter.get("/premium/:uid", usersController.updateRole);

usersRouter.post("/:uid/documents", uploaderDocuments.array("documents", 3), isFileNotEmpty, usersController.uploadDocuments);