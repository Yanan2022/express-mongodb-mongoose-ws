/* 
Nous allons utiliser l'architecture MVC 
M: Models ou se touve nos données
V: La vue
C: Controller permet l'interaction entre le model et la vue  

    client : nom, prenom, phone

*/

const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');


//creation de l'application express js
const app = express();
const env = process.env;

const API = env.API_URL;


app.use(bodyParser.json());
app.use(cors());

const clientRouter = require('./src/routes/clients');
const categorieRouter = require('./src/routes/categorie');


app.use(`${API}/clients`, clientRouter);
app.use(`${API}/categories`, categorieRouter);



const hostname = env.HOSTNAME;
const port = env.PORT;

//Connexion à la base de données MongoDB
mongoose.connect(env.MONGODB_CONNECTION_STRING).then(()=>{
    console.log('Connexion à MongoDb réussie');
}).catch((error)=>{
    console.log(error);
});

//création du serveur 
app.listen(port, ()=> {
    console.log(`Le serveur a démarré sur http://${hostname}:${port}`);
});

