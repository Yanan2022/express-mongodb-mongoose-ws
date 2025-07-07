const express = require('express'); 

const router = express.Router();

const categorieController = require('../controllers/categorie');


router.get('/', categorieController.listeDesCategories);
router.post('/', categorieController.enregistrerUneCategorie)
router.get('/:id', categorieController.detailCategorie);





module.exports = router;