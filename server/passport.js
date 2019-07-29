var OpenidConnectStrategy = require("passport-openidconnect").Strategy;

module.exports = function(app, passport) {
  var config = app.get("config");
  if (config.oidc.useDefault) {
    registerDefaultStrategy();
  }

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  function registerDefaultStrategy() {
    passport.use(
      new OpenidConnectStrategy(
        {
          issuer: config.oidc.issuer,
          authorizationURL: config.oidc.authorizationURL,
          tokenURL: config.oidc.tokenURL,
          userInfoURL: config.oidc.userInfoURL,
          clientID: config.oidc.clientID,
          clientSecret: config.oidc.clientSecret,
          callbackURL: config.oidc.callbackURL,
          scope: config.oidc.scope
        },
        function(accessToken, refreshToken, profile, done) {
          console.log("accessToken: ", accessToken);
          console.log("refreshToken: ", refreshToken);
          console.log("profile: ", profile);
          return done(null, profile);
        }
      )
    );
  }
};
