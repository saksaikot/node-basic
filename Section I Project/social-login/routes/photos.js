const router = require("express").Router();
const multer = require("multer");
router.route("/").post(async (req, res) => {
  upload(
    (req,
    res,
    function (err) {
      if (err instanceof multer.MulterError) {
        console.error("multer error", err);
      } else if (err) {
        console.error("multer other error", err);
      }
      console.log(req.file); //to access any file
      console.log(req.body);
      // to access any filed
    })
  );
});

module.exports = router;
