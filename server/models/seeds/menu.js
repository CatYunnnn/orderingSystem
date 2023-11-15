const mysql = require("mysql2");
const connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "qwer1234asdf",
  database: "test",
  charset: "utf8mb4",
});
connect.connect((err) => {
  if (err) console.error(err);
  console.log("connected to the databases");
});
connect.query(
  "INSERT INTO menu(name_id,name ,price) VALUES(?,?,?)",
  [9, "豆皮壽司", 140],
  (err, results) => {
    if (err) console.error(err);
    else console.log("data inserted successfully");
  }
);
connect.end((err) => {
  if (err) console.error(err);
  console.log("database connection closed");
});
