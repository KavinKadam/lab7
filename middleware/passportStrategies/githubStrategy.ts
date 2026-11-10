import { Profile, Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { userModel } from "../../models/userModel";

// shape of the callback github calls when verify finishes
type GithubDone = (
  err?: Error | null | unknown,
  user?: Express.User | false,
  info?: object
) => void;

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || "missing-client-id",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "missing-client-secret",
    callbackURL:
      process.env.GITHUB_CALLBACK_URL || "http://localhost:8000/auth/github/callback",
  },
  // reuses a github user if we have one, otherwise makes a new one
  (accessToken: string, refreshToken: string, profile: Profile, done: GithubDone) => {
    const existing = userModel.findById(profile.id);
    if (existing) {
      return done(null, existing);
    }

    const created = userModel.create({
      id: profile.id,
      name: profile.displayName || profile.username || "github user",
      role: "user",
    });
    return done(null, created);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
