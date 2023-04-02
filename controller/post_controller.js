const Post = require("../model/post_model");
const Commentaire = require("../model/commentaire_model");
const Deleted_Commentaire = require("../model/deleted_commentaire_model");
const Deleted_Post = require("../model/deleted_post_model");
const fs = require("fs");
const path = require('path');
require("dotenv").config();

// permet de creer un post
exports.create = (req, res, next) => {
    if (req.body.titlePost === "" || req.body.contentPost === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les champs pour votre POST SVP ! " });
    }
    const myFile = typeof(req.file);
    if(myFile === 'undefined'){
      Post.create({
        titlePost: req.body.titlePost,
        contentPost: req.body.contentPost,
        categorie : req.body.categorie,
        user: req.token.id
      })
        .then(() => res.status(201).json({ message: "Post enregistré avec succés !" }))
        .catch((error) => res.status(400).json({ error }));
    }else{
      Post.create({
        titlePost: req.body.titlePost,
        contentPost: req.body.contentPost,
        categorie : req.body.categorie,
        user: req.token.id,
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      })
        .then(() => res.status(201).json({ message: "Post enregistré ! Merci à vous" }))
        .catch((error) => res.status(400).json({ error }));
    }
  };

// permet d'update un post
exports.update = async (req, res, next) => {
  idPost = req.body.idPost;
  const myFile = typeof(req.file);
  const dataPost = await Post.findById(idPost);
  if(dataPost == null){
    res.status(404).json({ message:"Le post que vous souhaitez modifier n'existe pas, merci de réessayer"});
  }else{
    if (dataPost.user.equals(req.token.id)){
      if(myFile === 'undefined'){
        await Post.updateOne( {_id : idPost},
          {
            $set : {
              titlePost : req.body.titlePost,
              contentPost : req.body.contentPost,
              categorie : req.body.categorie,
              user: req.token.id
            },
            $unset: {
              image:""
            }
          }
        )
        res.status(201).json({message : "Le POST à été mis à jour merci !"});
      }else{
        await Post.updateOne( {_id : idPost},
          {
            $set : {
              titlePost : req.body.titlePost,
              contentPost : req.body.contentPost,
              categorie : req.body.categorie,
              user: req.token.id,
              image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            }
          }
        )
        res.status(201).json({message : "Le POST à été mis à jour merci !"});
      }
    } else {
      res.status(403).json({message : "Vous n'avez pas les droits pour modifier ce post ! "});
    }
  }
}

// permet de delete grâce à l'id du POST
exports.delete = async (req, res, next) => {
  idPost = req.body.idPost;
  const dataPost = await Post.findById(idPost);
  const dataCommentaire = await Commentaire.find({idPost:idPost});
  if(dataPost == null){
    res.status(404).json({ message:"Le post que vous souhaitez suprimmer n'existe pas, merci de réessayer"})
  }else{
    if (dataPost.user.equals(req.token.id)){
      await Deleted_Post.create(dataPost.toObject());
      await Deleted_Commentaire.insertMany(dataCommentaire);
      if(dataPost.image !== 'undefined'){
        const OldPath = path.join(__dirname, '..', 'images', path.basename(dataPost.image));
        const NewPath = path.join(__dirname, '..', 'deleted_images', path.basename(dataPost.image));
        fs.renameSync(OldPath, NewPath);
      }
      await Commentaire.deleteMany({idPost:idPost});
      await Post.deleteOne({_id:idPost});
      res.status(201).json({message:"Post supprimé, merci !"});
    } else {
      res.status(403).json({ message:"Vous n'avez pas les droits pour supprimer ce post !"})
    }
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

//get un seule commentaire 
exports.getOneAndCommentaire = async (req, res, next) => {
  idPost = req.params;
  const dataPost = await Post.findById(idPost);
  const dataCommentaire = await Commentaire.find({idPost : idPost});
  res.status(200).json({post:dataPost,commentaire:dataCommentaire});
}

// permet de creer un commentaire
exports.createCommentaire = async (req, res, next) => {
  const idPost = req.params;
  const dataPost = await Post.findById(idPost);
  if(dataPost == null){
    res.status(404).json({ message:"Le post auquel vous souhaitez ajouter un commentaire n'existe pas, merci de réessayer"})
  }else{
    if (req.body.message === "" || idPost === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les Champs pour votre POST SVP ! " });
    }
    Commentaire.create({
      message: req.body.message,
      idPost: idPost,
      user: req.token.id
    })
      .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};