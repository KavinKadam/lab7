import { Strategy } from "passport";

export type Role = "user" | "admin";

export interface User {
  id: number | string;
  name: string;
  email?: string;
  password?: string;
  role: Role;
}

export interface PassportStrategy {
  name: string;
  strategy: Strategy;
}

declare global {
  namespace Express {
    interface User {
      id: number | string;
      name: string;
      email?: string;
      password?: string;
      role: Role;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    messages?: string[];
    passport?: {
      user?: string | number;
    };
  }
}
