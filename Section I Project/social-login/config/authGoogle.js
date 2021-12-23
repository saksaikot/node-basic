const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { User } = require("../models/user");
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log("callback from google strategy, the profile is", profile);
    const { sub: id, name, email, picture } = profile._json;
    console.log(id, name, email, picture);

    let user = await User.findOne({ email });

    if (user) {
      if (!user.oAuth.google.id) user.oAuth.google.id = id;
    } else {
      user = await User({ email, name, picture, oAuth: { google: { id } } });
    }

    //save user

    await user.save();
    console.log(user);
    // cb();
  }
);

passport.use(strategy);

module.exports = passport;
