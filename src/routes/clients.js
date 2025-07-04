const express = require('express'); 

const router = express.Router();

const clientController = require('../controllers/client');


router.get('/', clientController.listeDesClients);
router.post('/', clientController.enregistrerUnClient)
router.get('/:id', clientController.detailDuClient);





module.exports = router;