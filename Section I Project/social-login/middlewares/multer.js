const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/img");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    console.log(file, "filename");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${file.originalname.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${ext}`;
    cb(null, filename);
  },
});
function uploadFile(req, res, next) {
  const upload = multer({ storage: multerStorage }).single("photo");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    // Everything went fine.
    next();
  });
}
module.exports = { uploadFile };
