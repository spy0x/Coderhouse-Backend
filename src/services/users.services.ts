import { UserModel } from "../models/users.models.js";
import { createHash, compareHash } from "../utils/passwordCrypt.js";

export default class UserService {
  async addUser(
    first_name: string,
    last_name: string,
    email: string,
    age: number,
    password: string,
    role: string = "user"
  ): Promise<ResResult> {
    try {
      const user = await UserModel.create({ first_name, last_name, email, age, password: createHash(password), role });
      return { code: 201, result: { status: "success", message: "User created successfully", payload: user } };
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error adding user" } };
    }
  }
  async login(email: string, password: string): Promise<ResResult> {
    try {
      const account = await UserModel.findOne({ email });
      if (account) {
        if (!compareHash(password, account.password)) {
          return { code: 404, result: { status: "error", message: "Wrong user or password!" } };
        }
        return { code: 200, result: { status: "success", message: "User logged in successfully", payload: account } };
      } else {
        return { code: 404, result: { status: "error", message: "Account does not exists!" } };
      }
    } catch (error) {
      return { code: 400, result: { status: "error", message: "Error logging in" } };
    }
  }
}
