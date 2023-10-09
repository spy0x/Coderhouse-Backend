// Removes field password from user object
export default class UsersDTO {
    constructor(currentUser) {
        const { _id, email, first_name, last_name, age, role, cartId } = currentUser;
        const cleanUser = { _id, email, first_name, last_name, role, age, cartId };
        this.user = cleanUser;
    }
}
