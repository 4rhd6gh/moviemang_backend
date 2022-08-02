import { db } from "./database.js";

export async function createPlayList(
  playlistId,
  userSub,
  playlistTitle,
  playlistDesc,
  tags
) {
  const query =
    "INSERT INTO tb_playlist ( playlistId, userSub, playlistTitle, playlistDesc, created, updated ) VALUES (?, ?, ?, ?, NOW(),NOW() )";

  try {
    await db.query("START TRANSACTION");
    const insId = await db.query(query, [
      playlistId,
      userSub,
      playlistTitle,
      playlistDesc,
    ]);
    await db.query(
      "INSERT INTO tb_playlist_tag ( playlistId, tagName, created, updated ) VALUES ?",
      [tags.map((tag) => [playlistId, tag, new Date(), new Date()])]
    );
    await db.query("COMMIT");
    return insId;
  } catch (err) {
    console.log(err);
    await db.query("ROLLBACK");
    throw err;
  }
}

export async function createPlMovie(
  playlistId,
  mvTitle,
  mvPosterPath,
  mvDirector,
  tm_id
) {
  const query =
    "INSERT INTO tb_plmovie ( playlistId, mvTitle, mvPosterPath, mvDirector, tm_id, created, updated ) VALUES (?, ?, ?, ?,?, NOW(),NOW() )";

  return db
    .execute(query, [playlistId, mvTitle, mvPosterPath, mvDirector, tm_id])
    .then((result) => result[0][0]);
}

export async function getPlayList(userSub, page, limit) {
  const query =
    "SELECT * FROM tb_playlist WHERE userSub = ? ORDER BY created DESC LIMIT ?,?";
  return db.execute(query, [userSub, page, limit]).then((result) => result[0]);
}

export async function getPlayListMovie(playlistId) {
  const query = "SELECT * FROM tb_plmovie WHERE playlistId = ?";
  return db.execute(query, [playlistId]).then((result) => result[0]);
}

export async function getPlMovie(tm_id) {
  const query = "SELECT * FROM tb_plmovie WHERE tm_id = ?";
  return db.execute(query, [tm_id]).then((result) => result[0][0]);
}

export async function getPlayListTag(playlistId) {
  const query = "SELECT * FROM tb_playlist_tag WHERE playlistId = ?";
  return db.execute(query, [playlistId]).then((result) => result[0]);
}

export async function getTags() {
  const query = "SELECT tagName FROM tb_tag";
  return db.execute(query).then((result) => result[0]);
}

export async function getPlayListCount(userSub) {
  const query = "SELECT COUNT(*) AS cnt FROM tb_playlist WHERE userSub = ?";
  return db.execute(query, [userSub]).then((result) => result[0][0].cnt);
}

export async function deletePlMovie(playlistId, tm_id) {
  const query = "DELETE FROM tb_plmovie WHERE playlistId = ? AND tm_id = ?";
  return db
    .execute(query, [playlistId, tm_id])
    .then((result) => result[0][0].cnt);
}

export async function likePlaylist(playlistId, userSub) {
  const query =
    "INSERT INTO tb_playlist_like ( playlistId, userSub ) VALUES (?, ?)";
  return db
    .execute(query, [playlistId, userSub])
    .then((result) => result[0][0].cnt);
}

export async function unlikePlaylist(playlistId, userSub) {
  const query =
    "DELETE FROM tb_playlist_like WHERE playlistId = ? AND userSub = ?";
  return db
    .execute(query, [playlistId, userSub])
    .then((result) => result[0][0].cnt);
}
