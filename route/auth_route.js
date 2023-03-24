//route pour les authentifications

import express from 'express';
import * as authController from '../controller/auth.controller.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/signin', authController.signin);

export default router;
