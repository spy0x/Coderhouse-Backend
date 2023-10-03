
// Removes field password from user object
export default class UsersDTO {
  
  user: User;

  constructor(currentUser: User){
    const { _id, email, first_name, last_name, age, role, cartId } = currentUser;
    const cleanUser: User = { _id, email, first_name, last_name, role, age, cartId };
    this.user = cleanUser;
  }
}

