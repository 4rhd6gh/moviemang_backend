import "dotenv/config";
import * as util from "../util/util.js";
import * as myplaylistModel from "../model/myplaylist.js";

export async function createPlayList(req, res) {
  const userSub = util.getUserSubFormToken(req);

  const { playlistTitle, playlistDesc } = req.body;

  const playlistId =
    userSub + new Date().getTime() + Math.floor(Math.random() * 100);
  const newPlaylistId = await myplaylistModel.createPlayList(
    playlistId,
    userSub,
    playlistTitle,
    playlistDesc
  );

  return res.status(200).json({
    newPlaylistId,
    message: `playlist가 생성되었습니다.`,
  });
}

export async function createPlMovie(req, res) {
  const { playlistId, mvTitle, mvPosterPath, mvDirector } = req.body;

  const existPlaylist = await myplaylistModel.getPlayListMovie(playlistId);
  console.log("existPlaylist", existPlaylist);

  if (existPlaylist && existPlaylist.length !== 0) {
    return res.status(200).json({
      message: `playlistId에 해당 영화가 이미 존재합니다.`,
    });
  }

  const newPlmovieId = await myplaylistModel.createPlMovie(
    playlistId,
    mvTitle,
    mvPosterPath,
    mvDirector
  );

  return res.status(200).json({
    newPlmovieId,
    message: `playlist에 영화가 추가되었습니다.`,
  });
}

export async function getPlayList(req, res) {
  const userSub = util.getUserSubFormToken(req);
  console.log("getPlayList userSub: ", userSub);
  const playList = await myplaylistModel.getPlayList(userSub);
  console.log(playList);
  return res.status(200).json({
    playList,
    message: `playlist를 조회 성공`,
  });
}
