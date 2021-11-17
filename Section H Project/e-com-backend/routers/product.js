const { create, index, item, store } = require("../controllers/product");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.route("/").post([authorize, admin], create).get(index);
router.route("/:id").post([authorize, admin], store).get(item);
module.exports = router;
