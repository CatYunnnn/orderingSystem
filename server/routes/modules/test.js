const express = require("express");
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
router.get("/", (req, res) => {
  res.json(testData);
});
module.exports = router;
