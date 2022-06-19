import { db } from "./database.js";

export async function getUserInfo(userId) {
  const query = "SELECT * FROM tb_user WHERE id = ?";
  return db.execute(query, [userId]).then((result) => result[0][0]);
}

export async function createUserInfo(nickname, userSub) {
  const query = "INSERT INTO tb_user VALUES (?, ?, '', 'active', NOW(),NOW() )";
  return db
    .execute(query, [userSub, nickname])
    .then((result) => result[0].insertId);
}
