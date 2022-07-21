import "dotenv/config";
import * as playlistModel from "../model/playlist.js";

export async function likeOrder(req, res) {
  const playListArray = await playlistModel.getPlayListLikeOrder();
  return res.status(200).json({
    playListArray,
  });
}
