const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD

const Post = new Schema({
    titlePost : {type : String, required: true},
    contentPost : {type : String, required : true},
    categorie : {type:String, required: true},
    user : { type: mongoose.ObjectId, ref: 'User' }
  });
  
  module.exports = mongoose.model("Post",Post);