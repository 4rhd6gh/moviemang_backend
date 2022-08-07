import { db } from "./database.js";

export async function getPlayListLikeOrder() {
  const query = "SELECT * FROM tb_playlist ORDER BY like DESC";
  return db.execute(query, [userId]).then((result) => result[0][0]);
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
