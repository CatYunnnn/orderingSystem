const express = require("express");
const router = express.Router();
const page = require("./modules/pages");
const home = require("./modules/home");
router.use("/page", page);
router.use("/", home);
module.exports = router;
