export default class SessionsDTO {
    constructor(currentUser) {
        const { _id, email, first_name, last_name, age, role, cartId } = currentUser;
        const cleanUser = { _id, email, first_name, last_name, role, age, cartId };
        this.user = cleanUser;
    }
}
