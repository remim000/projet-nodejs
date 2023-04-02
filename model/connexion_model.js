const mongoose = require('mongoose');

// connexion à la BDD via mongoose
exports.connect = async () => {
    const bdd = await mongoose.connect('mongodb://127.0.0.1:27017/nodejs');
}
