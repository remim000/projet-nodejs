const Post = require("../model/post_model");
const Commentaire = require("../model/commentaire_model");
require("dotenv").config();

// permet de creer un post
exports.create = (req, res, next) => {
    if (req.body.titlePost === "" || req.body.contentPost === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les Champs pour votre POST SVP ! " });
    }
    Post.create({
      titlePost: req.body.titlePost,
      contentPost: req.body.contentPost,
      categorie : req.body.categorie,
      user: req.token.id
    })
      .then(() => res.status(201).json({ message: "Post enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };

// permet d'update un post
exports.update = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  if (dataPost.user.equals(req.token.id)){
    await Post.updateOne( {_id : idPost},
      {
        $set : {
          titlePost : req.body.titlePost,
          contentPost : req.body.contentPost,
          categorie : req.body.categorie,
          user: req.token.id
        }
      }
    )
    res.status(201).json({message : "Le POST à été mis à jour merci !"});
  } else {
    res.status(403).json({message : "Vous n'avez pas les droits pour modifier ce post ! "});
  }
}

// permet de delete grâce à l'id du POST
exports.delete = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  if (dataPost.user.equals(req.token.id)){
    if(dataPost == null){
      res.status(404).json({ message:"Le post que vous souhaitez suprimmer n'existe pas, merci de réessayer"})
    }else{
      await Post.deleteOne({_id:idPost});
      res.status(201).json({message:"Post supprimé, merci !"});
    }
  }else{
    res.status(403).json({ message:"Vous n'avez pas les droits pour supprimer ce post !"})
  }
}

// permet d'avoir tout les posts 
exports.getAll = async (req, res, next) => {
  const dataPost = await Post.find();
  res.status(200).json(dataPost);
}

//get qu'un post grâce à son ID
exports.getOne = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  res.status(200).json(dataPost);
}

//get qu'un post grâce à sa catégorie
exports.getOneByCategorie = async (req, res, next) => {
  categorie = req.params;
  const dataPost = await Post.find({categorie : categorie});
  res.status(200).json(dataPost);
}

exports.getOneAndCommentaire = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  const dataCommentaire = await Commentaire.find({idPost : idPost});
  res.status(200).json({post:dataPost,commentaire:dataCommentaire});
}