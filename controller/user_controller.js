// add la const User
const User = require("../model/user_model");

// permet de get tout les utilisateurs
exports.getAll = (req, res, next) => {
    User.find()
    .then(userList => {
        res.status(200).json(userList);
    })
    .catch(error => {
        res.status(500).json(error);
    })
}