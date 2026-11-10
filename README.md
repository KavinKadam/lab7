# Lab 7 Passport Auth

This app has a normal email login, a GitHub login, and an admin page that can kick someone out by deleting their session.

## Run it

```bash
npm install
npm start
```

Then open `http://localhost:8000`. The login page is at `/auth/login`.

## GitHub login

Local login works out of the box. GitHub login needs a real OAuth app.

Create one on GitHub with the homepage `http://localhost:8000` and this callback:

`http://localhost:8000/auth/github/callback`

Put the keys in a `.env` file in this folder. Leave that file out of git. `.gitignore` already ignores it.

```
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:8000/auth/github/callback
SESSION_SECRET=some_long_random_string
```

Restart the server after you save `.env`. The GitHub button reads those values at startup.

## Who you can log in as

Jimmy is the admin: `jimmy123@gmail.com` / `jimmy123!`

Johnny and Jonathan are normal users:

- `johnny123@gmail.com` / `johnny123!`
- `jonathan123@gmail.com` / `jonathan123!`

Once Jimmy is logged in, `/admin` lists the current sessions. Each row has a button that revokes that session. A normal user who opens `/admin` gets a 403.
