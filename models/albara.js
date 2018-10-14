'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albaraSchema = Schema({
    "providerId" : String,
    "clientId" : String,
    "date" : String,
    "type" : String,
    "in" : Boolean,
    "products" : [{
        productId: String,
        quantity: Number
    }]
},{ versionKey: false })

module.exports = mongoose.model('Albara', albaraSchema, 'albarans')