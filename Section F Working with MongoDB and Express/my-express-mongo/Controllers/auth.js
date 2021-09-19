const { User } = require("../models/User");
const { of } = require("await-of");
const { errorBadRequest, errorNotFound } = require("./helper");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const create = async (req, res) => {
  const [user, findError] = await of(User.findOne({ email: req.body.email }));
  if (findError || !user)
    return errorBadRequest(res, { message: "invalid email/password" });

  const hashedPassword = await bcrypt.compare(req.body.password, user.password);
  if (!hashedPassword)
    return errorBadRequest(res, { message: "invalid email/password" });

  // const jwtToken = jwt.sign(
  //   { _id: user._id, email: user.email },
  //   process.env.JWT_SECRET
  // );
  res.send({
    message: "Logged in successfully",
    token: user.generateJWTToken(),
  });
};
module.exports = {
  // list,
  // item,
  // update,
  create,
  // remove,
};
