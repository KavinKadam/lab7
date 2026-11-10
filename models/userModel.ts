import { User } from "../interfaces";

const database: User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  // finds a user by email, or nothing if that email is new
  findOne: (email: string): User | null => {
    const user = database.find((user) => user.email === email);
    return user ?? null;
  },

  // finds a user by the id we stuck in the session
  findById: (id: number | string): User | null => {
    const user = database.find((user) => String(user.id) === String(id));
    return user ?? null;
  },

  // saves a github user the first time they show up
  create: (user: User): User => {
    database.push(user);
    return user;
  },
};

export { database, userModel };
