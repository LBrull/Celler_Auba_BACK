'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    "code" : { type: String, required: true, index: { unique: true } },
    "description" : String,
    "type": String,
    "price" : String
},{ versionKey: false })

module.exports = mongoose.model('Product', productSchema, 'products')