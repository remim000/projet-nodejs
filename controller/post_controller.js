const Post = require("../model/post_model");
require("dotenv").config();
const bcrypt = require("bcrypt");

// permet de creer un post
exports.create = (req, res, next) => {
    if (req.body.titlePost === "" || req.body.contentPost === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les Champs pour votre POST SVP ! " });
    }
    Post.create({
      titlePost: req.body.titlePost,
      contentPost: req.body.contentPost,
    })
      .then(() => res.status(201).json({ message: "Post enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };