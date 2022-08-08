import { db } from "./database.js";

export async function updateNickname(nickname, userSub) {
  const query = "UPDATE tb_user SET nickname=? WHERE userSub = ?";
  return db.execute(query, [nickname, userSub]).then((result) => result[0][0]);
}

export async function getPlaylistTags() {
  const query =
    "select tagName, count(*) as CNT from tb_playlist_tag group by tagName order by CNT desc";
  return db.execute(query).then((result) => result[0]);
}
