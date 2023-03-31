const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD

const Commentaire = new Schema({
    message: {type : String, required: true},
    idPost: { type: mongoose.ObjectId, ref: 'Post' },
    user: { type: mongoose.ObjectId, ref: 'User' }
});
  
  module.exports = mongoose.model("Commentaire",Commentaire);