'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albaraSchema = Schema({
    "provider" : Provider,
    "client" : Client,
    "date" : String,
    "type" : String,
    "in" : Boolean,
    "products" : [{
        product: product,
        quantity: Number
    }]
},{ versionKey: false })

module.exports = mongoose.model('Albara', albaraSchema, 'albarans')