const express = require("express");
const router = express.Router();
const test = require("./modules/test");
const home = require("./modules/home");
router.use("/test", test);
router.use("/", home);
module.exports = router;
