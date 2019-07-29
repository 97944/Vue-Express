var mongoose = require("mongoose");

var empSchema = mongoose.Schema({
  lname: String,
  fname: String,
  company: String,
  dept: String,
  date: Date,
  image_path: String
});

module.exports = mongoose.model("Employee", empSchema);
