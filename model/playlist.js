import { db } from "./database.js";

export async function getPlayListLikeOrder() {
  const query =
    "SELECT A.playlistId, A.playlistTitle, B.nickname, A.userSub FROM tb_playlist A left join tb_user B on A.userSub=B.userSub where playlistId in (select playlistId from (select playlistId, count(*) as CNT from tb_playlist_like group by playlistId ORDER by CNT DESC LIMIT 4) as temp)";
  return db.execute(query).then((result) => result[0]);
}

export async function likePlaylist(playlistId, userSub) {
  const query =
    "INSERT INTO tb_playlist_like ( playlistId, userSub ) VALUES (?, ?)";
  return db.execute(query, [playlistId, userSub]);
}

export async function unlikePlaylist(playlistId, userSub) {
  const query =
    "DELETE FROM tb_playlist_like WHERE playlistId = ? AND userSub = ?";
  return db.execute(query, [playlistId, userSub]);
}

export async function getPopularTag() {
  const query =
    "SELECT tagName, count(*) as CNT FROM tb_playlist_tag GROUP BY tagName ORDER BY CNT DESC LIMIT 0,8";
  return db.execute(query).then((result) => result[0]);
}

export async function getPlaylistBookmark(userSub, page, limit) {
  const query =
    "SELECT * FROM tb_playlist WHERE playlistId in ( select playlistId from tb_playlist_bookmark where userSub=? ) ORDER BY created DESC LIMIT ?,?";
  return db.execute(query, [userSub, page, limit]).then((result) => result[0]);
}
