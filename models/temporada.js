'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const temporadaSchema = Schema({
    "date" : String
},{ versionKey: false })

module.exports = mongoose.model('Temporada', temporadaSchema, 'temporades')