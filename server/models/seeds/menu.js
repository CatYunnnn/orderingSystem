const mysql = require("mysql2");
const connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "qwer1234asdf",
  database: "test",
  charset: "utf8mb4",
});
connect.query(
  "INSERT INTO menu(name_id,name ,price) VALUES(?,?,?)",
  [9, "豆皮壽司", 140],
  (err, results) => {
    if (err) console.error(err);
    else console.log("data inserted successfully");
  }
);
