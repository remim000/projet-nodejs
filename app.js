const express = require("express");
const path = require("path");
const authRoute = require("./route/auth_route");
const postRoute = require("./route/post_route");
const commentaireRoute = require("./route/commentaire_route");

const {connect} = require("./model/connexion_model");

connect();

const app = express();

app.use(express.json());

// Permet de configurer les requetes pour l'api REST
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/commentaire', commentaireRoute);


module.exports = app;
