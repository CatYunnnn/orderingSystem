const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const testData = {
  1: "apple",
  2: "banana",
  3: "cake",
  4: "dogs",
  5: "egg",
  6: "fork",
  7: "giggle",
  8: "hi",
  9: "it",
};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "qwer1234asdf",
  database: "test",
});

router.get("/", (req, res) => {
  res.json(testData);
});
router.post("/ordering", (req, res) => {
  const data = req.body;

  console.log(data);

  pool.getConnection((err, connection) => {
    if (err) console.error(err);
    console.log("connected to the databases");
    for (const key in data) {
      let value = data[key];
      connection.query(
        "INSERT INTO `order`(order_name ,price) VALUES(?,?)",
        [`${key}`, `${value}`],
        (err, results) => {
          if (err) console.error(err);
          else console.log("data inserted successfully");
        }
      );
    }
    connection.release();

    console.log("database connection released");
  });
});
module.exports = router;
