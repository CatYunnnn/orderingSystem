const mysql = require("mysql2");
////創建連接池
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "qwer1234asdf",
  database: "test",
});

module.exports = pool;
