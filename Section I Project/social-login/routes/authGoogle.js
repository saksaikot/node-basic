const router = require("express").Router();
const passport = require("../config/authGoogle");
router
  .route("/")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router
  .route("/redirect")
  .get(
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    (req, res) => {
      return res.send(req.user);
    }
  );

module.exports = router;
