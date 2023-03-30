//route pour les post

const express = require('express');
const postController = require('../controller/post_controller.js');

const router = express.Router();

router.post('/create', postController.create);


module.exports = router;
