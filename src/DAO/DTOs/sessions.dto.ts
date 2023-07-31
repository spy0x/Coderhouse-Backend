export default class SessionsDTO {
  
  user: Omit<User, "password">;

  constructor(currentUser: User){
    const { _id, email, first_name, last_name, age, role, cartId } = currentUser;
    const cleanUser = { _id, email, first_name, last_name, role, age, cartId };
    this.user = cleanUser;
  }
}

