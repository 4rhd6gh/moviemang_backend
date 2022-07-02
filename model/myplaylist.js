import { db } from "./database.js";

export async function createPlayList(
  playlistId,
  userSub,
  playlistTitle,
  playlistDesc
) {
  const query =
    "INSERT INTO tb_playlist ( playlistId, userSub, playlistTitle, playlistDesc, created, updated ) VALUES (?, ?, ?, ?, NOW(),NOW() )";
  return db
    .execute(query, [playlistId, userSub, playlistTitle, playlistDesc])
    .then((result) => result[0][0]);
}

export async function createPlMovie(
  playlistId,
  mvTitle,
  mvPosterPath,
  mvDirector
) {
  const query =
    "INSERT INTO tb_plmovie ( playlistId, mvTitle, mvPosterPath, mvDirector, created, updated ) VALUES (?, ?, ?, ?, NOW(),NOW() )";
  return db
    .execute(query, [playlistId, mvTitle, mvPosterPath, mvDirector])
    .then((result) => result[0][0]);
}

export async function getPlayList(userSub) {
  const query =
    "SELECT * FROM tb_playlist WHERE userSub = ? ORDER BY created DESC";
  return db.execute(query, [userSub]).then((result) => result[0]);
}

export async function getPlayListMovie(playlistId) {
  const query = "SELECT * FROM tb_plmovie WHERE playlistId = ?";
  return db.execute(query, [playlistId]).then((result) => result[0]);
}
