const { Categorie } = require("../models/categorie");
const { validationResult } = require("express-validator");

/**
 * @author: Toure
 * Cette méthode permet d'enregistrer un client dans la base de données
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */



exports.enregistrerUneCategorie = async (req, res) => {
    //valider les données
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error)=>({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({ errors: errorMessages }) 
    }

    try {

        const { libelle, description } = req.body;

        // if(!libelle || !description) {
        //     return res.status(400).json({message : "Les champs sont obligatoires"});
        // }
        // console.log(libelle);

        const categorie = await Categorie.create({libelle, description});

        if (!categorie) {
            return res.status(400).json({message: "Les champs sont obligatoires"});            
        }

        return res.status(200).json(categorie)

    } catch (error) {
        console.log("Error lors de l'enregistrement de la catégorie :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}

/**
 * @author: Toure
 * Cette méthode permet d'afficher la liste de tous les clients
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */

exports.listeDesCategories = async (req, res)  => {
    try {
        const categories = await Categorie.find().sort("libelle: -1" );

        if(!categories) {
            return res.status(400).json({message: "Aucune catégorie trouvée"})
        }

        return res.status(200).json({
            status: "Liste des catégories",
            categories : categories
        })


    } catch (error) {
        console.log("Error lors de la récupération des catégories :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    
    }
}


/**
 * @author: Toure
 * Cette méthode permet d'afficher le détail du client
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */
exports.detailCategorie = async(req, res)  => {
    try {
        const {categorieId} = req.params;

        const categorie = await Categorie.findOne(categorieId);

        return res.status(200).json(categorie);

    } catch (error) {
        
    }
}


exports.modifierUneCategorie = async(req, res)  => {
    try {
        // const { categorieId } = req.params;
        const { libelle, description } = req.body;

        const categorie = await Categorie.findByIdAndUpdate(
            req.params.id, 
            { libelle, description }, 
            { new : true }
        );

        if(!categorie){
            return res.status(404).json({ message: "Catégorie non trouvé" });
        }

        return res.status(200).json(categorie);
    } catch (error) {
        console.log("Error lors de la modification de la catégorie :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}


exports.supprimerUneCategorie = async(req, res)  => {
    try {
        // const { categorieId } = req.params.id;
        // console.log("voici le paramètre :",req.params.id);

        if (!req.params.id) {
            return res.status(400).json({ message : "le paramètre est obligatoire" });
        }

        const categorie = await Categorie.findByIdAndDelete(req.params.id);

        if(!categorie) {
            return res.status(400).json({ message: "Catégorie non trouvée" });
        }

        return res.status(200).json({ message: "La catégorie a été supprimée avec succès" });

    } catch (error) {
        console.log("Error lors de la suppression de la catégorie :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}