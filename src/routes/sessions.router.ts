import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";

const sessionsRouter = Router();
export default sessionsRouter;

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failRegister", session: true }),
  sessionsController.register
);

sessionsRouter.get("/failRegister", sessionsController.failRegister);

sessionsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin", session: true }),
  sessionsController.login
);

sessionsRouter.get("/faillogin", sessionsController.failLogin);

sessionsRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

sessionsRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  sessionsController.githubLogin
);

sessionsRouter.get("/logout", sessionsController.logout);

//Get the cartID from the current session
sessionsRouter.get("/cart", sessionsController.getSessionCart);

sessionsRouter.get("/current", sessionsController.getSessionData);
