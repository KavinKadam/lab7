import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { checkLocalLogin, getUserById } from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  // checks the email first, then the password, and says which one failed
  (email, password, done) => {
    const result = checkLocalLogin(email, password);
    if ("message" in result) {
      return done(null, false, { message: result.message });
    }
    return done(null, result.user);
  }
);

// sticks just the user id into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// pulls the full user back out on the next request
passport.deserializeUser((id: string | number, done) => {
  const user = getUserById(id);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
