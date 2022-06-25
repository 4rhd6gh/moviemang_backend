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
