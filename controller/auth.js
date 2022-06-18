import jwt from "jsonwebtoken";
import "dotenv/config";
import * as util from "../util/util.js";

export async function login(req, res) {
  const { loginType, code, status } = req.body;
  console.log(code);
  if (loginType === "google") {
    const accessToken = await util.googleAccess(code);
  }
}
