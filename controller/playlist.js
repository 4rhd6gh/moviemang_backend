import "dotenv/config";
import * as util from "../util/util.js";
import * as playlistModel from "../model/playlist.js";
import * as myplaylistModel from "../model/myplaylist.js";

export async function likeOrder(req, res) {
  const playList = await playlistModel.getPlayListLikeOrder();
  if (playList.length > 0) {
    for (let i = 0; i < playList.length; i++) {
      const playListMovie = await myplaylistModel.getPlayListMovie(
        playList[i].playlistId
      );
      playList[i].movies = playListMovie;
    }

    for (let i = 0; i < playList.length; i++) {
      const playListTag = await myplaylistModel.getPlayListTag(
        playList[i].playlistId
      );
      playList[i].tags = playListTag;
    }
    for (let i = 0; i < playList.length; i++) {
      const playListLike = await myplaylistModel.getLikeCount(
        playList[i].playlistId
      );
      playList[i].like = playListLike;
    }
  }
  return res.status(200).json({
    playList,
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

export async function getPopularTag(req, res) {
  const popularTag = await playlistModel.getPopularTag();
  return res.status(200).json({
    popularTag,
  });
}
