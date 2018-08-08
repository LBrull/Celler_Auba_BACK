'use strict'

const Product = require('../models/product')

function getProduct(req, res) {
    let productId = req.params.productId
    Client.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: 'Error looking for product'})
        if (!product) return res.status(404).send({message: 'The product does not exist'})
        res.status(200).send({product})
    })
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: "Error getting all products"})
        res.status(200).send(products)
    })
}

function saveProduct(req, res) {
    console.log('POST /api/product')
    console.log(req.body)
    let product = new Product()
    product.description = req.body.description
    product.type = req.body.type
    product.price = req.body.price

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: `Could not save the product: ${err}`})
        res.status(200).send({product: productStored})
    })
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let body = req.body
    Product.findByIdAndUpdate(productId, body, (err, updatedProduct) => {
        if (err) res.status(500).send({message: `Could not update the product: ${err}`})
        res.status(200).send({product: Product.findById(productId, (err, newProduct) )})
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: "Error finding product"})
        product.remove(err => {
            if (err) res.status(500).send({message: "Error deleting product"})
            res.status(200).send({message: "Product deleted successfully"})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}