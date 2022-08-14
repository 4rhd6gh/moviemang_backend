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
  const userSub = util.getUserSubFormToken(req);
  const tags = await userModel.getPlaylistTags(userSub);
  return res.status(200).json({
    tags,
  });
}

export async function createPlaylistBookmark(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { playlistId, playlistTitle, nickname } = req.body;
  const bookmark = await userModel.createPlaylistBookmark(
    playlistId,
    userSub,
    playlistTitle,
    nickname
  );
  return res.status(200).json({
    bookmark,
  });
}

export async function deletePlaylistBookmark(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { playlistId } = req.body;
  const bookmark = await userModel.deletePlaylistBookmark(playlistId, userSub);
  return res.status(200).json({
    bookmark,
  });
}

export async function getPlaylistBookmark(req, res) {
  const userSub = util.getUserSubFormToken(req);

  const { page, limit } = req.query;

  const totalCount = await myplaylistModel.getPlayListCount(userSub);

  let newPage = page;
  let playList = await myplaylistModel.getPlayList(userSub, newPage, limit);

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
    totalCount,
    playList,
    message: `playlist를 조회 성공`,
  });
}
