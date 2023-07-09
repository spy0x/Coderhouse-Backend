import passport from "passport";
import local from "passport-local";
import { UserModel } from "../models/users.models.js";
import { compareHash, createHash } from "../utils/passwordCrypt.js";
import GitHubStrategy from "passport-github2";
import fetch from "node-fetch";
import CartService from "../services/carts.services.js";
import { CartModel } from "../models/carts.models.js";

const LocalStrategy = local.Strategy;

export default function initPassport() {
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = (await UserModel.findOne({ email: username })) as Express.User;
        if (!user) {
          console.log("User Not Found with username (email) " + username);
          return done(null, false);
        }
        if (!compareHash(password, user.password)) {
          console.log("Invalid Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { email, first_name, last_name, age } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser: User = {
            email,
            age,
            first_name,
            last_name,
            role: "user",
            password: createHash(password),
            cartId: req.session.cartId as string,
          };
          let userCreated = (await UserModel.create(newUser)) as Express.User;
          // console.log(userCreated);
          // console.log("User Registration succesful");
          return done(null, userCreated);
        } catch (e) {
          console.log("Error in register");
          return done(e);
        }
      }
    )
  );

  passport.use(
    "github",
    // @ts-ignore: TS2351 - This expression is not constructable.
    new GitHubStrategy(
      {
        clientID: "Iv1.b92d6a57a3ad1664",
        clientSecret: "adfd8b0058d44adf99c34cb1ea10b91e537903f7",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        passReqToCallback: true,
      },
      async (req: any, accesToken: any, refreshToken: any, profile: any, done: any) => {
        try {
          const resEmail = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails: any = await resEmail.json();
          const emailDetail = emails.find((email: any) => email.verified == true);

          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;
          console.log(profile);
          const user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            // If the current cartID is already in use, create a new cart for the new user.
            let cartId = req.session.cartId
            if (await UserModel.findOne({ cartId: req.session.cartId })) {
              const cartService = new CartService();
              const {result: {payload: newCart}} = await cartService.addCart();
              cartId = newCart._id.toString()
            }
            const newUser: User = {
              email: profile.email,
              first_name: profile._json.name || profile._json.login || "noname",
              role: "user",
              password: "nopass",
              cartId,
            };
            const userCreated = await UserModel.create(newUser);
            console.log("User Registration succesful");
            return done(null, userCreated);
          } else {
            const userCart = await CartModel.findById(user.cartId);
            const currentCart = await CartModel.findById(req.session.cartId);
            // If current cart has products, place products in user cart.
            if (userCart && currentCart && currentCart.productos) {
              userCart.productos = [...currentCart.productos];
              await userCart.save();
            }
            console.log("User already exists. Not creating another one!");
            return done(null, user);
          }
        } catch (e) {
          console.log("Error in Auth GitHub!");
          return done(e);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = (await UserModel.findById(id)) as Express.User;
    done(null, user);
  });
}
