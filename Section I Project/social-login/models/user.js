const { Schema, model } = require("mongoose");

const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: String,
    oAuth: {
      google: { id: String },
    },
    picture: String,
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24d" }
  );
};

const User = model("User", userSchema);

module.exports = { User };
