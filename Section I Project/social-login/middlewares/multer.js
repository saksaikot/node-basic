const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/img");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = new Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${file.filename}-${uniqueSuffix}.${ext}`;
    cb(null, filename);
  },
});

module.export = multer({ storage: multerStorage }).single("photo");
