import session from "express-session";

// shared store so the admin page can list sessions and delete one
export const sessionStore = new session.MemoryStore();
