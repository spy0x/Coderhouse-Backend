import passport from "passport";
import local from "passport-local";
import { UserModel } from "../models/users.models.js";
import { compareHash, createHash } from "../utils/passwordCrypt.js";

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
          const { email, first_name, last_name, age, role } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            email,
            age,
            first_name,
            last_name,
            role,
            password: createHash(password),
          };
          let userCreated = (await UserModel.create(newUser)) as Express.User;
          console.log(userCreated);
          console.log("User Registration succesful");
          return done(null, userCreated);
        } catch (e) {
          console.log("Error in register");
          console.log(e);
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
