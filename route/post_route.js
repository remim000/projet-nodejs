//route pour les post

const express = require('express');
const postController = require('../controller/post_controller.js');
const auth = require("./../middleware/auth");

const router = express.Router();

router.post('/', auth, postController.create);
router.put('/:_id', auth, postController.update);
router.delete('/:_id', auth,  postController.delete);
router.get('/', auth,  postController.getAll);
router.get('/:_id', auth, postController.getOne);
router.get('/commentaire/:_id', auth, postController.getOneAndCommentaire);


module.exports = router;
