const mysql = require("mysql2");
const pool = require("../../config/mysql");
const data = require("./seedData.json");
////定義種子schema
const seed = function (type) {
  return `CREATE TABLE ${type}(id
  INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(20) CHARACTER SET utf8mb4,
  price INT,
  type VARCHAR(20))`;
};
////插入種子資料
const insert = function (type, name, price) {
  return `INSERT INTO ${type} (NAME,price,type) VALUES ('${name}',${price},'${type}')`;
};
////不同種類的table
const type = [
  `limitedTimeOffer`,
  `nigiriSushi`,
  `gunkanMaki`,
  `noodles`,
  `sideDishes`,
  `desserts`,
];
//創建種子table
type.forEach((item) => {
  pool.getConnection((err, connection) => {
    if (err) console.error(err);
    console.log("connected to the databases");

    connection.query(seed(item), (err, results) => {
      if (err) console.error(err);
      else console.log("table created successfully");
    });

    connection.release();

    console.log("database connection released");
  });
});
//把種子資料輸入進資料庫

for (let key in data) {
  ////key = data.limitedTimeOffer...
  for (let item in data[key]) {
    ////item = data.limitedTimeOffer.北海道產秋刀魚...
    pool.getConnection((err, connection) => {
      if (err) console.error(err);
      console.log("connected to the databases");

      connection.query(
        insert(`${key}`, `${item}`, data[key][item]),
        (err, results) => {
          if (err) console.error(err);
          else console.log("data inserted successfully");
        }
      );

      connection.release();

      console.log("database connection released");
    });
  }
}
