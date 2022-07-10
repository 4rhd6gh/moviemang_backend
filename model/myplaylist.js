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
      "INSERT INTO tb_playlist_tag ( playlistId, tagName ) VALUES ?",
      [tags.map((tag) => [playlistId, tag])]
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
  console.log("page model---" + page);
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
