const express = require("express");
const passport = require("../middleware/passport");
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/checkAuth");
// const remindersController = require("../controllers/reminder_controller");
// const { Database }= require("../database")

const router = express.Router();


// add views berfore auth/login automaticaaly
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

// we can change loke below need to read documentation 05:40?
//app.post("/auth/login", remindersController.login) 


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders/all",
    failureRedirect: "/auth/login",
  })
);

// run this one first, show your pop up
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

// github communicate back to you, the following functino run 15:50
// give us
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/reminders/all');
  });

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/auth/login');
  });
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/auth/login');
  });
});

router.post("/revoke", ensureAuthenticated, (req, res) => {
  const sessionIdToRevoke = req.body.sessionId;

  if (sessionIdToRevoke) {
    req.sessionStore.destroy(sessionIdToRevoke)
    res.redirect("/admin-dashboard")
    } else {
        res.redirect("/auth/login"); 
    }
});






router.get("/register",  (req, res) => res.render("auth/register"));

module.exports = router;
