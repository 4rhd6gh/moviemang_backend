import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST, // 호스트 주소
  user: process.env.DB_USER, // mysql user
  password: process.env.DB_PASSWORD, // mysql password
  database: process.env.DB_DATABASE, // mysql 데이터베이스
  port: 3306,
});

export const db = pool.promise();
