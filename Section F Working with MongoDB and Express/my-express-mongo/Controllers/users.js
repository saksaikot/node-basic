const { User } = require("../models/User");
const { of } = require("await-of");
const { errorBadRequest, errorNotFound } = require("./helper");
const create = async (req, res) => {
  const [findResult, findError] = await of(
    User.findOne({ email: req.body.email })
  );
  if (findError) return errorBadRequest(res, findError);
  const [saveResult, saveError] = await of(new User(req.body).save());
  if (saveError) return errorBadRequest(res, saveError);
  res.send(saveResult);
};
module.exports = {
  // list,
  // item,
  // update,
  create,
  // remove,
};
