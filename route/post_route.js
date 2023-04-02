//route pour les posts

const express = require('express');
const postController = require('../controller/post_controller.js');
const auth = require("./../middleware/auth");
const multer = require("../middleware/multer");

const router = express.Router();

router.post('/', auth, multer, postController.create);
router.put('/', auth, multer, postController.update);
router.delete('/:_id', auth,  postController.delete);
router.get('/', auth,  postController.getAll);
router.get('/getOne/:_id', auth, postController.getOne);
router.get('/:_id', auth, postController.getOneAndCommentaire);
router.post('/:_id/commentaire', auth, postController.createCommentaire);


module.exports = router;
