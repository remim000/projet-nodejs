const bcrypt = require("bcrypt");
const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//permet de s'inscrire
exports.signin = async (req, res, next) => {
    
    // Verification si un email est déja utilisé 
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist){
        res.status(484).json({ message : "Vous avez déjà un compte avec cette e-mail, merci de prendre une autre email ou de vous connecter :)"});
    }

    // // Verification si un username est déja utilisé 
    // const userExist = await User.findOne({username: req.body.username})
    // if (userExist){
    //     res.status(484).json({ message : "TESTTTT :)"});
    // }
    else{
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                try {
                    User.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                    }).then(user => {
                        res.status(201).json({ message: "Utilisateur créé !" });
                    }).catch(error => {
                        res.status(500).json({ message: error });
                    })
                    
                } catch (error) {
                    res.status(500).json(error);
                }

            })
            .catch(error => {
                res.status(500).json(error);
            });
    }
}

// permet de ce login
exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({email: req.body.email})
        bcrypt.compare(req.body.password, user.password)
            .then(success => {
                if (success) {
                    res.status(200).json({
                        email: user.email,
                        jwt: jwt.sign({
                            email: user.email
                        }, process.env.JWT_TOKEN)
                    });
                } else {
                    res.status(401).json({ message: "Mot de passe incorrect" });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}