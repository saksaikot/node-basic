const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/redirect",
  },
  () => {
    console.log("callback from google strategy");
  }
);

passport.use(strategy);
