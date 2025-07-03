const { Schema, model } = require("mongoose");



const clientSchema = Schema({
    nom: { type: String, required: true }, 
    prenom: {type: String , required: true },
    phone: { type: String, required: true }
})


clientSchema.set('toObject', { virtuals: true });
clientSchema.set('toJSON', { virtuals: true });


exports.Client = model('Client', clientSchema );