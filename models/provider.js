'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const providerSchema = Schema({
    "name" : String,
    "surname" : String,
    "telephone" : String,
    "email" : String,
    "cp" : String,
    "town" : String,
    "address" : String,
    "dni_nif" : { type: String, required: true, index: { unique: true } },
    "accountNumber" : String
},{ versionKey: false })

module.exports = mongoose.model('Provider', providerSchema, 'providers')