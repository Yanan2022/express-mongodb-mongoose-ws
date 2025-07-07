

const { Schema, model } = require("mongoose");



const categorieSchema = Schema({
    libelle: { type: String, required: true }, 
    description: { type: String, required: true },
    // image: { type: String, required: true },
    // produits: [{ type: Schema.Types.ObjectId, ref: 'produit' }],
    // user: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date, default: Date.now }
})


categorieSchema.set('toObject', { virtuals: true });
categorieSchema.set('toJSON', { virtuals: true });


exports.Categorie = model('Categorie', categorieSchema );