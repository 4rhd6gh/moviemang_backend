import { db } from "./database.js";

export async function getPlayListLikeOrder() {
  const query = "SELECT * FROM tb_user WHERE id = ?";
  return db.execute(query, [userId]).then((result) => result[0][0]);
}
