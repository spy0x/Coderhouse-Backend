import passport from "passport";
import local from "passport-local";
import { UserModel } from "../models/users.models.js";
import { compareHash, createHash } from "../utils/passwordCrypt.js";
import GitHubStrategy from "passport-github2";
import fetch from "node-fetch";
import CartService from "../services/carts.services.js";
import dotenv from "dotenv";
dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const LocalStrategy = local.Strategy;
export default function initPassport() {
    passport.use("login", new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, username, password, done) => {
        try {
            const user = (await UserModel.findOne({ email: username }));
            if (!user) {
                console.log("User Not Found with username (email) " + username);
                return done(null, false);
            }
            if (!compareHash(password, user.password)) {
                console.log("Invalid Password");
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }));
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
    }, async (req, username, password, done) => {
        try {
            const { email, first_name, last_name, age } = req.body;
            const user = await UserModel.findOne({ email: username });
            // check if user already exists
            if (user) {
                console.log("User already exists");
                return done(null, false);
            }
            const cartId = await generateCartId();
            const newUser = {
                email,
                age,
                first_name,
                last_name,
                role: "user",
                password: createHash(password),
                cartId,
            };
            const userCreated = (await UserModel.create(newUser));
            // console.log(userCreated);
            // console.log("User Registration succesful");
            return done(null, userCreated);
        }
        catch (e) {
            console.log("Error in register");
            return done(e);
        }
    }));
    passport.use("github", 
    // @ts-ignore: TS2351 - This expression is not constructable.
    new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        passReqToCallback: true,
    }, async (req, accesToken, refreshToken, profile, done) => {
        try {
            const resEmail = await fetch("https://api.github.com/user/emails", {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: "Bearer " + accesToken,
                    "X-Github-Api-Version": "2022-11-28",
                },
            });
            const emails = await resEmail.json();
            const emailDetail = emails.find((email) => email.verified == true);
            if (!emailDetail) {
                return done(new Error("cannot get a valid email for this user"));
            }
            profile.email = emailDetail.email;
            console.log(profile);
            const user = (await UserModel.findOne({ email: profile.email }));
            // if user does not exists, create a new one
            if (!user) {
                const cartId = await generateCartId();
                const newUser = {
                    email: profile.email,
                    first_name: profile._json.name || profile._json.login || "noname",
                    role: "user",
                    password: "nopass",
                    cartId,
                };
                const userCreated = (await UserModel.create(newUser));
                console.log("User Registration succesful");
                return done(null, userCreated);
            }
            else {
                console.log("User already exists. Not creating another one!");
                return done(null, user);
            }
        }
        catch (e) {
            console.log("Error in Auth GitHub!");
            return done(e);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = (await UserModel.findById(id));
        done(null, user);
    });
}
// If the current cartID is already in use, create a new cart for the new user.
const generateCartId = async () => {
    const cartService = new CartService();
    const { result: { payload: newCart }, } = await cartService.addCart();
    return newCart._id;
};
