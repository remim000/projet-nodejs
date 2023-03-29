const { Post} = require("../model/post_model");

exports.createPost = (req, res, next) => {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(400).json({ error: "Veuillez remplir tous les paramètres ! " });
    }
    Post.create({
      title: req.body.title,
      content: req.body.content,
    })
      .then(() => res.status(201).json({ message: "Message enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };