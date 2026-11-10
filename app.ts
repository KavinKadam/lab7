// loads .env before the github strategy reads the keys
import "dotenv/config";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from "./middleware/passportMiddleware";
import { sessionStore } from "./middleware/sessionStore";

const port = process.env.port || 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// session cookie, kept in the store the admin page can list
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";
import adminRoute from "./routes/adminRoute";

app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
