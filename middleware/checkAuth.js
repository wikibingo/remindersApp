module.exports = {
  ensureAuthenticated: function (req, res, next) {
    //if you already login, go forward
    if (req.isAuthenticated()) {
      return next();
    }
    //if you 
    res.redirect("/auth/login");
  },

  // send user to login page if not logged in
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders/all");
  },
};
