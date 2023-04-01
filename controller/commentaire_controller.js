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
