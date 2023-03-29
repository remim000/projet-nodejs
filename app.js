const express = require("express");
const path = require("path")
const userRoute = require("./route/user_route");
const authRoute = require("./route/auth_route");
const postRoute = require("./route/post_route");

const {connect} = require("./model/connection_model");

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

module.exports = app;
