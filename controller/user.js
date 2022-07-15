import "dotenv/config";
import * as userModel from "../model/user.js";
import * as util from "../util/util.js";

export async function updateNickname(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { nickname } = req.body;
  const updated = await userModel.updateNickname(nickname, userSub);
  return res.status(200).json({
    nickname,
    message: `닉네임이 수정되었습니다.`,
  });
}

export async function updateLike(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { like } = req.body;
  const updated = await userModel.updateLike(like, userSub);
  return res.status(200).json({
    like,
    message: `좋아요가 수정되었습니다.`,
  });
}
