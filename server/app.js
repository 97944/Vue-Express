var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

var authRouter = require("./routes/auth.js");
var passport = require("passport");
var session = require("express-session");

// Read configurations for OpenID Connect
var config = JSON.parse(require("fs").readFileSync("config.beta.json"));
app.set("config", config);

console.log(config);

// connect to mongoDB
var mongoose = require("./dao/connect");

app.use(
  session({
    secret: "hogehoge",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 30 * 1000
    }
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(app, passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/*
function isAuthenticated(req, res, next){
    if (req.isAuthenticated()) {  // 認証済
        return next();
    }
    else {  // 認証されていない
        res.redirect('/login');  // ログイン画面に遷移
    }
}

app.get('/', isAuthenticated, function(req, res, next) {
    app.use('/', indexRouter);
});
*/
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(require("./routes/auth")(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
