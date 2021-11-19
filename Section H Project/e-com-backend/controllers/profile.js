const { Profile } = require("../models/profile");

const get = async (req, res) => {
  const profile = await Profile.find({ user: req.user._id });
  return res.send(profile);
};
const create = async (req, res) => {
  const profile = new Profile(req.body);
  profile.user = req.user._id;
  const saveResult = await profile.save();

  return res.status(201).send({
    message: "created successfully",
    data: saveResult,
  });
};
const update = async (req, res) => {};
const remove = async (req, res) => {};

module.exports = {
  get,
  create,
  update,
  remove,
};
