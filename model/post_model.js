const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD

const Post = new Schema({
    titlePost : {type : String, required: true},
    contentPost : {type : String, required : true}
  });
  
  module.exports = mongoose.model("Post",Post);