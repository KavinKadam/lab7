import express from "express";
import { ensureAdmin } from "../middleware/checkAuth";
import { sessionStore } from "../middleware/sessionStore";

const router = express.Router();

router.use(ensureAdmin);

// one row on the admin table
type SessionRow = {
  sessionId: string;
  userId: string;
};

// pulls every logged-in session out of the store
const listLoggedInSessions = (): Promise<SessionRow[]> => {
  return new Promise((resolve, reject) => {
    sessionStore.all((err, sessions) => {
      if (err) {
        reject(err);
        return;
      }
      if (!sessions) {
        resolve([]);
        return;
      }

      const rows = Object.entries(sessions)
        .filter(([, data]) => data.passport?.user != null)
        .map(([sessionId, data]) => ({
          sessionId,
          userId: String(data.passport?.user),
        }));
      resolve(rows);
    });
  });
};

// shows the session table
router.get("/", async (req, res) => {
  try {
    const sessions = await listLoggedInSessions();
    res.render("admin", {
      sessions,
      currentSessionId: req.sessionID,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not load sessions");
  }
});

// kills one session if it is really in the store
router.post("/revoke/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  sessionStore.get(sessionId, (err, sess) => {
    if (err || !sess) {
      return res.redirect("/admin");
    }
    sessionStore.destroy(sessionId, () => {
      res.redirect("/admin");
    });
  });
});

export default router;
