import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

// shows the login page and the latest error, then clears it
router.get("/login", forwardAuthenticated, (req, res) => {
  const messages = req.session.messages ?? [];
  const error = messages.at(-1) ?? null;
  req.session.messages = [];
  res.render("login", { error });
});

// checks the local strategy and keeps the error for the login page
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })
);

// sends the browser to github to log in
router.get("/github", passport.authenticate("github"));

// github sends them back here, then we drop them on the dashboard
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
