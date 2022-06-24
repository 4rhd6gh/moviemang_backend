import jwt from "jsonwebtoken";
import "dotenv/config";
import * as util from "../util/util.js";
import * as authModel from "../model/auth.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_EXPIRES_IN_DAYS = process.env.JWT_EXPIRES_IN_DAYS;

export async function login(req, res) {
  const { loginType, code } = req.body;
  console.log("client에서 오는 값들", loginType, code);
  let tokens;
  let userSub;
  //로그인 수단별 분기 로직
  if (loginType === "google") {
    tokens = await util.getGoogleTokens(code);
    userSub = await util.getGoogleIdentification(tokens.accessToken);
  } else if (loginType === "kakao") {
    tokens = await util.getKakaoTokens(code);
    userSub = await util.getKakaoIdentification(tokens.accessToken);
  } else if (loginType === "naver") {
    tokens = await util.getNaverTokens(code);
    userSub = await util.getNaverIdentification(tokens.accessToken);
  } else {
    return res.status(400).json({ message: "잘못된 로그인 수단입니다." });
  }

  //userSub 정보로 db에서 유저 아이디 조회
  const userInfo = await authModel.getUserInfo(userSub);
  if (userInfo) {
    //유저 아이디가 있다면 토큰 생성
    const resTokens = createTokens(tokens, userInfo.id);
    return res.status(200).json({
      message: "로그인 성공",
      token: resTokens.token,
      refreshToken: resTokens.refreshToken,
      nickname: userInfo.nickname,
      loginType,
    });
  } else {
    //유저 정보 없을 경우 유저 생성
    //TODO 보안 고려 - 닉네임 서버에서 다시 받을 시 client에서 요구할 파라미터 정의 필요
    const accessToken = tokens.accessToken;
    const refreshToken = tokens.refreshToken;
    return res.status(200).json({
      status: "noUser",
      message: "닉네임을 설정해 주세요.",
      accessToken,
      refreshToken,
      userSub,
      loginType,
    });
  }
}

export async function join(req, res) {
  const { nickname, userSub, accessToken, loginType, refreshToken } = req.body;
  console.log(
    "client에서 오는 값들",
    nickname,
    userSub,
    accessToken,
    loginType,
    refreshToken
  );
  let proveUserSub;
  if (loginType === "google") {
    proveUserSub = await util.getGoogleIdentification(accessToken);
  } else if (loginType === "kakao") {
    proveUserSub = await util.getKakaoIdentification(accessToken);
  } else if (loginType === "naver") {
    proveUserSub = await util.getNaverIdentification(accessToken);
  } else {
    return res.status(400).json({ message: "잘못된 로그인 수단입니다." });
  }
  if (proveUserSub == userSub) {
    // 유저 정보 생성
    const insertId = await authModel.createUserInfo(nickname, userSub);
    // 토큰 생성
    const resTokens = createTokens(accessToken, proveUserSub);
    console.log(resTokens);
    return res.status(200).json({
      message: "회원가입 성공",
      token: resTokens.token,
      refreshToken: refreshToken,
      nickname: nickname,
    });
  } else {
    return res
      .status(400)
      .json({ message: "해당 기관에 유저 정보가 존재하지 않습니다." });
  }
}

export function logout(req, res) {
  res.status(204).json({ message: "Logout success" });
}

function createTokens(tokens, userSub) {
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  const token = jwt.sign({ userSub, accessToken }, ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_EXPIRES_IN_DAYS,
  });
  return { token, refreshToken };
}
