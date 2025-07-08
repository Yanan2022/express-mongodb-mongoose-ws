const { Schema, model } = require("mongoose");



const produitSchema = Schema({
    libelle: { type: String, require: true }, 
    description : { type: String, require: true },
    prix: { type: Number, require: true }, 
    image: { type: String, require: true }, 
    images : [ {type: String } ], 
    categorie: { type: Schema.Types.ObjectId, ref: "Categorie", require: true }, 
    dateAjout: { type: Date, default: Date.now },
})

produitSchema.set('toObject', { virtuals: true });
produitSchema.set('toJSON', { virtuals: true });

exports.Produit = model('Produit', produitSchema );