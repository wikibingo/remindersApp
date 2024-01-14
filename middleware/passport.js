const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require("../controllers/userController");
const { userModel, database } = require("../models/userModel");
const GITHUB_CLIENT_ID = "62201eba1215fa69bb10";
const GITHUB_CLIENT_SECRET = "c0c508107567f2fd8347f39cb803e27c97fde14a";
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  //useremail, password get from input
  (email, password, done) => {
    //return null if nothing found match
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      //first null is related database connection problem, we dont care now
      //can rewrite as 
      //if (user) {
      //   done(null, user)
      // } else {
      //   done(null, false {
      //     message: "Your login details are not valid. Please try again"
      //   })
      // }
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new GitHubStrategy(
  {
  //are strings neeed to get from github, give you permission to use github feature 24:00
  // leave blank to push github
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  },

//run if you successfully login

//can console.log profile to see if successful
  function(accessToken, refreshToken, profile, done) {
    
      const user = {
        id: parseInt(profile.id),
        name: profile.username,
        email: "",
        role: "user",
        reminders: [],
      }
      database.push(user);
      return done(null, user);
  });

// 20:50, end at 24:00
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  //check if user still in the system
  let user = userController.getUserById(id);
  if (user) {
    //if exist, pass user and done
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

// passport.use(localLogin);
// passport.use(githubLogin);

module.exports = passport.use(localLogin), passport.use(githubLogin);

