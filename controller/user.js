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

export async function getPlaylistTags(req, res) {
  const { playlistId } = req.params;
  const userSub = util.getUserSubFormToken(req);
  const tags = await userModel.getPlaylistTags(userSub);
  return res.status(200).json({
    tags,
  });
}
