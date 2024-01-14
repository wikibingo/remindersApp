const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const passport = require("passport");

router.get("/", ensureAuthenticated, (req, res) => {
  res.send("welcome");
});

router.get("/admin-dashboard", ensureAuthenticated, (req, res) => {
  const activeSessions = req.sessionStore.sessions;

  const sessionIds = Object.keys(activeSessions);
  const sessionUserIds = []

  sessionIds.forEach((sessionId) => {
    const sessionData = JSON.parse(activeSessions[sessionId]);
    const userId = sessionData.passport.user;

    sessionUserIds.push({
      sessionId: sessionId,
      userId: userId,
    });
  });
  res.render("admin-dashboard", {
    sessionUserIds: sessionUserIds
  });

});

module.exports = router;
