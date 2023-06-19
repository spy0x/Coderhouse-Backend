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
}
