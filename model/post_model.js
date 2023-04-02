const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD pour les posts

const Post = new Schema({
    titlePost : {type : String, required: true},
    contentPost : {type : String, required : true},
    categorie : {type:String, required: true},
    user : { type: mongoose.ObjectId, ref: 'User' },
    image: { type: String, required: false}
  });
  
  module.exports = mongoose.model("Post",Post);