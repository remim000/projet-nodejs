//Middleware / auth

const jwt = require('jsonwebtoken');
require("dotenv").config();

const key = process.env.JWT_KEY;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, key);
        next();
    } catch (error) {
        res.status(401).json({ message: "Autentification incorrecte" });
    }
}
