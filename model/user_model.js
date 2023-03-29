const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD
const User = new Schema({
  firstname:  {type: String, required: true},
  lastname: String,
  email:   String,
  password: String
});

module.exports = mongoose.model("User",User);