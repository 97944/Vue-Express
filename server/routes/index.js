var express = require("express");
var router = express.Router();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Employee = require("../dao/schema");
var fileUpload = require("express-fileupload");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // 認証済
    return next();
  } else {
    // 認証されていない
    res.redirect("/login"); // ログイン画面に遷移
  }
}

/* GET home page. */
router.get("/", function(req, res, next) {
  Employee.find({}, function(err, emp) {
    if (err) throw err;
    return res.render("index", { employees: emp });
  });
});

/* GET update page. */
router.get("/update", function(req, res, next) {
  res.render("update", { title: "社内Facebook更新ページ" });
});

/* POST update page. */
router.post("/update", fileUpload(), function(req, res, next) {
  console.log(req.files.image);
  if (req.files && req.files.image) {
    req.files.image.mv("./public/images/" + req.files.image.name, function(
      err
    ) {
      if (err) throw err;
      var newEmployee = new Employee({
        lname: req.body.lname,
        fname: req.body.fname,
        company: req.body.company,
        dept: req.body.dept,
        date: new Date(),
        image_path: "images/" + req.files.image.name
      });
      newEmployee.save(function(er) {
        if (er) throw er;
        return res.redirect("/");
      });
    });
  } else {
    var newEmployee = new Employee({
      lname: req.body.lname,
      fname: req.body.fname,
      company: req.body.company,
      dept: req.body.dept,
      date: new Date()
    });
    newEmployee.save(function(er) {
      if (er) throw er;
      return res.redirect("/");
    });
  }
});

module.exports = router;
