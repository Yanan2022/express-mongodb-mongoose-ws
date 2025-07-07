
const { Client } = require("../models/client")


/**
 * @author: Toure
 * Cette méthode permet d'enregistrer un client dans la base de données
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */

exports.enregistrerUnClient = async (req, res) => {
    try {

        const client = await Client.create(req.body);

        if (!client) {
            return res.status(400).json({message: "Les champs sont obligatoires"});            
        }

        return res.status(200).json(client)

    } catch (error) {
        console.log("Error lors de l'enregistrement du client :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    }
}

/**
 * @author: Toure
 * Cette méthode permet d'afficher la liste de tous les clients
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */

exports.listeDesClients = async (req, res)  => {
    try {
        const clients = await Client.find();

        if(!clients) {
            return res.status(400).json({message: "Aucun client trouvé"})
        }

        return res.status(200).json({
            status: "Liste des clients",
            clients : clients
        })


    } catch (error) {
        console.log("Error lors de la récupération des clients :", error.message);
        return res.status(500).json({error: "Erreur du serveur"})
    
    }
}


/**
 * @author: Toure
 * Cette méthode permet d'afficher le détail du client
 * @email : yanan3504toure@gmail.com
 * @version : 1.0
 */
exports.detailDuClient = async(req, res)  => {
    try {
        const {clientId} = req.params;

        const client = await Client.findOne(clientId);

        return res.status(200).json(client);

    } catch (error) {
        
    }
}