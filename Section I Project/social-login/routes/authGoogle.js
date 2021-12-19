const router = require("express").Router();
const passport = require("../config/authGoogle");
router.route("/").get(passport.authenticate("google", { scope: ["profile"] }));
router.route("/redirect").get();

module.exports = router;
