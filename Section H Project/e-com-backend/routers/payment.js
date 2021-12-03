const { paymentInit } = require("../controllers/payment");
const authorize = require("../middlewares/authorize");
const router = require("express").Router();

router.route("/init").get(authorize, paymentInit);

module.exports = router;
