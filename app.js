const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');



const app = express();
const env = process.env;



const hostname = env.HOSTNAME;
const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING).then(()=>{
    console.log('Connexion à MongoDb réussie');
}).catch((error)=>{
    console.log(error);
});


app.listen(port, ()=> {
    console.log(`Le serveur a démarré sur http:://${hostname}:${port}`);
});