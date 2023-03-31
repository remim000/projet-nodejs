const Commentaire = require("../model/commentaire_model");
require("dotenv").config();

// permet de creer un commentaire
exports.create = (req, res, next) => {
    if (req.body.message === "" || req.body.idPost === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les Champs pour votre POST SVP ! " });
    }
    Commentaire.create({
      message: req.body.message,
      idPost: req.body.idPost,
      user: req.token.id
    })
      .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };

exports.delete = async (req, res, next) => {
  idCommentaire = req.params;
  const dataCommentaire = await Commentaire.findById(idCommentaire);
  if (req.token._id === dataCommentaire.idUser){
    if(dataCommentaire == null){
        res.status(404).json({ message:"Le commentaire que vous shouaitez suprimmer n'existe pas"})
    }else{
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
