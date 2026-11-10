import { NextFunction, Request, Response } from "express";

// lets logged in people through, everyone else goes to login
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

// keeps logged in people off the login page
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

// only admins get in, everyone else gets a 403
export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }
  if (req.user?.role !== "admin") {
    return res.status(403).send("You do not have admin access");
  }
  return next();
};
