// Authentification controller

//import
import bcrypt from 'bcrypt';
import * as userModel from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const key = process.env.JWT_KEY;

// Permet de s'inscrire
export const signin = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            userModel.create({
                email: req.body.email,
                password: hash
            });
            res.status(201).json({ message: 'Utilisateur créé' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// permet de ce login
export const login = (req, res, next) => {
    try {
        const user = userModel.getOne(req.body.email);
        bcrypt.compare(req.body.password, user.password)
            .then(success => {
                if (success) {
                    res.status(200).json({
                        email: user.email,
                        jwt: jwt.sign({
                            email: user.email
                        }, key)
                    });
                } else {
                    res.status(401).json({ message: 'Mot de passe incorrect' });
                }
            })
            .catch(error => {
                res.status(500).json({ error });
            })
    } catch (error) {
        res.status(500).json({ error });
    }
};
