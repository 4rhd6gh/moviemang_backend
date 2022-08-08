import "dotenv/config";
import * as util from "../util/util.js";
import * as playlistModel from "../model/playlist.js";

export async function likeOrder(req, res) {
  const playListArray = await playlistModel.getPlayListLikeOrder();
  return res.status(200).json({
    playListArray,
  });
}

export async function likePlaylist(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { playlistId } = req.body;
  await playlistModel.likePlaylist(playlistId, userSub);
  res.status(204).json({ message: `좋아요 완료` });
}

export async function unlikePlaylist(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { playlistId } = req.body;
  await playlistModel.unlikePlaylist(playlistId, userSub);
  res.status(204).json({ message: `좋아요 취소 완료` });
}
