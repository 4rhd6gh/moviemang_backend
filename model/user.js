import { db } from "./database.js";

export async function updateNickname(nickname, userSub) {
  const query = "UPDATE tb_user SET nickname=? WHERE userSub = ?";
  return db.execute(query, [nickname, userSub]).then((result) => result[0][0]);
}

export async function getPlaylistTags(userSub) {
  const query =
    "select tagName, count(*) as CNT from tb_playlist_tag where playlistId in (select playlistId from tb_playlist where userSub = ? ) group by tagName order by CNT desc";
  return db.execute(query, [userSub]).then((result) => result[0]);
}

export async function createPlaylistBookmark(
  playlistId,
  userSub,
  playlistTitle,
  nickname
) {
  const query =
    "INSERT INTO tb_playlist_bookmark (playlistId, userSub, playlistTitle, nickname) VALUES (?, ?, ?, ?)";
  return db
    .execute(query, [playlistId, userSub, playlistTitle, nickname])
    .then((result) => result[0]);
}

export async function deletePlaylistBookmark(playlistId, userSub) {
  const query =
    "DELETE FROM tb_playlist_bookmark WHERE playlistId = ? AND userSub = ?";
  return db.execute(query, [playlistId, userSub]).then((result) => result[0]);
}

export async function getPlaylistBookmarkCount(userSub) {
  const query =
    "SELECT count(*) as CNT FROM tb_playlist_bookmark WHERE userSub = ?";
  return db.execute(query, [userSub]).then((result) => result[0][0].CNT);
}
