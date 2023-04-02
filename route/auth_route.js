//route pour les authentifications

const express = require('express');
const authController = require('../controller/auth_controller.js');

const router = express.Router();

router.post('/login', authController.login);

router.post('/signin', authController.signin);

module.exports = router;
