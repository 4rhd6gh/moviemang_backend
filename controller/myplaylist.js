import "dotenv/config";
import * as util from "../util/util.js";
import * as myplaylistModel from "../model/myplaylist.js";

export async function createPlayList(req, res) {
  const userSub = util.getUserSubFormToken(req);

  const { playlistTitle, playlistDesc, tags } = req.body;
  try {
    const playlistId =
      userSub + new Date().getTime() + Math.floor(Math.random() * 100);
    const newPlaylistId = await myplaylistModel.createPlayList(
      playlistId,
      userSub,
      playlistTitle,
      playlistDesc,
      tags
    );
    return res.status(200).json({
      newPlaylistId,
      message: `playlist가 생성되었습니다.`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `playlist 생성에 실패하였습니다.`,
    });
  }
}

export async function createPlMovie(req, res) {
  const { playlistId, mvTitle, mvPosterPath, mvDirector } = req.body;

  const existPlaylist = await myplaylistModel.getPlayListMovie(playlistId);

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

  const { page, limit } = req.query;

  const playList = await myplaylistModel.getPlayList(userSub, page, limit);

  if (playList.length > 0) {
    console.log("playlist 조회 성공");
    playList.map(async (playlist) => {
      playlist.movies = await myplaylistModel.getPlayListMovie(
        playlist.playlistId
      );
      return playlist;
    });
    playList.map(async (playlist) => {
      playlist.tags = await myplaylistModel.getPlayListTag(playlist.playlistId);
      return playlist;
    });
  }

  return res.status(200).json({
    playList,
    message: `playlist를 조회 성공`,
  });
}

export async function getTags(req, res) {
  const tags = await myplaylistModel.getTags();

  return res.status(200).json({
    tags,
    message: `playlist를 조회 성공`,
  });
}
