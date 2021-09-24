const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
userSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET
  );
};

exports.User = model("User", userSchema);
