const { paymentInit } = require("../controllers/payment");
const authorize = require("../middlewares/authorize");
const router = require("express").router();

router("/init").get(authorize, paymentInit);

module.exports = router;
