const pool = require("../../config/mysql");
const data = require("./seedData.json");
////定義種子table schema
const typeTable = function (type) {
  return `CREATE TABLE ${type}(id
  INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) CHARACTER SET utf8mb4,
  price INT,
  type VARCHAR(20))`;
};

const orderTable = function (type) {
  return `CREATE TABLE ${type}(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20) CHARACTER SET utf8mb4,
  amount INT)`;
};
////種子插入格式
const insert = function (type, name, price) {
  return `INSERT INTO ${type} (name,price,type) VALUES ('${name}',${price},'${type}')`;
};
////不同種類的table名稱
const type = [
  `limitedTimeOffer`,
  `nigiriSushi`,
  `gunkanMaki`,
  `noodles`,
  `sideDishes`,
  `desserts`,
];

////創建Promise
//table
const creatSeedTable = function (connection, item) {
  return new Promise((resolve, reject) => {
    connection.query(typeTable(item), (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        connection.release();
        console.log("table created successfully");
        resolve();
      }
    });
  });
};

const createOrderTable = function (connection, item) {
  return new Promise((resolve, reject) => {
    connection.query(orderTable(item), (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("table created successfully");
        resolve();
      }
    });
  });
};

//seeds
const insertSeed = (conn, key, item, data) => {
  return new Promise((resolve, reject) => {
    conn.query(insert(`${key}`, `${item}`, data[key][item]), (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else console.log("data inserted successfully");
      conn.release();
      resolve();
    });
  });
};
////創建table並插入種子
(async () => {
  ////建立連線並儲存為變數
  const connection = await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) console.error(err);
      resolve(connection);
    });
  });
  ////建立table
  for (let item of type) {
    await creatSeedTable(connection, item);
  }

  await createOrderTable(connection, "ordered");
  ////插入種子資料
  for (let key in data) {
    ////key = data.limitedTimeOffer...
    for (let item in data[key]) {
      ////item = data.limitedTimeOffer.北海道產秋刀魚...
      await insertSeed(connection, key, item, data);
    }
  }
  process.exit();
})();
