var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fbdb', {useNewUrlParser: true},
  function(err){
    if(err){
        console.error(err);
    }else{
        console.log("Successfully connected to MongoDB.");
    }
});

module.exports = mongoose;