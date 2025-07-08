const express = require('express'); 

const router = express.Router();

const produitController = require('../controllers/produit');
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
router.get('/', produitController.listeDesProduits);
router.post('/',validateCategorie, produitController.enregistrerUnProduit)
router.get('/:id', produitController.detailProduit);
router.put('/:id', produitController.modifierUnProduit);
router.delete('/:id', produitController.supprimerUnProduit);

module.exports = router;