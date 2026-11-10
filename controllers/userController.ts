import { User } from "../interfaces";
import { userModel } from "../models/userModel";

export type LoginResult = { user: User } | { message: string };

// says if the email is missing or the password is wrong
const checkLocalLogin = (email: string, password: string): LoginResult => {
  const user = userModel.findOne(email);
  if (!user) {
    return { message: `Couldn't find user with email: ${email}` };
  }
  if (!isUserValid(user, password)) {
    return { message: "Password is incorrect" };
  }
  return { user };
};

// loads the user again from the id saved in the session
const getUserById = (id: number | string): User | null => {
  return userModel.findById(id);
};

// true when the typed password matches the one we stored
function isUserValid(user: User, password: string): boolean {
  return user.password === password;
}

export { checkLocalLogin, getUserById };
