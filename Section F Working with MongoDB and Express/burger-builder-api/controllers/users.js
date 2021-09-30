const { User, validateUser } = require("../models/user");
const { of } = require("await-of");

const { _pick } = require("../helper/lodash");

const create = async function (req, res) {
  const error = validateUser(req.body);
  if (error) return res.status(400).send(error);
  const { email, password } = req.body;
  const [userExist] = await of(User.findOne({ email }));
  if (userExist) return res.status(400).send("user already exists");
  // console.log(User);
  // const hashedPassword = await User.hashedPassword(password);
  const newUser = new User({ email, password });

  newUser.password = await newUser.hashedPassword();
  const token = newUser.generateJWT();
  const [, saveError] = await of(newUser.save());

  if (saveError)
    return res.status(400).send("something failed while creating account");
  // console.log("pick", _pick(newUser, ["email", "_id"]));
  const result = {
    token,
    data: _pick(newUser, ["email", "_id"]),
  };
  res.send(result);
};

const auth = function (req, res) {
  return res.send("ok");
};

module.exports = { create, auth };
