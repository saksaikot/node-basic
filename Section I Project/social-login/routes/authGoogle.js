const router = require("express").Router();

router.route("/").get();
router.route("/redirect").get();

module.exports = router;
