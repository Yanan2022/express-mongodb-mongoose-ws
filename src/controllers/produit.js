
const { Produit } = require("../models/produit");
const { validationResult } = require("express-validator");


/**
 * @author: Toure
 * Cette méthode permet d'enregistrer un client dans la base de données
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */



exports.enregistrerUnProduit = async (req, res) => {
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


        const produit = await Produit.create({libelle, description});

        if (!produit) {
            return res.status(400).json({message: "Les champs sont obligatoires"});            
        }

        return res.status(200).json(produit)

    } catch (error) {
        console.log("Error lors de l'enregistrement du produit :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}

/**
 * @author: Toure
 * Cette méthode permet d'afficher la liste de tous les clients
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */

exports.listeDesProduits = async (req, res)  => {
    try {
        const produit = await Produit.find().sort("libelle: -1" );

        if(!produit) {
            return res.status(400).json({message: "Aucune catégorie trouvée"})
        }

        return res.status(200).json({
            status: "Liste des produits",
            categories : produit
        })


    } catch (error) {
        console.log("Error lors de la récupération des produits :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    
    }
}


/**
 * @author: Toure
 * Cette méthode permet d'afficher le détail du client
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */
exports.detailProduit = async(req, res)  => {
    try {
        const {produitId} = req.params;

        const produit = await Produit.findOne(categorieId);

        return res.status(200).json(produit);

    } catch (error) {
        
    }
}


exports.modifierUnProduit = async(req, res)  => {
    try {
        // const { categorieId } = req.params;
        const { libelle, description } = req.body;

        const produit = await Produit.findByIdAndUpdate(
            req.params.id, 
            { libelle, description }, 
            { new : true }
        );

        if(!produit){
            return res.status(404).json({ message: "Catégorie non trouvé" });
        }

        return res.status(200).json(produit);
    } catch (error) {
        console.log("Error lors de la modification de la catégorie :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}


exports.supprimerUnProduit = async(req, res)  => {
    try {
        // const { categorieId } = req.params.id;
        // console.log("voici le paramètre :",req.params.id);

        if (!req.params.id) {
            return res.status(400).json({ message : "le paramètre est obligatoire" });
        }

        const produit = await Produit.findByIdAndDelete(req.params.id);

        if(!produit) {
            return res.status(400).json({ message: "Catégorie non trouvée" });
        }

        return res.status(200).json({ message: "La catégorie a été supprimée avec succès" });

    } catch (error) {
        console.log("Error lors de la suppression de la catégorie :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}