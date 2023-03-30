//route pour les post

const express = require('express');
const postController = require('../controller/post_controller.js');

const router = express.Router();

router.post('/create', postController.create);
router.delete('/:_id', postController.delete);
router.get('/', postController.getAll)
router.get('/:_id', postController.getOne)


module.exports = router;
