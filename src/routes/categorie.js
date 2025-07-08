const express = require('express'); 

const router = express.Router();

const categorieController = require('../controllers/categorie');
const { body } = require("express-validator");

//Lees messages de validations des champs obligatoires
const validateCategorie = [
    body('libelle').not().isEmpty().withMessage('Veuillez entre le libéllé de la catégorie, il est obligatoire'),
    body('description').not().isEmpty().withMessage('Veuillez entre la description de la catégorie, elle est obligatoire'),
];

/**
 * CRUD
 * C : CREATE CREER UNE CATEGOIRE
 * R : READ LA LECTURE AFFICHAGE D'UNE CATEGORIE
 * U : UPDATE MISE A JOUR D'UNE CATEGORIE
 * D : DELETE SUPPRESSION D'UNE CATEGORIE 
 */
router.get('/', categorieController.listeDesCategories);
router.post('/',validateCategorie, categorieController.enregistrerUneCategorie)
router.get('/:id', categorieController.detailCategorie);
router.put('/:id', categorieController.modifierUneCategorie);
router.delete('/:id', categorieController.supprimerUneCategorie);





module.exports = router;