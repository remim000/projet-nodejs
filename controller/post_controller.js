const postModel = require("../model/post_model");
const Post = require("../model/user_model");
require("dotenv").config();

// permet de creer un post
exports.create = (req, res, next) => {
    if (req.body.titlePost === "" || req.body.contentPost === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les Champs pour votre POST SVP ! " });
    }
    postModel.create({
      titlePost: req.body.titlePost,
      contentPost: req.body.contentPost,
      user: req.token.email
    })
      .then(() => res.status(201).json({ message: "Post enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };

exports.delete = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  // if (req.token.id === dataPost.idUser){
  await Post.deleteOne({_id:idPost});
  res.status(201).json({message:"Post supprimé"})
  // }else{
  //   res.status(403).json({ message:"Vous n'avez pas les droits pour supprimer ce post"})
  // }
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