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
      user: req.token.id
    })
      .then(() => res.status(201).json({ message: "Post enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };

exports.delete = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  if (req.token._id === dataPost.idUser){
    if(dataPost == null){
      res.status(404).json({ message:"Le post que vous shouaitez suprimmer n'existe pas"})
    }else{
      await Post.deleteOne({_id:idPost});
      res.status(201).json({message:"Post supprimé"});
    }
  }else{
    res.status(403).json({ message:"Vous n'avez pas les droits pour supprimer ce post"})
  }
}

exports.getAll = async (req, res, next) => {
  const dataPost = await Post.find();
  res.status(200).json(dataPost);
}

exports.getOne = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  res.status(200).json(dataPost);
}

exports.getOneAndCommentaire = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  const dataCommentaire = await Commentaire.find({idPost : idPost});
  res.status(200).json({post:dataPost,commentaire:dataCommentaire});
}