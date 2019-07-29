var express = require("express");
var router = express.Router();
var Employee = require("../dao/schema");
var fileUpload = require("express-fileupload");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Employee.find({}, function(err, emp) {
    if (err) throw err;
    res.send(emp);
  });
});

/* POST update */
router.post("/", fileUpload(), function(req, res, next) {});
module.exports = router;
