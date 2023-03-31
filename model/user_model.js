const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema pour la BDD
const User = new Schema({
  email:   {type: String, required: true},
  username:  {type: String, required: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model("User",User);