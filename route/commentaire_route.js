//route pour les commentaires

const express = require('express');
const commentaireController = require('../controller/commentaire_controller.js');
const auth = require("./../middleware/auth");

const router = express.Router();

router.post('/:idPost', auth, commentaireController.create);
router.delete('/:_id', auth,  commentaireController.delete);
router.get('/', auth,  commentaireController.getAll)
router.get('/:_id', auth,  commentaireController.getOne)


module.exports = router;
