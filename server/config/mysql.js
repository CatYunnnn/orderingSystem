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

connect.query("Select * From `menu`", (err, results) => {
  if (err) console.error(err);
  console.log(results);
});

connect.end((err) => {
  if (err) console.error(err);
  console.log("database connection closed");
});
