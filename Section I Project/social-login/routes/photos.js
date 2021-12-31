const router = require("express").Router();
const multer = require("multer");
const { uploadFile } = require("../middlewares/multer");
router.route("/").post(uploadFile, async (req, res) => {
  console.log(req.file); //to access any file
  console.log(req.body);
  res.send({ file: req.file, body: req.body });
});

module.exports = router;
