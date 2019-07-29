var express = require("express");
var router = express.Router();

module.exports = function(passport) {
  router.use(function(req, res, next) {
    if (!req.isAuthenticated) {
      res.redirect("/login");
    }
    next();
  });

  router.get("/login", function(req, res, next) {
    if (!!passport._strategies.openidconnect) {
      passport.authenticate("openidconnect")(req, res, next);
      console.log("passport.authenticate");
    } else {
      var err = new Error("Authorization Required");
      err.status = 401;
      next(err);
    }
  });

  router.get("/logout", function(req, res, next) {
    req.session.destroy();
    res.render("message", {
      message: "logout successfully done."
    });
  });

  router.get(
    "/authcallback",
    passport.authenticate("openidconnect", {
      failureRedirect: "/error"
    }),
    function(req, res) {
      console.log("authcallback");
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
  return router;
};
