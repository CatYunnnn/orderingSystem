const express = require("express");
const router = express.Router();
const pool = require("../../config/mysql");

////建立連接
(async () => {
  const connection = await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) console.error(err);
      else console.log("create connection at dataBase.js");
      resolve(connection);
    });
  });
 
  ////插入點餐資料
  const insertOrder = (conn, key, value) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO `ordered`(name ,price,type) VALUES(?,?,?)",
        [`${key}`, `${value}`,'test'],
        (err, results) => {
          if (err) console.error(err);
          else console.log("data inserted successfully at dataBase.js");
          conn.release();
        }
      );
    });
  };

  ////拿到menu資料
  router.get("/pages/:pageId", (req, res) => {
    let params = req.params.pageId;
    connection.query(`SELECT * FROM ${params}`, (err, results) => {
      if (err) console.error(err);
      else {
        connection.release();
        res.json(results);
      }
    });
  });

  ////把order送到資料庫儲存
  router.post("/ordering", (req, res) => {
    const data = req.body;
    for (const key in data) {
      let value = data[key];
      insertOrder(connection, key, value);
    }
  });
})();

module.exports = router;

 
