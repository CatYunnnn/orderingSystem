const express = require("express");
const router = express.Router();
const page = require("./modules/pages");
router.use("/page", page);
module.exports = router;
