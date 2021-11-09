const bcrypt = require("bcrypt");
const { _pick } = require("../helper/lodash");
const { User, validateUser } = require("../models/user");

const signUp = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(400).send("User already registered");
  const user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.generateJWT();
  const result = await user.save();
  return res.status(201).send{
message:"Registration Successful!",
token,
user:_pick(result,["_id","name","email"]);
  };
};

const signIn = () => {};

module.exports = { signUp, signIn };
