const Commentaire = require("../model/commentaire_model");
const Deleted_Commentaire = require("../model/deleted_commentaire_model");
require("dotenv").config();

exports.delete = async (req, res, next) => {
  idCommentaire = req.params;
  const dataCommentaire = await Commentaire.findById(idCommentaire);
  if (dataCommentaire.user.equals(req.token.id)){
    if(dataCommentaire == null){
      res.status(404).json({ message:"Le commentaire que vous shouaitez suprimmer n'existe pas"})
    }else{
      await Deleted_Commentaire.create(dataCommentaire.toObject());
      await Commentaire.deleteOne({_id:idCommentaire});
      res.status(201).json({message:"Commentaire supprimé"});
    }
  }else{
    res.status(403).json({ message:"Vous n'avez pas les droits pour supprimer ce commentaire"})
  }
}

exports.getAll = async (req, res, next) => {
  const dataCommentaire = await Commentaire.find();
  res.status(200).json(dataCommentaire);
}

exports.getOne = async (req, res, next) => {
  idCommentaire = req.params;
  const dataCommentaire = await Commentaire.findById(idCommentaire);
  res.status(200).json(dataCommentaire);
}
