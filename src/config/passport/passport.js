const GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");
const mongoose = require("mongoose");
const customer = require("../../app/models/customer.model");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,

      // clientID: "803563391879-011pu6ma02dc2ce2jd3sbaup51svdqgg.apps.googleusercontent.com",
      // clientSecret: "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",
      // callbackURL: "http://localhost:3000/customer/login/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //get the user data from google
      const newUser = {
        name: profile.name.givenName,
        email: profile.emails[0].value,
        type: "google",
      };

      try {
        //find the user in our database
        let user = await customer.findOne({ email: profile.emails[0].value });

        if (user) {
          //If user present in our database.
          done(null, user);
        } else {
          // if user is not preset in our database save user data to database.
          user = await customer.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
        done(err);
      }
    }
  )
);

module.exports = passport;
