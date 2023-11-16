const mysql = require("mysql2");
const pool = require("../../config/mysql");
////定義schema

const limitedTimeOffer = `CREATE TABLE limitedTimeOffer(id
  INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(10),
  price INT,
  type VARCHAR(10))`;

////創建種子table
pool.getConnection((err, connection) => {
  if (err) console.error(err);
  console.log("connected to the databases");

  connection.query(limitedTimeOffer, (err, results) => {
    if (err) console.error(err);
    else console.log("table created successfully");
  });

  connection.release();

  console.log("database connection released");
});
