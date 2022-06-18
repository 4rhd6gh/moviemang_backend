import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export async function googleAccess(code) {
  console.log(GOOGLE_CLIENT_ID);
  const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
  );
  const ticket = await client.getToken(code);
  const accessToken = ticket.tokens.access_token;
  const refreshToken = ticket.tokens.refresh_token;

  const userSub = await client.getTokenInfo(accessToken);

  console.log(ticket.tokens.access_token);
  console.log(userSub.sub);
}
