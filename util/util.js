import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import jwt from "jsonwebtoken";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
const KAKAO_REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URL = process.env.NAVER_REDIRECT_URL;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

export function getUserSubFormToken(req) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return null;

  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
  return decoded.userSub;
}

export async function getGoogleTokens(code) {
  const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL
  );
  const ticket = await client.getToken(code);
  const accessToken = ticket.tokens.access_token;
  const refreshToken = ticket.tokens.refresh_token;

  return { accessToken, refreshToken };
}

export async function getGoogleIdentification(accessToken) {
  const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL
  );
  const userSub = await client.getTokenInfo(accessToken);
  return userSub.sub;
}

export async function getKakaoTokens(code) {
  try {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    const body = {
      grant_type: "authorization_code",
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_REDIRECT_URL,
      code,
      client_secret: KAKAO_CLIENT_SECRET,
    };
    const response = await axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      params: body,
      headers,
      data: body,
    });
    const json = await response.data;
    const accessToken = json.access_token;
    const refreshToken = json.refresh_token;

    return { accessToken, refreshToken };
  } catch (e) {
    return e;
  }
}

export async function getKakaoIdentification(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await axios({
    method: "get",
    url: "https://kapi.kakao.com/v1/user/access_token_info",
    headers,
  });
  return response.data.id;
}

export async function getNaverTokens(code) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  const body = {
    grant_type: "authorization_code",
    client_id: NAVER_CLIENT_ID,
    redirect_uri: NAVER_REDIRECT_URL,
    code,
    client_secret: NAVER_CLIENT_SECRET,
  };
  const response = await axios({
    method: "post",
    url: "https://nid.naver.com/oauth2.0/token",
    params: body,
    headers,
    data: body,
  });
  const json = await response.data;
  const accessToken = json.access_token;
  const refreshToken = json.refresh_token;

  console.log(accessToken);
  return { accessToken, refreshToken };
}

export async function getNaverIdentification(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await axios({
    method: "get",
    url: "https://openapi.naver.com/v1/nid/me",
    headers,
  });
  console.log(response.data.response);
  return response.data.response.id;
}
