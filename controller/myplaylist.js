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
  const { playlistId, mvTitle, mvPosterPath, mvDirector, tm_id } = req.body;
  console.log("tm_id", tm_id);
  const existPlaylist = await myplaylistModel.getPlMovie(tm_id);

  if (existPlaylist && existPlaylist.tm_id === tm_id) {
    return res.status(200).json({
      message: `playlistId에 해당 영화가 이미 존재합니다.`,
    });
  }

  const newPlmovieId = await myplaylistModel.createPlMovie(
    playlistId,
    mvTitle,
    mvPosterPath,
    mvDirector,
    tm_id
  );

  return res.status(200).json({
    newPlmovieId,
    message: `playlist에 영화가 추가되었습니다.`,
  });
}

export async function getPlayListForCreate(req, res) {
  const userSub = util.getUserSubFormToken(req);
  const { page, limit } = req.query;
  const playListArray = await myplaylistModel.getPlayList(userSub, page, limit);
  console.log(playListArray);

  return res.status(200).json({
    playListArray,
  });
}

export async function getPlayList(req, res) {
  const userSub = util.getUserSubFormToken(req);

  const { page, limit } = req.query;

  let playList = await myplaylistModel.getPlayList(userSub, page, limit);

  if (playList.length > 0) {
    console.log("playlist 조회 성공");

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
