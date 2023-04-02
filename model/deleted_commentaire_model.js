const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD pour stocker les commentaires supprimés

const Deleted_Commentaire = new Schema({
    _id : {type: mongoose.Types.ObjectId},
    message: {type : String, required: true},
    idPost: { type: mongoose.ObjectId, ref: 'Post' },
    user: { type: mongoose.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Deleted_Commentaire",Deleted_Commentaire);