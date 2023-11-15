const express = require("express");
const connection = require("./config/mysql.js");
const cors = require("cors"); /////解決跨域問題
const app = express();
const routes = require("./routes");
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);
app.listen(port, () => {
  console.log("express is running on http://loocalhost:5000");
});
