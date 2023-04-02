const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD pour les posts supprimés

const Deleted_Post = new Schema({
    _id : {type: mongoose.Types.ObjectId},
    titlePost : {type : String, required: true},
    contentPost : {type : String, required : true},
    categorie : {type:String, required: true},
    user : { type: mongoose.ObjectId, ref: 'User' },
    image: { type: String, required: false}
  });
  
  module.exports = mongoose.model("Deleted_Post",Deleted_Post);