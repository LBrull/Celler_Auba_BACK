'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = Schema({
    "name" : String,
    "surname" : String,
    "telephone" : String,
    "email" : String,
    "cp" : String,
    "town" : String,
    "address" : String,
    "dni_nif" : String,
    "accountNumber" : String
})

module.exports = mongoose.model('Client', clientSchema, 'clients')