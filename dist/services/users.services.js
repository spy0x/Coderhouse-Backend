import { UserModel } from "../models/users.models.js";
export default class UserService {
    async addUser(first_name, last_name, email, age, password, role = "user") {
        try {
            const user = await UserModel.create({ first_name, last_name, email, age, password, role });
            return { code: 201, result: { status: "success", message: "User created successfully", payload: user } };
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error adding user" } };
        }
    }
    async login(email, password) {
        try {
            const account = await UserModel.findOne({ email, password });
            if (account) {
                return { code: 200, result: { status: "success", message: "User logged in successfully", payload: account } };
            }
            else {
                return { code: 404, result: { status: "error", message: "Wrong user or password!" } };
            }
        }
        catch (error) {
            return { code: 400, result: { status: "error", message: "Error logging in" } };
        }
    }
}
