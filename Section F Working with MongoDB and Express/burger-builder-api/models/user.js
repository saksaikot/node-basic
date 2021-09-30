const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // time in second ie: 60*60 for 1 hour, or string like "1h"
    }
  );
};
const userValidationSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).min(8).required(),
});
const validateUser = function (user) {
  const { error } = userValidationSchema.validate(user, { abortEarly: false });
  return error
    ? error.details.reduce(
        (previous, current) => [
          ...previous,
          { key: current.context.key, message: current.message },
        ],
        []
      )
    : null;
};

const User = model("User", userSchema);

module.exports = { User, validateUser };
