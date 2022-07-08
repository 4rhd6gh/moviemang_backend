import { db } from "./database.js";

export async function updateNickname(nickname, userSub) {
  const query = "UPDATE tb_user SET nickname=? WHERE userSub = ?";
  return db.execute(query, [nickname, userSub]).then((result) => result[0][0]);
}
