import { Router } from "express";
import passport from "passport";
import { UserModel } from "../models/users.models.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failRegister", session: true }),
  async (req, res) => {
    if (req.user) {
      req.session.cartId = req.user.cartId;
      req.session.save();
      res.cookie("cartId", req.user.cartId, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // 365 days
    }
    return res.status(201).json({ status: "success", message: "User created successfully", payload: req.user });
  }
);

sessionsRouter.get("/failRegister", (req, res) => {
  return res.status(400).json({ status: "error", message: "Error adding user" });
});

sessionsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin", session: true }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const { _id, email, first_name, last_name, age, role, cartId } = req.user;
    req.session.user = { _id, email, first_name, last_name, role, age, cartId };
    req.session.cartId = req.user.cartId;
    req.session.save();
    res.cookie("cartId", req.user.cartId, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // 365 days
    return res.status(200).json({ status: "success", message: "User logged in successfully", payload: req.session.user });
  }
);

sessionsRouter.get("/faillogin", (req, res) => {
  return res.status(400).json({ status: "error", message: "Wrong user or password" });
});

sessionsRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

sessionsRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  async (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    req.session.cartId = req.user?.cartId;
    req.session.save();
    res.cookie("cartId", req.user?.cartId, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // 365 days
    res.redirect("/");
  }
);

sessionsRouter.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Error! Couldn't logout!" });
    }
    res.clearCookie("connect.sid");
    res.clearCookie('cartId');
    return res.status(200).json({ status: "success", message: "Logout succesfully!" });
  });
});

//Get the cartID from the current session
sessionsRouter.get("/cart", async (req, res) => {
  if (req.session.cartId) {
    return res.status(200).json({ status: "success", message: "Cart found", payload: req.cookies.cartId });
  } else {
    return res.status(400).json({ status: "error", message: "Cart not found" });
  }
});

sessionsRouter.get("/current", async (req, res) => {
  if (req.session.user) {
    const user = await UserModel.findById(req.session.user._id).populate({
      path: "cartId",
      populate: {
        path: "productos.idProduct",
      },
    });
    return res.status(200).json({ status: "success", message: "User found", payload: user });
  } else {
    return res.status(400).json({ status: "error", message: "User not found" });
  }
});

export default sessionsRouter;
