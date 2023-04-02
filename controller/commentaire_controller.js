const Commentaire = require("../model/commentaire_model");
const Deleted_Commentaire = require("../model/deleted_commentaire_model");
require("dotenv").config();

//permet de delete un commentaire
exports.delete = async (req, res, next) => {
  idCommentaire = req.params;
  const dataCommentaire = await Commentaire.findById(idCommentaire);
  if (dataCommentaire.user.equals(req.token.id)){
    if(dataCommentaire == null){
      res.status(404).json({ message:"Le commentaire que vous souhaitez suprimmer n'existe pas, merci de réessayer !"})
    }else{
      await Deleted_Commentaire.create(dataCommentaire.toObject());
      await Commentaire.deleteOne({_id:idCommentaire});
      res.status(201).json({message:"Commentaire supprimé avec succés :)"});
    }
  }else{
    res.status(403).json({ message:"Vous n'avez pas les droits pour supprimer ce commentaire !"})
  }
}

// permet de mettre à jour un commentaire
exports.update = async (req, res, next) => {
  idCommentaire = req.params;
  const myFile = typeof(req.file);
  const dataCommentaire = await Commentaire.findById(idCommentaire);
  if(idCommentaire == null){
    res.status(404).json({ message:"Le commentaire que vous souhaitez modifier n'existe pas, merci de réessayer !"});
  }else{
    if (dataCommentaire.user.equals(req.token.id)){
      if(myFile === 'undefined'){
        await Commentaire.updateOne( {_id : idCommentaire},
          {
            $set : {
              message : req.body.message,
              user: req.token.id
            },
            $unset: {
              image:""
            }
          }
        )
        res.status(201).json({message : "Le commentaire à été mis à jour merci !"});
      }else{
        await Commentaire.updateOne( {_id : idCommentaire},
          {
            $set : {
              message : req.body.message,
              user: req.token.id,
              image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            }
          }
        )
        res.status(201).json({message : "Le commentaire à été mis à jour merci !"});
      }
    } else {
      res.status(403).json({message : "Vous n'avez pas les droits pour modifier ce commentaire ! "});
    }
  }
}

//get tout les commentaires
exports.getAll = async (req, res, next) => {
  const dataCommentaire = await Commentaire.find();
  res.status(200).json(dataCommentaire);
}

//get un seul commentaire
exports.getOne = async (req, res, next) => {
  idCommentaire = req.params;
  const dataCommentaire = await Commentaire.findById(idCommentaire);
  res.status(200).json(dataCommentaire);
}
