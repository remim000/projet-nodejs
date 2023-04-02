const mongoose = require('mongoose');

// connexion à la BDD via mongoose
exports.connect = async () => {
    const bdd = await mongoose.connect('mongodb+srv://ThomasRibeiro:ThomasRibeiro@nodejs.2zoz03q.mongodb.net/nodejs');
}
