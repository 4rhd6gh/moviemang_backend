import "dotenv/config";
import * as util from "../util/util.js";
import * as myplaylistModel from "../model/myplaylist.js";

export async function createPlayList(req, res) {
  const userSub = util.getUserSubFormToken(req);

  const { playlistName, playlistTitle, playlistDesc } = req.body;
  const playlistId =
    userSub + new Date().getTime() + Math.floor(Math.random() * 100);

  const newPlaylistId = await myplaylistModel.createPlayList(
    playlistId,
    userSub,
    playlistName,
    playlistTitle,
    playlistDesc
  );

  return res.status(200).json({
    newPlaylistId,
    message: `playlist가 생성되었습니다.`,
  });
}