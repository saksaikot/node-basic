const { User } = require("../models/User");
const { of } = require("await-of");
const { errorBadRequest, errorNotFound } = require("./helper");
const bcrypt = require("bcrypt");
const create = async (req, res) => {
  const [findResult, findError] = await of(
    User.findOne({ email: req.body.email })
  );
  if (findResult)
    return errorBadRequest(res, { message: "Email already exist" });

  const [newUser, newUserError] = await of(new User(req.body).validate());
  if (newUserError) return errorBadRequest(res, newUserError);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const { email, name } = req.body;
  const password = hashedPassword;

  const [save, saveError] = await of(
    new User({ email, name, password }).save()
  );
  if (saveError) return errorBadRequest(res, saveError);
  res.send({
    message: "Signed up successfully",
    token: save.generateJWTToken(),
    data: { email, name },
  });
};
module.exports = {
  // list,
  // item,
  // update,
  create,
  // remove,
};
